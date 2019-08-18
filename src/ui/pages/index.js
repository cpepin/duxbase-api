import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'informed';
import { FormLayout, Banner, Card, DisplayText, Layout, Button, Page } from '@shopify/polaris';

import TextField from '../components/TextField';
import { isRequired } from '../utils/validation';
import usePost from '../hooks/usePost';
import { auth } from '../constants/routes';
import Public from '../layouts/Public';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
  const { setUser } = useAuth();
  const [login, isLoading, result, error] = usePost(auth.login);
  const router = useRouter();

  const handleSubmit = (values) => {
    const payload = {
      email: values.loginEmail,
      password: values.loginPassword,
    };

    login(payload);
  };

  const handleRegisterClick = e => {
    e.preventDefault();
    router.push('/register');
  };

  const actions = [
    { content: 'Register', onAction: handleRegisterClick },
  ];

  useEffect(() => {
    if (result) {
      setUser(result);
    }
  }, [result]);

  return (
    <Public>
      <Page title={'Squad leader'}>
        <Layout>
          <Layout.Section>
            <DisplayText size="small">
              Manage your recreational sports teams with ease.
            </DisplayText>
          </Layout.Section>

          {error && (
            <Layout.Section>
              <Banner status="critical" title="Login Failed">
                Incorrect Email/Password combination.
              </Banner>
            </Layout.Section>
          )}

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

                  <Button submit loading={isLoading}>Login</Button>
                </FormLayout>
              </Form>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Public>
  );
};

export default HomePage;
