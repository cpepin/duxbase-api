import React from 'react';

import Page from '../layouts/main';

const Teams = () => (
  <Page>
    <h1>
      Your teams
    </h1>

    <section>
      <ul>
        <li><a href="#">Buffalo Wild Wings</a></li>
        <li><a href="#">Heberts Restaurant</a></li>
        <li><a href="#">Add another team</a></li>
      </ul>
    </section>

    <style jsx>{`
      h1 {
        text-align: center;
      }

      section {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
  </Page>
);

export default Teams;
