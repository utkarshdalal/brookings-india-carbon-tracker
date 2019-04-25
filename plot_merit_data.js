function plot_data(timestamps, thermal, gas, hydro, renewable, nuclear, co2, co2_per_mwh, total_generation, net_demand, demand_met, peak_timestamps, peak_values, trough_timestamps, trough_values, morning_peak_timestamps, morning_peak_values, evening_peak_timestamps, evening_peak_values) {
   var plotDiv = document.getElementById('plot');
   thermal_trace = {
      name:'Thermal Generation',
      x:timestamps,
      y:thermal,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      yaxis: 'y1',
      line: {width:0.5,
               color:'black'},
      stackgroup:'one'
   };
   hydro_trace = {
      name:'Hydro Generation',
      x:timestamps,
      y:hydro,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      yaxis: 'y1',
      line: {width:0.5,
               color:'cyan'},
      stackgroup:'one'
   };
   gas_trace = {
      name:'Gas Generation',
      x:timestamps,
      y:gas,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      yaxis: 'y1',
      line: {width:0.5,
               color:'blue'},
      stackgroup:'one'
   };
   nuclear_trace = {
      name:'Nuclear Generation',
      x:timestamps,
      y:nuclear,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      yaxis: 'y1',
      line: {width:0.5,
               color:'red'},
      stackgroup:'one'
   };
   renewable_trace = {
      name:'Renewable Generation',
      x:timestamps,
      y:renewable,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      yaxis: 'y1',
      line: {width:0.5,
               color:'yellow'},
      stackgroup:'one'
   };
   co2_trace = {
      name:'Tons of CO<sub>2</sub>',
      x:timestamps,
      y:co2,
      yaxis: 'y3',
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      type:'scatter',
      line: {width:2,
            color:'limegreen'},
   };
   co2_per_mwh_trace = {
      name:'gCO<sub>2</sub>/kWh',
      x:timestamps,
      y:co2_per_mwh,
      yaxis: 'y2',
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      type:'scatter',
      line: {width:2,
            color:'magenta'},
   };
   total_trace = {
      name:'Total Generation NLDC Grid Level',
      x:timestamps,
      y:total_generation,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      type:'scatter',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width: 1, color:'gray'}
   };
   net_demand_trace = {
      name:'Net Demand',
      x:timestamps,
      y:net_demand,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      type:'scatter',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width: 1, color:'purple'}
   };
   demand_met_trace = {
      name:'Demand Met',
      x:timestamps,
      y:demand_met,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      type:'scatter',
      yaxis: 'y1',
      line: {width: 1, color:'brown'}
   };
   peak_trace = {
      name:'Daily Highs',
      x:peak_timestamps,
      y:peak_values,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines+markers',
      visible:'legendonly',
      type:'scatter',
      yaxis: 'y1',
      line: {width: 1, color:'chartreuse', opacity: 1}
   };
   trough_trace = {
      name:'Daily Lows',
      x:trough_timestamps,
      y:trough_values,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines+markers',
      visible:'legendonly',
      type:'scatter',
      yaxis: 'y1',
      line: {width: 1, color:'tomato', opacity: 1}
   };
   morning_peak_trace = {
      name:'Morning Peaks',
      x:morning_peak_timestamps,
      y:morning_peak_values,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines+markers',
      visible:'legendonly',
      type:'scatter',
      yaxis: 'y1',
      line: {width: 1, color:'darkblue'}
   };
   evening_peak_trace = {
      name:'Evening Peaks',
      x:evening_peak_timestamps,
      y:evening_peak_values,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines+markers',
      visible:'legendonly',
      type:'scatter',
      yaxis: 'y1',
      line: {width: 1, color:'orange'}
   };
   var traces = [co2_per_mwh_trace, co2_trace, peak_trace, trough_trace, morning_peak_trace, evening_peak_trace, thermal_trace, hydro_trace, gas_trace, nuclear_trace, renewable_trace, demand_met_trace, total_trace, net_demand_trace]

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
      'domain': [0.54, 1], 
      'overlaying': 'y',
      'gridwidth': 1,
      'gridcolor': '#cccccc'
   }
   yaxis2_layout = {
      'side': 'left', 
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium',
            'size': 15,
            'color': 'magenta'
         },
         'text': 'gCO<sub>2</sub>/kWh'
      },
      'tickfont': {
         'family': 'Franklin Gothic Book',
         'size': 15,
         'color': 'magenta'
      }, 
      'showgrid': false, 
      'domain': [0, 0.46],
      'gridwidth': 1,
      'gridcolor': '#cccccc'
   }
   yaxis3_layout = {
      'overlaying': 'y2', 
      'side': 'right', 
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium',
            'size': 15,
            'color': 'limegreen'
         },
         'text': 'Tons of CO<sub>2</sub>'
      },
      'tickfont': {
         'family': 'Franklin Gothic Book',
         'size': 15,
         'color': 'limegreen'
      }, 
      'showgrid': false, 
      'domain': [0, 0.46],
      'gridwidth': 1,
      'gridcolor': '#cccccc'
   }
   xaxis1_layout = {
      'domain': [0, 0.9], 
      'anchor': 'y2', 
      'hoverformat': "%a %B %d, %Y, %H:%M", 
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium', 
            'size': 15
         }, 
         'text': 'Time'
      },
      'tickfont': {
         'family': 'Franklin Gothic Book',
         'size': 15
      },
      'gridwidth': 1,
      'gridcolor': '#cccccc'
   }

   Plotly.newPlot(plotDiv, 
      traces, 
      {
         'title': {
            text: 'All-India Electricity Generation', 
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
         'yaxis': yaxis1_layout, 
         'yaxis2': yaxis2_layout, 
         'yaxis3': yaxis3_layout,
         'legend': {
            font: {
               family: 'Franklin Gothic Book',
               size: 15
            },
         }
      });
   document.getElementById('loading').style.display = 'none'
}