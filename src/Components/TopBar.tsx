import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { describeDate } from "./helpers";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { cleanLocalUser } from "../functions";

type TopBarProps = {
  running?: boolean;
  restarting?: boolean;
  restartTimeout?: number;
  autoRestart?: boolean;
  onlineSince: Date;
  loading: boolean;
  onSwitchAutoRestart: () => void;
  onSwitchPower: () => void;
};

export default function TopBar({
  running = false,
  restarting = true,
  restartTimeout = 15,
  autoRestart = true,
  onlineSince = new Date(),
  loading = true,
  onSwitchAutoRestart = () => {},
  onSwitchPower = () => {},
}: TopBarProps) {
  const handleLogoff = () => {
    cleanLocalUser();
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <Tooltip
            title={restarting ? "Reiniciando" : running ? "Desligar" : "Ligar"}
          >
            <IconButton
              size="large"
              edge="start"
              color={restarting ? "warning" : running ? "inherit" : "error"}
              onClick={onSwitchPower}
              disabled={restarting || loading}
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={`Ao ativar essa opção, o servidor irá religar automaticamente feche após ${restartTimeout} segundos.`}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={autoRestart}
                  disabled={loading}
                  onChange={onSwitchAutoRestart}
                />
              }
              label="Auto restart?"
            />
          </Tooltip>
          <Tooltip
            title={
              restarting
                ? "Reiniciando"
                : running
                ? onlineSince.toLocaleString()
                : "Offline"
            }
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {restarting
                ? "Reiniciando..."
                : running
                ? `Online desde ${describeDate(onlineSince)}`
                : "Offline"}
            </Typography>
          </Tooltip>
          <Button color="inherit" onClick={handleLogoff}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
