import React from 'react';
import { Banner, Button, Card, Layout, FormLayout, Page } from '@shopify/polaris';
import { Form } from 'informed';

import TextField from '../components/TextField';
import { isEmail, isPassword } from '../utils/validation';
import usePost from '../hooks/usePost';
import { user } from '../constants/routes';
import Public from '../layouts/Public';
import { useRouter } from 'next/router';

const passwordHelpText = (
  <>
    Password must contain the following:
    <ul>
      <li>Must have two uppercase letters</li>
      <li>One special character [!@#$&*]</li>
      <li>Two digits</li>
      <li>Three lowercase letters</li>
      <li>A length of 8</li>
    </ul>
  </>
);

const Register = () => {
  const [registerUser, isLoading, _, error] = usePost(user.register);
  const router = useRouter();

  const handleLoginClick = e => {
    e.preventDefault();
    router.push('/');
  };

  const action = { content: 'Back to login', onAction: handleLoginClick };

  const handleSubmit = (values) => {
    const payload = {
      email: values.registerEmail,
      password: values.registerPassword,
    };

    registerUser(payload);
  };

  return (
    <Public>
      <Page title="Sign up" primaryAction={action}>
        <Layout>
          {error && (
            <Layout.Section>
              <Banner status="critical" title="Registration failed">
                There was a problem submitting your registration.
                If this problem persists, please contact support.
              </Banner>
            </Layout.Section>
          )}

          <Layout.Section>
            <Card sectioned>
              <Form onSubmit={handleSubmit}>
                <FormLayout>
                  <TextField
                    id="registerEmail"
                    field="registerEmail"
                    name="email"
                    label="Email"
                    validate={isEmail}
                    validateOnBlur
                  />

                  <TextField
                    id="registerPassword"
                    field="registerPassword"
                    name="password"
                    label="Password"
                    type="password"
                    helpText={passwordHelpText}
                    validate={isPassword}
                    validateOnBlur
                  />

                  <Button submit loading={isLoading}>Submit</Button>
                </FormLayout>
              </Form>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Public>
  );
};

export default Register;
