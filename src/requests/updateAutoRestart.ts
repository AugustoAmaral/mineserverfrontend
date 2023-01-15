export interface AutoRestartType {
  status: boolean;
}

export const updateAutoRestart = (): Promise<AutoRestartType> => {
  return fetch(`${process.env.REACT_APP_API_URL}auto-restart`)
    .then((r) => r.json())
    .then((r) => r);
};
