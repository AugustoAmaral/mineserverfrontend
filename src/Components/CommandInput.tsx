import * as React from "react";
import { Box, Button, TextField, InputAdornment } from "@mui/material";

interface CommandInputProps {
  onSendCommand: (command: string) => Promise<void>;
}

const CommandInput: React.FC<CommandInputProps> = ({ onSendCommand }) => {
  const [command, setCommand] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [submitCount, setSubmitCount] = React.useState(0); // Contador para forçar re-renderização

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (command.trim() !== "") {
      setIsDisabled(true);
      onSendCommand(command).then(() => {
        setCommand("");
        setIsDisabled(false);
        setSubmitCount((prev) => prev + 1); // Incrementar o contador para re-renderizar o formulário
      });
    }
  };

  return (
    <form
      onSubmit={handleSend}
      noValidate
      autoComplete="off"
      key={submitCount}
      style={{ width: "100%" }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
      >
        <TextField
          fullWidth
          disabled={isDisabled}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">/</InputAdornment>,
          }}
          placeholder="Enviar comando ao servidor"
          name="serverCommand"
          autoComplete="on"
          variant="standard"
          sx={{ minWidth: "350px" }}
        />
        <Button type="submit" variant="contained" disabled={isDisabled}>
          Enviar
        </Button>
      </Box>
    </form>
  );
};

export default CommandInput;
