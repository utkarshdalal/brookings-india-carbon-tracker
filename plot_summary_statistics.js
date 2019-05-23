function plot_summary_statistics(data){
   var plotDiv = document.getElementById('plot');

   var rowColour1 = "lightblue";
   var rowColour2 = "lightgreen";
   var rowColour3 = "lightpink";
   var rowColour4 = "lightyellow";

   tableCellColours = new Array(7).fill(rowColour1).concat(new Array(12).fill(rowColour2))
                      .concat(new Array(10).fill(rowColour3)).concat(new Array(4).fill(rowColour4))


   var values = [
      ['Total Generation (MWh)',
       'Total Renewable Generation (MWh)',
       'Renewable Generation as % of Total',
       'Total Tons of CO<sub>2</sub> Emitted',
       'Avg Total Generation (MW)',
       'Total Generation Standard Deviation',
       'Avg Renewable Generation (MW)',
       'Avg Daytime (6 am - 6 pm) Renewable Generation (MW)',
       'Avg Daytime (6 am - 6 pm) Renewable Generation as % of Total',
       'Avg Daily Max Generation (MW)',
       'Avg Daily Min Generation (MW)',
       'Avg Daily Swing in Generation (MW)',
       'Date of Max Swing in Generation',
       'Max Swing in Generation (MW)',
       'Days with Peak Generation in the Early Morning (Midnight - 6 am)',
       'Days with Peak Generation in the Morning (6 am - 10 am)',
       'Days with Peak Generation in the Midday (10 am - 2 pm)',
       'Days with Peak Generation in the Late Afternoon (2 pm - 6 pm)',
       'Days with Peak Generation in the Evening (6 pm - Midnight)',
       'Time of Period Max Generation',
       'Period Max Generation (MW)',
       'Renewable Generation as a % of Period Max Generation',
       'Time of Period Min Generation',
       'Period Min Generation (MW)',
       'Renewable Generation as a % of Period Min Generation',
       'Avg Renewable % at Daily Peak',
       'Avg Net Demand at Daily Peak (MW)',
       'Avg Net Demand at Daily Peak if Shifted to Max Renewable Generation Time (MW)',
       'Avg % Reduction in Net Demand from Peak Shifting',
       'Time of Max gCO<sub>2</sub>/kWh',
       'Max gCO<sub>2</sub>/kWh',
       'Time of Min gCO<sub>2</sub>/kWh',
       'Min gCO<sub>2</sub>/kWh'],
      [data.total_generation_mwh.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.total_renewable_generation_mwh.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.total_renewable_percentage.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.total_tons_co2.toLocaleString(undefined, {maximumFractionDigits:0}),
       data.avg_total_generation.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.total_generation_stdev.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_renewable_generation.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_daytime_renewable_generation.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_daytime_renewable_generation_pct.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_peak_generation.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_trough_generation.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_daily_swing.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.max_daily_swing_date,
       data.max_daily_swing.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.num_early_morning_peaks,
       data.num_morning_peaks,
       data.num_midday_peaks,
       data.num_afternoon_peaks,
       data.num_evening_peaks,
       data.peak_time,
       data.peak_mw.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.peak_renewable_percentage.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.trough_time,
       data.trough_mw.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.trough_renewable_percentage.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_peak_renewable_percentage.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_net_demand_at_peak.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_net_demand_at_shifted_peak.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.avg_co2_reduction_from_peak_shifting.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.max_co2_per_kwh_time,
       data.max_co2_per_kwh.toLocaleString(undefined, {maximumFractionDigits:2}),
       data.min_co2_per_kwh_time,
       data.min_co2_per_kwh.toLocaleString(undefined, {maximumFractionDigits:2})]
   ]

   var data = [{
      type: 'table',
      columnwidth: [60, 40],
      header: {
        values: [["<b>Statistics Over Period</b>"], ["<b>Value</b>"]],
        align: "center",
        line: {width: 1, color: 'black'},
        fill: {color: "grey"},
        height: 30,
        font: {family: "Franklin Gothic Book", size: 19, color: "white"}
      },
      cells: {
        values: values,
        align: ["center", "right"],
        line: {color: "black", width: 1},
        fill: {color: [tableCellColours]},
        height: 30,
        font: {family: "Franklin Gothic Book", size: 18, color: ["black"]},
      },
   }]

   var layout = {'title': {
                    text: 'Brookings India Carbon Tracker',
                    font: {
                       family: 'Franklin Gothic Demi',
                       size: 20
                    },
                    x: 0,
                    xref: 'container',
                    xanchor: 'left',
                    pad: {'l': 30}
                 }}

   Plotly.newPlot(plotDiv, data, layout);
   document.getElementById('loading').style.display = 'none'
}