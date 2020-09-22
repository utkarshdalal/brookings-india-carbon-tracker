function plot_load_duration_curve(sorted_demand_met, sorted_total_generation, sorted_thermal_generation, sorted_gas_generation, sorted_nuclear_generation, sorted_hydro_generation, sorted_renewable_generation, hours_between_dates) {
   var plotDiv = document.getElementById('plot');
   len = sorted_demand_met.length
   percentiles = []
   hours = []
   thermal_generation_percentiles = []
   gas_generation_percentiles = []
   nuclear_generation_percentiles = []
   hydro_generation_percentiles = []
   renewable_generation_percentiles = []
   demand_met_percentiles = []
   total_generation_percentiles = []
   distance_from_max_demand = []
   max_demand = sorted_demand_met[0]
   max_demand_array = []
   x = 1
   while(x <= 10000){
      pct = x * 0.0001
      hours.push(pct * hours_between_dates)
      percentiles.push(pct)
      el = Math.floor(len*pct) - 1
      demand_met_percentiles.push(sorted_demand_met[el])
      thermal_generation_percentiles.push(sorted_thermal_generation[el])
      gas_generation_percentiles.push(sorted_gas_generation[el])
      nuclear_generation_percentiles.push(sorted_nuclear_generation[el])
      hydro_generation_percentiles.push(sorted_hydro_generation[el])
      renewable_generation_percentiles.push(sorted_renewable_generation[el])
      total_generation_percentiles.push(sorted_total_generation[el])
      max_demand_array.push(max_demand)
      distance_from_max_demand.push(max_demand - sorted_demand_met[el])
      x++
   }
   distance_from_max_demand_trace = {
      name:'Difference from Period Max Demand',
      x:hours,
      y:max_demand_array,
      hovertemplate: '<br>%{text} MW Below Max Demand',
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      text: distance_from_max_demand,
      legendgroup: 'demand_met',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 1,
               color:'black'},
   };
   demand_met_trace = {
      name:'Demand Met Load Duration Curve',
      x:hours,
      y:demand_met_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      legendgroup: 'demand_met',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 2,
               color:'brown'},
   };
   demand_met_trace2 = {
      name:'Demand Met Load Duration Curve',
      x:percentiles,
      y:demand_met_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      showlegend: false,
      legendgroup: 'demand_met',
      mode:'lines',
      xaxis: 'x2',
      yaxis: 'y1',
      line: {width: 2,
               color:'brown'},
   };
   thermal_generation_trace = {
      name:'Thermal Generation at Demand Met',
      x:hours,
      y:thermal_generation_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      visible: 'legendonly',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 0.5,
               color:'black'},
      stackgroup:'one'
   };
   gas_generation_trace = {
      name:'Gas Generation at Demand Met',
      x:hours,
      y:gas_generation_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      visible: 'legendonly',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 0.5,
               color:'blue'},
      stackgroup:'one'
   };
   nuclear_generation_trace = {
      name:'Nuclear Generation at Demand Met',
      x:hours,
      y:nuclear_generation_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      visible: 'legendonly',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 0.5,
               color:'red'},
      stackgroup:'one'
   };
   hydro_generation_trace = {
      name:'Hydro Generation at Demand Met',
      x:hours,
      y:hydro_generation_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      visible: 'legendonly',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 0.5,
               color:'cyan'},
      stackgroup:'one'
   };
   renewable_generation_trace = {
      name:'Renewable Generation at Demand Met',
      x:hours,
      y:renewable_generation_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      visible: 'legendonly',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 0.5,
               color:'orange'},
      stackgroup:'one'
   };
   var traces = [demand_met_trace, demand_met_trace2, distance_from_max_demand_trace, thermal_generation_trace, gas_generation_trace, nuclear_generation_trace, hydro_generation_trace, renewable_generation_trace]

   yaxis1_layout = {
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium',
            'size': 15,
         },
         'text': 'MW'
      },
      'tickfont': {
         'family': 'Franklin Gothic Book',
         'size': 15
      },
      'gridwidth': 1,
      'gridcolor': '#cccccc'
   }
   xaxis1_layout = {
      'domain': [0, 1],
//      'tickformat': ',.0%',
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium',
            'size': 15
         },
         'text': 'Hours'
      },
      'tickfont': {
         'family': 'Franklin Gothic Book',
         'size': 15
      },
      'gridwidth': 1,
      'gridcolor': '#cccccc'
   }
   xaxis2_layout = {
      'domain': [0, 1],
      'tickformat': ',.2%',
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium',
            'size': 15
         },
         'text': '<br>% of Time'
      },
      'side': 'top',
      'tickfont': {
         'family': 'Franklin Gothic Book',
         'size': 15
      },
      'showgrid': false,
      'overlaying': 'x',
      'gridwidth': 1,
      'gridcolor': '#cccccc',
      'position': 1
   }

   Plotly.newPlot(plotDiv,
      traces,
      {
         'title': {
            text: 'CSEP Electricity & Carbon Tracker',
            font: {
               family: 'Franklin Gothic Demi',
               size: 20
            },
            x: 0,
            xref: 'container',
            xanchor: 'left',
            pad: {'l': 30}
         },
         'xaxis': xaxis1_layout,
         'xaxis2': xaxis2_layout,
         'yaxis': yaxis1_layout,
         'legend': {
            font: {
               family: 'Franklin Gothic Book',
               size: 15
            },
         }
      });
   document.getElementById('loading').style.display = 'none'
}