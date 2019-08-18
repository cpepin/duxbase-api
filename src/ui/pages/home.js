import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { Layout, Card, ResourceList, TextStyle, Page, SkeletonBodyText, EmptyState, Banner, Link } from '@shopify/polaris';

import useFetch from '../hooks/useFetch';
import { teams as teamRoutes } from '../constants/routes';
import Protected from '../layouts/Protected';

const Home = ({
  attemptedTeamPreLoad,
  teams: teamsProp = [],
  loadingTeamsError: loadingTeamsErrorProp = '',
}) => {
  const [teams, setTeams] = useState(teamsProp);
  const [loadingTeamsError, setLoadingTeamsError] = useState(loadingTeamsErrorProp);
  const [getTeams, isLoading, result, error] = useFetch(teamRoutes.search());

  useEffect(() => {
    if (error) {
      setLoadingTeamsError(error);
    }
  }, [error]);

  useEffect(() => {
    if (result) {
      setTeams(result);
    }
  }, [result])

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
            {!isLoading && teams.length > 0 && (
              <Card sectioned title="Your teams" load actions={[{ content: 'Add team' }]}>
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
              </Card>
            )}

            {!isLoading && teams.length === 0 && (
              <Card>
                <EmptyState action={{ content: 'Add Team' }} heading={'Manage teams'}>
                  <p>Add and remove teams that you manage.</p>
                </EmptyState>
              </Card>
            )}

            {!isLoading && loadingTeamsError && (
              <Banner
                status="critical"
                title="There was an issue loading your teams"
              >
                <p>Please <Link>try again.</Link> If this issue persists, contact support.</p>
              </Banner>
            )}

            {isLoading && <SkeletonBodyText />}
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

