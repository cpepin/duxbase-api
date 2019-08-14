import React, { useState } from 'react';
import Head from 'next/head';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Label from '../components/Label';
import InputGroup from '../components/InputGroup';

import Page from '../layouts/main';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setState, e) => setState(e.target.value);
  const handleEmailChange = handleChange.bind({}, setEmail);
  const handlePasswordChange = handleChange.bind({}, setPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      console.log('Submitting...', email, password);
    }
  };

  return (
    <>
      <Page>
        <h1>Squad Leader</h1>

        <p>
          Manage your recreational sports teams with ease.
        </p>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <TextInput id="email" name="email" onChange={handleEmailChange} />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <TextInput type="password" id="password" name="password" onChange={handlePasswordChange} />
          </InputGroup>

          <Button type="submit">Login</Button>
        </form>
      </Page>

      <style jsx>{`
        form {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default HomePage;
