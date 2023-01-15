export interface SendCommandType {}

export const sendCommand = (command: string): Promise<SendCommandType> => {
  return fetch(`${process.env.REACT_APP_API_URL}run-command?command=${command}`)
    .then((r) => r.json())
    .then((r) => r);
};
