import React from 'react';

const InputGroup = ({ children, ...rest }) => (
  <>
    <div {...rest}>
      {children}
    </div>

    <style jsx>{`
      div + div {
        margin-top: 1rem;
      }
    `}</style>
  </>
);

export default InputGroup;
