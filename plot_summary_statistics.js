function plot_summary_statistics(data){
   var plotDiv = document.getElementById('plot');


   var values = [
      ['Total Generation (MWh)',
       'Total Renewable Generation (MWh)',
       'Renewable Generation as % of Total',
       'Total Tons of CO<sub>2</sub> Emitted',
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
      [data.total_generation_mwh,
       data.total_renewable_generation_mwh,
       data.total_renewable_percentage,
       data.total_tons_co2,
       data.num_morning_peaks,
       data.num_evening_peaks,
       data.peak_time,
       data.peak_mw,
       data.peak_renewable_percentage,
       data.trough_time,
       data.trough_mw,
       data.trough_renewable_percentage,
       data.avg_peak_renewable_percentage,
       data.max_co2_per_kwh_time,
       data.max_co2_per_kwh,
       data.min_co2_per_kwh_time,
       data.min_co2_per_kwh]
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
        align: "center",
        line: {color: "black", width: 1},
        font: {family: "Franklin Gothic Book", size: 11, color: ["black"]}
      }
   }]

   Plotly.newPlot(plotDiv, data);
   document.getElementById('loading').style.display = 'none'
}