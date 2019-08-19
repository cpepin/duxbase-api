import React, { useEffect, useState, useRef } from 'react';
import fetch from 'isomorphic-unfetch';
import { Form } from 'informed';
import { Layout, Card, ResourceList, TextStyle, Page, SkeletonBodyText, EmptyState, Banner, Link, FormLayout, Button, ButtonGroup } from '@shopify/polaris';

import useFetch from '../hooks/useFetch';
import { teams as teamRoutes } from '../constants/routes';
import Protected from '../layouts/Protected';
import TextField from '../components/TextField';
import usePost from '../hooks/usePost';
import { isRequired } from '../utils/validation';


// TODO - This NEEDS to be broken up.
const Home = ({
  attemptedTeamPreLoad,
  teams: teamsProp = [],
  loadingTeamsError: loadingTeamsErrorProp = '',
}) => {
  const handleCreateTeam = () => {
    setIsCreatingTeam(true);
  };

  const createTeamAction = {
    content: 'Create team',
    onAction: handleCreateTeam,
  };

  const [teams, setTeams] = useState(teamsProp);
  const [loadingTeamsError, setLoadingTeamsError] = useState(loadingTeamsErrorProp);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [teamCardActions, setTeamCardActions] = useState([createTeamAction]);
  const [emptyTeamAction, setTeamAction] = useState(createTeamAction);
  const formApiRef = useRef();

  // async calls
  const [getTeams, getTeamsIsLoading, getTeamsResult, getTeamsError] = useFetch(teamRoutes.search());
  const [createTeam, createTeamIsLoading, createTeamResult, createTeamError] = usePost(teamRoutes.create);

  const handleFormSubmit = values => {
    createTeam({ name: values.teamName });
  }

  const handleFormCancel = () => setIsCreatingTeam(false);

  const setFormApi = formApi => {
    formApiRef.current = formApi;
  };

  useEffect(() => {
    if (getTeamsError) {
      setLoadingTeamsError(getTeamsError);
    }
  }, [getTeamsError]);

  useEffect(() => {
    if (getTeamsResult) {
      setTeams(getTeamsResult);
    }
  }, [getTeamsResult])

  useEffect(() => {
    if (createTeamResult) {
      setTeams(currentTeams => [...currentTeams, createTeamResult]);
      setIsCreatingTeam(false);
    }
  }, [createTeamResult]);

  useEffect(() => {
    if (isCreatingTeam) {
      setTeamCardActions([]);
      setTeamAction();
    } else {
      formApiRef.current.reset();
      setTeamCardActions([createTeamAction]);
      setTeamAction(createTeamAction);
    }
  }, [isCreatingTeam]);

  useEffect(() => {
    if (!attemptedTeamPreLoad) {
      getTeams();
    }
  }, []);

  return (
    <Protected>
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Form onSubmit={handleFormSubmit} getApi={setFormApi}>
              {!getTeamsIsLoading && teams.length > 0 && (
                <Card sectioned title="Your teams" load actions={teamCardActions}>
                  {createTeamError && (
                    <Banner
                      status="critical"
                      title="There was an issue creating your team"
                    >
                      <p>Please <Link>try again.</Link> If this issue persists, contact support.</p>
                    </Banner>
                  )}

                  <ResourceList
                    resourceName={{singular: 'team', plural: 'teams'}}
                    items={teams}
                    renderItem={(item) => {
                      const { id, name } = item;

                      return (
                        <ResourceList.Item
                          id={id}
                          name={name}
                          accessibilityLabel={`View details for ${name}`}
                        >
                          <h3>
                            <TextStyle variation="strong">{name}</TextStyle>
                          </h3>
                        </ResourceList.Item>
                      );
                    }}
                  />

                  {isCreatingTeam && (
                    <FormLayout>
                      <FormLayout>
                        <TextField
                          id="teamName"
                          field="teamName"
                          label="Team name"
                          name="teamName"
                          validate={isRequired}
                          validateOnBlur
                        />

                        <ButtonGroup>
                          <Button submit loading={createTeamIsLoading} primary>Create</Button>
                          <Button onClick={handleFormCancel}>Cancel</Button>
                        </ButtonGroup>
                      </FormLayout>
                    </FormLayout>
                  )}
                </Card>
              )}

              {!getTeamsIsLoading && teams.length === 0 && (
                <Card sectioned>
                  {!isCreatingTeam && (
                    <EmptyState action={emptyTeamAction} heading={'Manage teams'}>
                      <p>Add and remove teams that you manage.</p>
                    </EmptyState>
                  )}

                  {isCreatingTeam && (
                    <FormLayout>
                      <FormLayout>
                        <TextField
                          id="teamName"
                          field="teamName"
                          label="Team name"
                          name="teamName"
                          validate={isRequired}
                          validateOnBlur
                        />

                        <ButtonGroup>
                          <Button submit loading={createTeamIsLoading} primary>Create</Button>
                          <Button onClick={handleFormCancel}>Cancel</Button>
                        </ButtonGroup>
                      </FormLayout>
                    </FormLayout>
                  )}
                </Card>
              )}

              {!getTeamsIsLoading && loadingTeamsError && (
                <Banner
                  status="critical"
                  title="There was an issue loading your teams"
                >
                  <p>Please <Link>try again.</Link> If this issue persists, contact support.</p>
                </Banner>
              )}

              {getTeamsIsLoading && <SkeletonBodyText />}
            </Form>
          </Layout.Section>
        </Layout>
      </Page>
    </Protected>
  );
};

Home.getInitialProps = async ({ req }) => {
  let teams = [];
  let loadingTeamsError = '';
  let attemptedTeamPreLoad = false;

  if (req) {
    try {
      const token = req.cookies['squad-leader-session'];
  
      const response = await fetch(teamRoutes.search(), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const responseJson = await response.json();
  
      if (responseJson.isBoom) {
        loadingTeamsError = responseJson;
      } else {
        teams = responseJson;
      }
    } catch (e) {
      loadingTeamsError = e;
    } finally {
      attemptedTeamPreLoad = true;
    }
  }

  return { teams, loadingTeamsError, attemptedTeamPreLoad };
};

export default Home;

