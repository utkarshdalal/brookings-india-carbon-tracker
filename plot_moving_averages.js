function plot_moving_averages(timestamps, thermal, gas, hydro, renewable, nuclear, demand_met, timestamps_ma, thermal_ma, gas_ma, hydro_ma, renewable_ma, nuclear_ma, demand_met_ma){
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
      legendgroup: 'thermal',
      line: {width:0.5,
               color:'gray'},
   };
   thermal_ma_trace = {
      name:'Thermal Generation Moving Average',
      x:timestamps_ma,
      y:thermal_ma,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      yaxis: 'y1',
      legendgroup: 'thermal',
      line: {width:1,
               color:'black'},
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
      legendgroup: 'hydro',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:0.5,
               color:'cyan'},
   };
   hydro_ma_trace = {
      name:'Hydro Generation Moving Average',
      x:timestamps_ma,
      y:hydro_ma,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      legendgroup: 'hydro',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:1,
               color:'darkcyan'},
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
      legendgroup: 'gas',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:0.5,
               color:'blue'},
   };
   gas_ma_trace = {
      name:'Gas Generation Moving Average',
      x:timestamps_ma,
      y:gas_ma,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      legendgroup: 'gas',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:1,
               color:'darkblue'},
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
      legendgroup: 'nuclear',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:0.5,
               color:'red'},
   };
   nuclear_ma_trace = {
      name:'Nuclear Generation Moving Average',
      x:timestamps_ma,
      y:nuclear_ma,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      legendgroup: 'nuclear',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:1,
               color:'darkred'},
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
      legendgroup: 'renewable',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:0.5,
               color:'yellow'},
   };
   renewable_ma_trace = {
      name:'Renewable Generation Moving Average',
      x:timestamps_ma,
      y:renewable_ma,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      legendgroup: 'renewable',
      visible:'legendonly',
      yaxis: 'y1',
      line: {width:1,
               color:'darkkhaki'},
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
      type:'lines',
      legendgroup: 'demand_met',
      yaxis: 'y1',
      line: {width: 0.5, color:'brown'}
   };
   demand_met_ma_trace = {
      name:'Demand Met Moving Average',
      x:timestamps_ma,
      y:demand_met_ma,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      type:'lines',
      legendgroup: 'demand_met',
      yaxis: 'y1',
      line: {width: 1, color:'sandybrown'}
   };

   var traces = [thermal_trace, thermal_ma_trace, hydro_trace, hydro_ma_trace, gas_trace, gas_ma_trace, 
   nuclear_trace, nuclear_ma_trace, renewable_trace, renewable_ma_trace, demand_met_trace, demand_met_ma_trace]

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
      'domain': [0, 0.9], 
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
         'legend': {
            font: {
               family: 'Franklin Gothic Book',
               size: 15
            },
         }
      });
   document.getElementById('loading').style.display = 'none'
}