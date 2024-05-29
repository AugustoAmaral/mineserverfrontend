import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface OldLogsProps {
  logs: { name: string; url: string }[];
}

const OldLogsAccordionList: React.FC<OldLogsProps> = ({ logs }) => {
  return (
    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Logs Antigos</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {logs.map((log, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={log.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="body2" noWrap>
                    {log.name}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default OldLogsAccordionList;
