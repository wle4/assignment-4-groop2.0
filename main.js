// ========================================
// Chart 1: Buffer Status Counts (Simple Grouped Bar Chart)
// ========================================
const spec1 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Permit Counts by Buffer Status",
  "data": {
    "url": "cleaned_parking_zones.csv"
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "BUFFER", "type": "nominal", "axis": {"labelAngle": 0}},
    "y": {"aggregate": "count", "type": "quantitative"},
    "color": {"field": "BUFFER", "type": "nominal"},
    "tooltip": [
      {"field": "BUFFER", "type": "nominal"},
      {"aggregate": "count", "type": "quantitative"}
    ]
  }
};

// ========================================
// Chart 2: % of Permit Status by Ward with dropdown filter
// ========================================
const spec2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "% of Permit Status by Ward",
  "data": {
    "url": "cleaned_parking_zones.csv"
  },
  "params": [{
    "name": "bufferDropdown",
    "value": null,
    "bind": {
      "input": "select", 
      "options": [null, "Y", "N"],
      "labels": ["All", "Yes", "No"],
      "name": "Buffer Status: "
    }
  }],
  "transform": [
    {"filter": "bufferDropdown == null || datum.BUFFER == bufferDropdown"}
  ],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "WARD - LOW",
      "type": "ordinal",
      "axis": {"title": "Ward"}
    },
    "y": {
      "aggregate": "count",
      "stack": "normalize",
      "type": "quantitative",
      "axis": {
        "format": "%",
        "title": "Percent of Permits"
      }
    },
    "color": {
      "field": "STATUS",
      "type": "nominal",
      "scale": {
        "domain": ["ACTIVE", "RESCINDED"],
        "range": ["steelblue", "orange"]
      }
    },
    "tooltip": [
      {"field": "WARD - LOW", "type": "ordinal"},
      {"field": "STATUS", "type": "nominal"},
      {"aggregate": "count", "type": "quantitative"}
    ]
  }
};

// ========================================
// Chart 3: Street Type Distribution with Ward dropdown filter
// ========================================
const spec3 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Street Type Distribution",
  "width": "container",
  "height": 400,
  "data": {
    "url": "cleaned_parking_zones.csv"
  },
  "params": [{
    "name": "wardDropdown",
    "value": null,
    "bind": {
      "input": "select",
      "options": [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
      "labels": ["All Wards", "Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5", "Ward 6", "Ward 7", "Ward 8", "Ward 9", "Ward 10", "Ward 11", "Ward 12", "Ward 13", "Ward 14", "Ward 15", "Ward 16", "Ward 17", "Ward 18", "Ward 19", "Ward 20", "Ward 21", "Ward 22", "Ward 23", "Ward 24", "Ward 25", "Ward 26", "Ward 27", "Ward 28", "Ward 29", "Ward 30", "Ward 31", "Ward 32", "Ward 33", "Ward 34", "Ward 35", "Ward 36", "Ward 37", "Ward 38", "Ward 39", "Ward 40", "Ward 41", "Ward 42", "Ward 43", "Ward 44", "Ward 45", "Ward 46", "Ward 47", "Ward 48", "Ward 49", "Ward 50"],
      "name": "Select Ward: "
    }
  }],
  "transform": [
    {"filter": "wardDropdown == null || datum['WARD - LOW'] == wardDropdown"}
  ],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "STREET TYPE",
      "type": "nominal",
      "sort": "-y",
      "axis": {"title": "Street Type", "labelAngle": -45}
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative",
      "axis": {"title": "Number of Permits"}
    },
    "color": {
      "field": "STREET TYPE",
      "type": "nominal",
      "legend": null
    },
    "tooltip": [
      {"field": "STREET TYPE", "type": "nominal"},
      {"aggregate": "count", "type": "quantitative", "title": "Number of Permits"}
    ]
  }
};

const spec4 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "hconcat": [
    {
      
  "title": "Top 30 Streets by Number of Parking Permits",
  "width": 600,
  "height": 400,
  "data": {"url": "cleaned_parking_zones.csv"},
  "selection": {
    "street_select": {
      "type": "single",
      "fields": ["STREET NAME"]
    }
  },
  "transform": [
    {"aggregate": [{"op": "count", "as": "PermitCount"}], "groupby": ["STREET NAME", "WARD - LOW"]},
    {"window": [{"op": "rank", "as": "rank"}], "sort": [{"field": "PermitCount", "order": "descending"}]},
    {"filter": "datum.rank <= 30"} // Top 30 streets
  ],
  "mark": {
    "type": "circle",
    "tooltip": true
  },
  "encoding": {
    "x": {
      "field": "WARD - LOW",
      "type": "ordinal",
      "axis": {"title": "Ward"}
    },
    "y": {
      "field": "PermitCount",
      "type": "quantitative",
      "axis": {"title": "Number of Permits"},
      "scale": {"domain": [14, 32]}  // <<<<< FORCED scale from 14 to 32 (instead of default 0 to 30)
    },
    "size": {
      "field": "PermitCount",
      "type": "quantitative",
      "scale": {"range": [100, 800]},
      "legend": null
    },
    "color": {
      "field": "PermitCount",
      "type": "quantitative",
      "scale": {"scheme": "tealblues"},
      "legend": { "title": "PermitCount" }
    },
    "tooltip": [
      {"field": "STREET NAME", "type": "nominal"},
      {"field": "WARD - LOW", "type": "ordinal"},
      {"field": "PermitCount", "type": "quantitative"}
    ]
  }
}
,
    {
      "title": "Status Breakdown for Selected Street",
      "width": 300,
      "height": 400,
      "data": {"url": "cleaned_parking_zones.csv"},
      "transform": [
        {"filter": {"selection": "street_select"}},
        {"aggregate": [{"op": "count", "as": "count"}], "groupby": ["STATUS"]}
      ],
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "STATUS",
          "type": "nominal",
          "axis": {"title": "Status"}
        },
        "y": {
          "field": "count",
          "type": "quantitative",
          "axis": {"title": "Number of Permits"}
        },
        "color": {"field": "STATUS", "type": "nominal"},
        "tooltip": [
          {"field": "STATUS", "type": "nominal"},
          {"field": "count", "type": "quantitative"}
        ]
      }
    }
  ]
};

