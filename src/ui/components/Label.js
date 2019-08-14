import React from 'react';

const Label = ({ children, ...rest }) => (
  <>
    <label {...rest}>
      {children}
    </label>

    <style jsx>{`
      label {
        display: block;
        text-align: left;
        font-weight: 500;
        font-size: 0.875rem;
      }
    `}</style>
  </>
);

export default Label;
