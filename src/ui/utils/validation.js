import isEmailValid from 'validator/lib/isEmail';
import { PASSWORD_REGEX } from '../constants/regex';

export const isRequired = value => !value ? 'Field is required.' : undefined;
export const isEmail = value => !value || !isEmailValid(value) ? 'Please enter a valid email.' : undefined;
export const isPassword = value => !value || !PASSWORD_REGEX.test(value) ? 'Please enter a valid password.' : undefined;


