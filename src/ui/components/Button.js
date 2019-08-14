import React from 'react';

const Button = ({ children, ...rest }) => (
  <>
    <button {...rest}>{children}</button>

    <style jsx>{`
      button {
        display: block;
        padding: 0.5rem 1rem;
        font-family: inherit;
        font-size: 1rem;

        border: 1px solid black;
        width: 6rem;
        max-width: 6rem;
        margin-top: 1rem;

        cursor: pointer;
      }
    `}</style>
  </>
);

export default Button;
