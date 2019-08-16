import React from 'react';
import { useRouter } from 'next/router';
import { Form } from 'informed';
import { FormLayout, Card, DisplayText, Layout, Button, Page } from '@shopify/polaris';

import TextField from '../components/TextField';
import { isRequired } from '../utils/validation';

const HomePage = () => {
  const router = useRouter();

  const handleSubmit = (values) => {
    console.log('Submitting...', values);
  };

  const handleRegisterClick = e => {
    e.preventDefault();
    router.push('/register');
  };

  const actions = [
    { content: 'Register', onAction: handleRegisterClick },
  ];

  return (
    <Page title={'Squad leader'}>
      <Layout>
        <Layout.Section>
          <DisplayText size="small">
            Manage your recreational sports teams with ease.
          </DisplayText>
        </Layout.Section>

        <Layout.Section>
          <Card title="Login" sectioned actions={actions}>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  id="loginEmail"
                  field="loginEmail"
                  name="email"
                  label="Email"
                  validate={isRequired}
                  validateOnBlur
                />

                <TextField
                  id="loginPassword"
                  field="loginPassword"
                  name="password"
                  label="Password"
                  type="password"
                  validate={isRequired}
                  validateOnBlur
                />

                <Button submit>Login</Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default HomePage;
