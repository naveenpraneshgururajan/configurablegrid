import React from "react";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import { appLabels } from "../../constant/label";
const {
  settingsTabItemsLabels: {
    numberTab: { salesTitle, revenueTitle, profitTitle },
  },
} = appLabels;

const NumberHeatmapSettings = ({ configuration, onChange }) => {
  if (!configuration) return null;

  const salesColumn = configuration.columns.find((c) => c.field === "sales");
  const revenueColumn = configuration.columns.find(
    (c) => c.field === "revenue"
  );
  const profitColumn = configuration.columns.find((c) => c.field === "profit");

  return (
    <Grid container spacing={3}>
      {/* Sales Settings */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            {salesTitle}
          </Typography>
          <TextField
            id="sales-min"
            label="Min Value"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={salesColumn?.style?.min || 0}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
          <TextField
            id="sales-max"
            label="Max Value"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={salesColumn?.style?.max || 1000}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
        </Paper>
      </Grid>

      {/* Revenue Settings */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            {revenueTitle}
          </Typography>
          <TextField
            id="revenue-min"
            label="Min Value"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={revenueColumn?.style?.min || 0}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
          <TextField
            id="revenue-max"
            label="Max Value"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={revenueColumn?.style?.max || 50000}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
        </Paper>
      </Grid>

      {/* Profit Settings */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            {profitTitle}
          </Typography>
          <TextField
            id="profit-min"
            label="Min Value"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={profitColumn?.style?.min || 0}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
          <TextField
            id="profit-max"
            label="Max Value"
            type="number"
            fullWidth
            margin="normal"
            defaultValue={profitColumn?.style?.max || 100}
            InputLabelProps={{ shrink: true }}
            onChange={onChange}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NumberHeatmapSettings;
