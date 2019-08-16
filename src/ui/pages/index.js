import React, { useState } from 'react';
import { Form, FormLayout, TextContainer, TextField, Card, DisplayText, Layout, Button } from '@shopify/polaris';

import Main from '../layouts/main';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log('Submitting...', email, password);
    }
  };

  return (
    <Main title={'Squad leader'}>
      <Layout.Section>
        <TextContainer>
          <DisplayText size="small">
            Manage your recreational sports teams with ease.
          </DisplayText>
        </TextContainer>
      </Layout.Section>

      <Layout.Section>
        <Card title="Login" sectioned>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                id="email"
                name="email"
                label="Email"
                onChange={setEmail}
                value={email}
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                onChange={setPassword}
                value={password}
              />

              <Button submit>Login</Button>
            </FormLayout>
          </Form>
        </Card>
      </Layout.Section>
    </Main>
  );
};

export default HomePage;
