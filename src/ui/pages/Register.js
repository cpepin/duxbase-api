import React from 'react';
import { Button, Card, Layout, FormLayout } from '@shopify/polaris';
import { Form } from 'informed';

import TextField from '../components/TextField';
import Main from '../layouts/main';
import { isEmail } from '../utils/validation';

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
            />

            <Button submit>Submit</Button>
          </FormLayout>
        </Form>
      </Card>
    </Layout.Section>
  </Main>
);

export default Register;
