import React from "react";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import { appLabels } from "../../constant/label";
const {
  settingsTabItemsLabels: {
    timeTab: { daysTitle },
  },
} = appLabels;

const TimeHeatmapSettings = ({ configuration, onChange }) => {
  if (!configuration) return null;

  const ageColumn = configuration.columns.find((c) => c.field === "age");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            {daysTitle}
          </Typography>
          <TextField
            id="age-min"
            label="Min Days"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={ageColumn?.style?.min || 0}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
          <TextField
            id="age-max"
            label="Max Days"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={ageColumn?.style?.max || 30}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TimeHeatmapSettings;
