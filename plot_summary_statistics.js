function plot_summary_statistics(data){
   var plotDiv = document.getElementById('plot');


   var values = [
      ['Total Generation (MWh)',
       'Total Renewable Generation (MWh)',
       'Renewable Generation as % of Total',
       'Total Tons of CO<sub>2</sub> Emitted',
       'Avg Total Generation (MW)',
       'Total Generation Standard Deviation',
       'Avg Renewable Generation (MW)',
       'Avg Daytime (8 am - 6 pm) Renewable Generation (MW)',
       'Avg Daytime (8 am - 6 pm) Renewable Generation as % of Total',
       'Avg Daily Max Generation (MW)',
       'Avg Daily Min Generation (MW)',
       'Days with Peak Generation in the Morning',
       'Days with Peak Generation in the Evening',
       'Time of Max Generation',
       'Max Generation (MW)',
       'Renewable Generation as a % of Max Generation',
       'Time of Min Generation',
       'Min Generation (MW)',
       'Renewable Generation as a % of Min Generation',
       'Avg Renewable % at Daily Peak',
       'Time of Max gCO<sub>2</sub>/kWh',
       'Max gCO<sub>2</sub>/kWh',
       'Time of Min gCO<sub>2</sub>/kWh',
       'Min gCO<sub>2</sub>/kWh'],
      [data.total_generation_mwh.toFixed(3),
       data.total_renewable_generation_mwh.toFixed(3),
       data.total_renewable_percentage.toFixed(3),
       data.total_tons_co2.toFixed(3),
       data.avg_total_generation.toFixed(3),
       data.total_generation_stdev.toFixed(3),
       data.avg_renewable_generation.toFixed(3),
       data.avg_daytime_renewable_generation.toFixed(3),
       data.avg_daytime_renewable_generation_pct.toFixed(3),
       data.avg_peak_generation.toFixed(3),
       data.avg_trough_generation.toFixed(3),
       data.num_morning_peaks,
       data.num_evening_peaks,
       data.peak_time,
       data.peak_mw.toFixed(3),
       data.peak_renewable_percentage.toFixed(3),
       data.trough_time,
       data.trough_mw.toFixed(3),
       data.trough_renewable_percentage.toFixed(3),
       data.avg_peak_renewable_percentage.toFixed(3),
       data.max_co2_per_kwh_time,
       data.max_co2_per_kwh.toFixed(3),
       data.min_co2_per_kwh_time,
       data.min_co2_per_kwh.toFixed(3)]
       ]

   var data = [{
      type: 'table',
      header: {
        values: [["<b>Statistics Over Period</b>"]],
        align: "center",
        line: {width: 1, color: 'black'},
        fill: {color: "grey"},
        font: {family: "Franklin Gothic Book", size: 12, color: "white"}
      },
      cells: {
        values: values,
        align: ["center", "right"],
        line: {color: "black", width: 1},
        font: {family: "Franklin Gothic Book", size: 11, color: ["black"]}
      }
   }]

   Plotly.newPlot(plotDiv, data);
   document.getElementById('loading').style.display = 'none'
}