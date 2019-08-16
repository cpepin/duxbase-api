import React from 'react';
import { Form } from 'informed';
import { FormLayout, Card, DisplayText, Layout, Button } from '@shopify/polaris';

import TextField from '../components/TextField';
import Main from '../layouts/main';
import { isRequired } from '../utils/validation';

const HomePage = () => {
  const handleSubmit = (values) => {
    console.log('Submitting...', values);
  };

  return (
    <Main title={'Squad leader'}>
      <Layout.Section>
        <DisplayText size="small">
          Manage your recreational sports teams with ease.
        </DisplayText>
      </Layout.Section>

      <Layout.Section>
        <Card title="Login" sectioned>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                id="email"
                name="email"
                label="Email"
                field="email"
                validate={isRequired}
                validateOnBlur
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                field="password"
                validate={isRequired}
                validateOnBlur
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
