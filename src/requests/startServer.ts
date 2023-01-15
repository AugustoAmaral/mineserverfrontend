export interface StartType {}

export const startServer = (): Promise<StartType> => {
  return fetch(`${process.env.REACT_APP_API_URL}start`)
    .then((r) => r.json())
    .then((r) => r);
};
