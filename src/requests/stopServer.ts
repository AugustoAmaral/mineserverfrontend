export interface StopType {}

export const stopServer = (): Promise<StopType> => {
  return fetch(`${process.env.REACT_APP_API_URL}stop`)
    .then((r) => r.json())
    .then((r) => r);
};
