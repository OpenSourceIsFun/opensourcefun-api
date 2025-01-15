export type ValidationError = {
  [P in string]: string[] | ValidationError | ValidationError[];
};
