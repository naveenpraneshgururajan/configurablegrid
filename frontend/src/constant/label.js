export const numberHeatmapLabels = {
  pageTitle: `Number Heatmap`,
  description: `This example shows how you can turn numbers into visual coloured heatmap. 
Stronger colors highlight higher values, making it easy to spot trends at a glance. 
Take a look at the Sales, Revenue, and Profit columns to see how the coloring helps highlight performance differences.`,

  featuresTitle: "Features demonstrated:",
  featuresListItems: [
    "Each column has its own heatmap styling",
    "Colors smoothly shift from minimum to maximum based on the values values",
    "Colour more towards Green indicate good performance, colour more towards red indicate, didnt meet the expected value",
  ],

  exampleTitle: "Example of How Config is returned from the API:",
  responseFormat: ` {{
  "id": "heatmap",
  "title": "Sales Revenew Profit Heatmap",
  "columns": [
    { "field": "name", "header": "Product Name", "width": "25%" },
    { "field": "category", "header": "Category", "width": "15%" },
    { 
      "field": "sales", "header": "Sales (Units)", "width": "15%",
      "style": {
        "type": "heatmap",
        "min": 0,
        "max": 1000,
      }
    },
    ...
  ]
}}`,
};

export const rangeHeatmapLabels = {
  pageTitle: `Range Heatmap`,
  description: ` This example shows how you can visually style cells based on the value they hold. For instance, CPU and Memory usage are highlighted in green, orange, or red depending on how high or low they are. The "Status" column also gets custom colors based on its value, making it easy to understand performance at a glance.`,

  featuresTitle: "Features demonstrated:",
  featuresListItems: [
    "Each column is styled differently based on what it shows",
    "Colors gradually shift from low to high values to help spot trends easily",
    "Greener shades mean better performance, while red tones highlight areas that may need attention",
  ],

  exampleTitle: "Example of How Config is returned from the API:",
  responseFormat: ` {
  "id": "rangeheatmap",
  "title": "System Performance Dashboard",
  "columns": [
    { "field": "server", "header": "Server Name", "width": "20%" },
    { "field": "location", "header": "Location", "width": "15%" },
    {
      "field": "cpu",
      "header": "CPU Usage (%)",
      "width": "15%",
      "style": {
        "type": "rangeheatmap",
        "ranges": [
          {"min": 0, "max": 60, "style": {"color": "#008000"}},
          {"min": 60, "max": 85, "style": {"color": "#FFA500"}},
          {"min": 85, "max": 100, "style": {"color": "#FF0000", "fontWeight": "bold"}}
        ]
      }
    },
    ...
  ],
  "cellStyles": [
    {
      "field": "status",
      "conditions": [
        {"value": "online", "style": {"backgroundColor": "#d4edda", "color": "#155724"}},
        {"value": "warning", "style": {"backgroundColor": "#fff3cd", "color": "#856404"}},
        {"value": "offline", "style": {"backgroundColor": "#f8d7da", "color": "#721c24"}}
      ]
    }
  ]
}`,
};

export const timeHeatmapLabels = {
  pageTitle: `Time Heatmap`,
  description: `This example uses color to show how recent each row is. Newer items are shaded green, while older ones fade toward red. It's a quick and easy way to spot the most recent activity at a glance.`,

  featuresTitle: "Features demonstrated:",
  featuresListItems: [
    "Rows are colored based on how recent they are, using a green-to-red gradient",
    "A simple timeline helps visually rank items from newest to oldest",
    "The age of each item is calculated automatically using its timestamp",
  ],

  exampleTitle: "Example of How Config is returned from the API:",
  responseFormat: ` {
  "id": "timestamp",
  "title": "Project Activity Timeline",
  "columns": [
    { "field": "task", "header": "Task", "width": "25%" },
    { "field": "status", "header": "Status", "width": "15%" },
    { "field": "owner", "header": "Asigne", "width": "15%" },
    { "field": "priority", "header": "Priority", "width": "15%" },
    { 
      "field": "age", 
      "header": "Age (Days)", 
      "width": "15%",
      "style": {
        "type": "timestamp",
        "min": 0,
        "max": 30,
        "invertColor": true
      }
    },
    { "field": "timestamp", "header": "Last Updated", "width": "15%" }
  ]
}`,
};

export const headerFooterLabels = {
  header: `HeatMap Generator`,
  theme: `Theme:`,
  footer: `2025 Heatmap Generator`,
};

export const appLabels = {
  viewButton: `View HeatMap`,
  title: `Heatmap Generator`,
  description: `Shows Different varieties how Heatmaps can be plotted`,
  numberHeatmapTitle: `Number Heatmaps`,
  numberHeatmapDescription: `Displays Heatmap based on inidividual Cell values for Sales/Revenue and Profit Margins.`,
  timeHeatmapTitle: `Time Heatmaps`,
  timeHeatmapDescription: `Utilises a single Cell value and highlights the entire row of data.`,
  rangeHeatmapTitle: `Range Heatmaps`,
  rangeHeatmapDescription: `Highlights the inidividual test within the Cells to differentiate the values.`,
  settingConfigureTitle: `Configure Heatmap Settings`,
  settingsTabLabel: {
    numberMap: `Number Heatmap`,
    timeMap: `Time Heatmap`,
    rangeMap: `Range Heatmap`,
  },
  loading: `Loading configuration...`,
  updateSettingsButton: `Update Configuration`,
  settingsTabItemsLabels: {
    numberTab: {
      salesTitle: `Sales Settings`,
      revenueTitle: `Revenue Settings`,
      profitTitle: `Profit Settings`,
    },
    timeTab: {
      daysTitle: `Days Settings`,
    },
    rangeTitle: {
      cpuTitle: `CPU Usage Ranges`,
      memoryTitle: `Memory Usage Ranges`,
      colorLowConfig: `Low Range (Green)`,
      colorMediumConfig: `Medium Range (Orange)`,
      colorHighConfig: `High Range (Red)`,
    },
  },
};
