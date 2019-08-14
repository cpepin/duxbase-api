import React from 'react';

import Page from '../layouts/main';
import TextInput from '../components/TextInput';
import InputGroup from '../components/InputGroup';
import Label from '../components/Label';
import Button from '../components/Button';

const Register = () => (
  <>
    <Page>
      <h1>Register</h1>

      <form>
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <TextInput id="email" name="email" />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password" type="password">Password</Label>
          <TextInput id="password" name="password" />
        </InputGroup>

        <Button type="submit">Submit</Button>
      </form>
    </Page>
  </>
);

export default Register;
