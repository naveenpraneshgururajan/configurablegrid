import React from "react";
import { Grid, Paper, Typography, TextField, Box } from "@mui/material";

const RangeHeatmapSettings = ({ configuration, onChange }) => {
  if (!configuration) return null;

  const cpuColumn = configuration.columns.find((c) => c.field === "cpu");
  const memoryColumn = configuration.columns.find((c) => c.field === "memory");

  return (
    <Grid container spacing={3}>
      {/* CPU Settings */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            CPU Usage Ranges
          </Typography>

          {/* Low Range (Green) */}
          <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #008000" }}>
            <Typography color="primary" variant="subtitle2" gutterBottom>
              Low Range (Green)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="cpu-low-min"
                  label="Min"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={cpuColumn?.style?.ranges[0]?.min || 0}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="cpu-low-max"
                  label="Max"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={cpuColumn?.style?.ranges[0]?.max || 60}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="cpu-low-color"
                  label="Color"
                  type="color"
                  fullWidth
                  size="small"
                  defaultValue={
                    cpuColumn?.style?.ranges[0]?.style?.color || "#008000"
                  }
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Medium Range (Orange) */}
          <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FFA500" }}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              Medium Range (Orange)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="cpu-med-min"
                  label="Min"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={cpuColumn?.style?.ranges[1]?.min || 60}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="cpu-med-max"
                  label="Max"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={cpuColumn?.style?.ranges[1]?.max || 85}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="cpu-med-color"
                  label="Color"
                  type="color"
                  fullWidth
                  size="small"
                  defaultValue={
                    cpuColumn?.style?.ranges[1]?.style?.color || "#FFA500"
                  }
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* High Range (Red) */}
          <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FF0000" }}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              High Range (Red)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="cpu-high-min"
                  label="Min"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={cpuColumn?.style?.ranges[2]?.min || 85}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="cpu-high-max"
                  label="Max"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={cpuColumn?.style?.ranges[2]?.max || 100}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="cpu-high-color"
                  label="Color"
                  type="color"
                  fullWidth
                  size="small"
                  defaultValue={
                    cpuColumn?.style?.ranges[2]?.style?.color || "#FF0000"
                  }
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      {/* Memory Settings */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            Memory Usage Ranges
          </Typography>

          {/* Low Range (Green) */}
          <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #008000" }}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              Low Range (Green)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="mem-low-min"
                  label="Min"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={memoryColumn?.style?.ranges[0]?.min || 0}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="mem-low-max"
                  label="Max"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={memoryColumn?.style?.ranges[0]?.max || 60}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="mem-low-color"
                  label="Color"
                  type="color"
                  fullWidth
                  size="small"
                  defaultValue={
                    memoryColumn?.style?.ranges[0]?.style?.color || "#008000"
                  }
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Medium Range (Orange) */}
          <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FFA500" }}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              Medium Range (Orange)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="mem-med-min"
                  label="Min"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={memoryColumn?.style?.ranges[1]?.min || 60}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="mem-med-max"
                  label="Max"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={memoryColumn?.style?.ranges[1]?.max || 85}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="mem-med-color"
                  label="Color"
                  type="color"
                  fullWidth
                  size="small"
                  defaultValue={
                    memoryColumn?.style?.ranges[1]?.style?.color || "#FFA500"
                  }
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Box>

          {/* High Range (Red) */}
          <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FF0000" }}>
            <Typography variant="subtitle2" gutterBottom color="primary">
              High Range (Red)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  id="mem-high-min"
                  label="Min"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={memoryColumn?.style?.ranges[2]?.min || 85}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="mem-high-max"
                  label="Max"
                  type="number"
                  fullWidth
                  size="small"
                  defaultValue={memoryColumn?.style?.ranges[2]?.max || 100}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="mem-high-color"
                  label="Color"
                  type="color"
                  fullWidth
                  size="small"
                  defaultValue={
                    memoryColumn?.style?.ranges[2]?.style?.color || "#FF0000"
                  }
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RangeHeatmapSettings;
