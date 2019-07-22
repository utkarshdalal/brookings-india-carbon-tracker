function plot_load_duration_curve(sorted_demand_met) {
   var plotDiv = document.getElementById('plot');
   len = sorted_demand_met.length
   percentiles = []
   demand_met_percentiles = []
   x = 1
   while(x <= 10000){
      pct = x * 0.0001
      percentiles.push(pct)
      demand_met_percentiles.push(sorted_demand_met[Math.floor(len*pct) - 1])
      x++
   }
   ldc_trace = {
      name:'Load Duration Curve',
      x:percentiles,
      y:demand_met_percentiles,
      hoverinfo:'x+y',
      hoverlabel: {
         font: {
            family: 'Franklin Gothic Book'
         }
      },
      mode:'lines',
      yaxis: 'y1',
      line: {width: 2,
               color:'black'},
   };
   var traces = [ldc_trace]

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
      'tickformat': ',.2%',
      'title': {
         'font': {
            'family': 'Franklin Gothic Medium',
            'size': 15
         },
         'text': 'Percent of Time'
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