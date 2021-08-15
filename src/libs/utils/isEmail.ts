/* eslint-disable no-useless-escape */

const mailRegexp =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const isEmail = (value: string): boolean => {
  return value.match(mailRegexp) !== null;
};
