export const sendCommand = (command: string): Promise<void> => {
  return fetch(`${process.env.REACT_APP_API_URL}run-command?command=${command}`)
    .then((r) => r.json())
    .then(() => {});
};
