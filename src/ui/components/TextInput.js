import React from 'react';

import Label from './Label';

const TextInput = ({ ...rest }) => (
  <>
    <input
      type="text"
      {...rest}
    />

    <style jsx>{`
      input {
        display: block;
        font-family: inherit;
        font-size: 1rem;
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.25rem;
      }
    `}</style>
  </>
);

export default TextInput;