// ========================================
// Chart 5: Permit Status Scatter Explorer (Dynamic Mapping)
// ========================================
// ========================================
// Task 4 - Cleaned up: Only Scatter Explorer
// ========================================

const spec7 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Permit Density Across Wards",
  "width": "container",
  "height": 600,
  "data": {
    "url": "merged_map_final_fixed.geojson",
    "format": { "type": "geojson" }
  },
  "transform": [
    {
      "calculate": "datum.properties.count",
      "as": "PermitCount"
    },
    {
      "calculate": "datum.properties.ward",
      "as": "WardNumber"
    }
  ],
  "projection": {
    "type": "mercator",
    "center": [-87.6298, 41.8781],
    "scale": 50000
  },
  "mark": {
    "type": "geoshape",
    "stroke": "white",
    "strokeWidth": 0.5
  },
  "encoding": {
    "color": {
      "field": "PermitCount",
      "type": "quantitative",
      "scale": { "scheme": "blues" },
      "legend": { "title": "Permit Count" }
    },
    "tooltip": [
      { "field": "WardNumber", "type": "nominal", "title": "Ward" },
      { "field": "PermitCount", "type": "quantitative", "title": "Permit Count" }
    ]
  }
};








const spec5 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Street Name Search and Permit Counts",
  "width": "container",
  "height": 500,
  "data": {
    "url": "cleaned_parking_zones.csv"
  },
  "params": [
    {
      "name": "streetSearch",
      "bind": {
        "input": "text",
        "placeholder": "Type a street name..."
      }
    }
  ],
  "transform": [
    {
      "filter": "streetSearch == null || streetSearch == '' || test(streetSearch, datum['STREET NAME'])"
    },
    {
      "aggregate": [{ "op": "count", "as": "PermitCount" }],
      "groupby": ["STREET NAME"]
    },
    {
      "window": [{"op": "rank", "as": "rank"}],
      "sort": [{"field": "PermitCount", "order": "descending"}]
    },
    {
      "filter": "datum.rank <= 30"  // Show top 30 matching streets only
    }
  ],
  "mark": "bar",
  "encoding": {
    "y": {
      "field": "STREET NAME",
      "type": "nominal",
      "sort": "-x",
      "axis": { "title": "Street Name" }
    },
    "x": {
      "field": "PermitCount",
      "type": "quantitative",
      "axis": { "title": "Number of Permits" }
    },
    "color": {
      "field": "PermitCount",
      "type": "quantitative",
      "scale": { "scheme": "blues" },
      "legend": null
    },
    "tooltip": [
      { "field": "STREET NAME", "type": "nominal" },
      { "field": "PermitCount", "type": "quantitative", "title": "Number of Permits" }
    ]
  }
};

function generateSpec6() {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "Street Explorer (Top 20 Streets)",
        "width": "container",
        "height": 500,
        "data": {
            "url": "cleaned_parking_zones.csv"
        },
        "transform": [
            {
                "filter": `
                    (${document.getElementById('wardDropdown').value == '' ? 'true' : "datum['WARD - LOW'] == " + document.getElementById('wardDropdown').value}) &&
                    (${document.getElementById('streetTypeDropdown').value == '' ? 'true' : "datum['STREET TYPE'] == '" + document.getElementById('streetTypeDropdown').value + "'"}) &&
                    datum['ADDRESS RANGE - LOW'] >= ${document.getElementById('addressRange').value}
                `
            },
            {
                "aggregate": [{ "op": "count", "as": "PermitCount" }],
                "groupby": ["STREET NAME"]
            },
            {
                "window": [{"op": "rank", "as": "rank"}],
                "sort": [{"field": "PermitCount", "order": "descending"}]
            },
            {
                "filter": "datum.rank <= 20" // <<< ONLY top 20 streets
            }
        ],
        "mark": "point",
        "encoding": {
            "x": { "field": "PermitCount", "type": "quantitative", "axis": { "title": "Number of Permits" }},
            "y": { "field": "STREET NAME", "type": "nominal", "sort": "-x", "axis": { "title": "Street Name" }},
            "color": { "field": "STREET NAME", "type": "nominal", "legend": null },
            "tooltip": [
                { "field": "STREET NAME", "type": "nominal" },
                { "field": "PermitCount", "type": "quantitative", "title": "Number of Permits" }
            ]
        }
    };
}


function updateChart6() {
    vegaEmbed("#vis6", generateSpec6(), { renderer: "svg", actions: false });
}

// Update immediately after loading
updateChart6();

// Attach listeners to all inputs
document.getElementById('wardDropdown').addEventListener('change', updateChart6);
document.getElementById('streetTypeDropdown').addEventListener('change', updateChart6);
document.getElementById('addressRange').addEventListener('input', () => {
    document.getElementById('rangeValue').innerText = document.getElementById('addressRange').value;
    updateChart6();
});




// Embed all visualizations
vegaEmbed("#vis1", spec1);
vegaEmbed("#vis2", spec2);
vegaEmbed("#vis3", spec3);
vegaEmbed("#vis4", spec4);
vegaEmbed("#vis5", spec5);
vegaEmbed("#vis7", spec7);
vegaEmbed("#vis6", spec6);