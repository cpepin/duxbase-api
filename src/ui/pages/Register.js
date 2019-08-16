import React from 'react';
import { Button, Card, Layout, FormLayout } from '@shopify/polaris';
import { Form } from 'informed';

import TextField from '../components/TextField';
import Main from '../layouts/main';

const Register = () => (
  <Main title="Sign up">
    <Layout.Section>
      <Card sectioned>
        <Form>
          <FormLayout>
            <TextField
              id="registerEmail"
              field="registerEmail"
              name="email"
              label="Email"
            />

            <TextField
              id="registerPassword"
              field="registerPassword"
              name="password"
              label="Password"
              type="password"
            />

            <Button submit>Submit</Button>
          </FormLayout>
        </Form>
      </Card>
    </Layout.Section>
  </Main>
);

export default Register;
