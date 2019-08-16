import isEmailValid from 'validator/lib/isEmail';

export const isRequired = value => !value ? 'Field is required.' : undefined;
export const isEmail = value => !value || !isEmailValid(value) ? 'Please enter a valid email.' : undefined;

