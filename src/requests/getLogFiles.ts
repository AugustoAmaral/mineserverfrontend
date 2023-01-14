export interface LogFilesType {
  files: string[];
}

export const getLogFiles = (): Promise<LogFilesType> => {
  return fetch(`${process.env.REACT_APP_API_URL}log-files`)
    .then((r) => r.json())
    .then((r) => r);
};
