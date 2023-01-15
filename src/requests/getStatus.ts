export interface StatusType {
  currentLog?: string;
  restartTimeout: number;
  restarting: boolean;
  running: boolean;
}

export const getStatus = (): Promise<StatusType> => {
  return fetch(`${process.env.REACT_APP_API_URL}status`)
    .then((r) => r.json())
    .then((r) => r);
};
