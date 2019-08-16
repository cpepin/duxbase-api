import React from 'react';
import { Button, Form, Card, TextField, Layout, FormLayout } from '@shopify/polaris';

import Main from '../layouts/main';

const Register = () => (
  <Main title="Sign up">
    <Layout.Section>
      <Card sectioned>
        <Form>
          <FormLayout>
            <TextField
              name={'email'}
              id={'email'}
              label={'Email'}
            />

            <TextField
              name={'password'}
              id={'password'}
              label={'Password'}
              type={'password'}
            />

            <Button submit>Submit</Button>
          </FormLayout>
        </Form>
      </Card>
    </Layout.Section>
  </Main>
);

export default Register;
