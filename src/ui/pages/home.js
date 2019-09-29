import React, { useEffect, useState, useRef, useCallback } from 'react';
import fetch from 'isomorphic-unfetch';
import { Form } from 'informed';
import { Layout, Card, ResourceList, TextStyle, Page, SkeletonBodyText, EmptyState, Banner, Link, FormLayout, Button, ButtonGroup } from '@shopify/polaris';

import useFetch from '../hooks/useFetch';
import { teams as teamRoutes } from '../constants/routes';
import Protected from '../layouts/Protected';
import TextField from '../components/TextField';
import usePost from '../hooks/usePost';
import { isRequired } from '../utils/validation';

const Home = ({
  initialTeams,
  initialTeamsError,
}) => {
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const handleCreateTeam = useCallback(() => {
    setIsCreatingTeam(true);
  }, [setIsCreatingTeam]);

  const createTeamAction = {
    content: 'Create team',
    onAction: handleCreateTeam,
  };

  const [teams, setTeams] = useState(initialTeams || []);
  const [teamCardActions, setTeamCardActions] = useState([createTeamAction]);
  const [emptyTeamAction, setTeamAction] = useState(createTeamAction);
  const formApiRef = useRef();

  // async calls
  const [
    _,
    isLoadingTeams,
    getTeamsResult,
    teamsError
  ] = useFetch(
    teamRoutes.search(),
    {
      immediate: true,
      initialValue: initialTeams,
      initialError: initialTeamsError
    }
  );
  const [
    createTeam,
    createTeamIsLoading,
    createTeamResult,
    createTeamError
  ] = usePost(teamRoutes.create);

  const handleFormSubmit = values => {
    createTeam({ name: values.teamName });
  }

  const handleFormCancel = () => setIsCreatingTeam(false);

  const setFormApi = formApi => {
    formApiRef.current = formApi;
  };

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
      if (formApiRef.current) {
        formApiRef.current.reset();
      }

      setTeamCardActions([createTeamAction]);
      setTeamAction(createTeamAction);
    }
  }, [isCreatingTeam]);

  useEffect(() => {
    if (getTeamsResult) {
      setTeams(getTeamsResult);
    }
  }, [getTeamsResult]);

  return (
    <Protected>
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Form onSubmit={handleFormSubmit} getApi={setFormApi}>
              {!isLoadingTeams && teams.length > 0 && (
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
                    renderItem={({ id, name }) => (
                        <ResourceList.Item
                          id={id}
                          name={name}
                          accessibilityLabel={`View details for ${name}`}
                        >
                          <h3>
                            <TextStyle variation="strong">{name}</TextStyle>
                          </h3>
                        </ResourceList.Item>
                    )}
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

              {!isLoadingTeams && teams.length === 0 && (
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

              {!isLoadingTeams && teamsError && (
                <Banner
                  status="critical"
                  title="There was an issue loading your teams"
                >
                  <p>Please <Link>try again.</Link> If this issue persists, contact support.</p>
                </Banner>
              )}

              {isLoadingTeams && <SkeletonBodyText />}
            </Form>
          </Layout.Section>
        </Layout>
      </Page>
    </Protected>
  );
};

Home.getInitialProps = async ({ req }) => {
  let initialTeams = [];
  let initialTeamsError = '';

  if (req) {
    try {
      const token = req.cookies['squad-leader-session'];
  
      const response = await fetch(teamRoutes.search(), {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const responseJson = await response.json();
  
      if (responseJson.isBoom) {
        initialTeamsError = responseJson;
      } else {
        initialTeams = responseJson;
      }
    } catch (e) {
      initialTeamsError = e;
    }
  }

  return { initialTeams, initialTeamsError };
};

export default Home;

