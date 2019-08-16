import React from 'react';
import { Layout, Card, ResourceList, TextStyle } from '@shopify/polaris';

import Main from '../layouts/main';

const teams = [
  { id: 0, name: 'Buffalo Wild Wings' },
  { id: 1, name: 'Heberts Restaurant' },
];

const Teams = () => (
  <Main title="Your teams">
    <Layout.Section>
      <Card>
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
    </Layout.Section>
  </Main>
);

export default Teams;
