function plot_load_duration_curve(sorted_demand_met, sorted_total_generation, hours_between_dates) {
   var plotDiv = document.getElementById('plot');
   len = sorted_demand_met.length
   percentiles = []
   hours = []
   demand_met_percentiles = []
   total_generation_percentiles = []
   x = 1
   while(x <= 10000){
      pct = x * 0.0001
      hours.push(pct * hours_between_dates)
      percentiles.push(pct)
      demand_met_percentiles.push(sorted_demand_met[Math.floor(len*pct) - 1])
      total_generation_percentiles.push(sorted_total_generation[Math.floor(len*pct) - 1])
      x++
   }
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
//      showlegend: false,
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 2,
               color:'black'},
   };
   total_generation_trace = {
      name:'Total Generation Load Duration Curve',
      x:hours,
      y:total_generation_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
//      showlegend: false,
      visible: 'legendonly',
      mode:'lines',
      xaxis: 'x1',
      yaxis: 'y1',
      line: {width: 2,
               color:'brown'},
   };
      demand_met_trace2 = {
      name:'Net Demand Load Duration Curve',
      x:hours,
      y:demand_met_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      xaxis: 'x2',
      yaxis: 'y1',
      line: {width: 2,
               color:'black'},
   };
   total_generation_trace2 = {
      name:'Total Generation Load Duration Curve',
      x:hours,
      y:total_generation_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      visible: 'legendonly',
      mode:'lines',
      xaxis: 'x2',
      yaxis: 'y1',
      line: {width: 2,
               color:'brown'},
   };
   var traces = [demand_met_trace, total_generation_trace]
//   var traces = [demand_met_trace, total_generation_trace, demand_met_trace2, total_generation_trace2]

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
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium',
            'size': 15
         },
         'text': '<br> Hours'
      },
      'overlaying': 'y',
      'side': 'top',
      'tickfont': {
         'family': 'Franklin Gothic Book',
         'size': 15
      },
      'gridwidth': 1,
      'gridcolor': '#cccccc',
      'position': 1
   }

   Plotly.newPlot(plotDiv,
      traces,
      {
         'title': {
            text: 'Brookings India Electricity & Carbon Tracker',
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
//         'xaxis2': xaxis2_layout,
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