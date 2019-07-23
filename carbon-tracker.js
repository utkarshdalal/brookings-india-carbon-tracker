var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate()+1);

var timeout = null;

var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isMobile = true;
}

var selectedValueType = isMobile ? "Summary Statistics" : "Corrected Generation Data"

function dateToString(date){
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var year = date.getFullYear();
  return year + '-' + month + '-' + day + ' 00:00:00';
}

var timeRange = new Vue({
  el: '#time_range',
  data: {
     start_time: null,
     end_time: null
  }
});

var minCo2Vue = new Vue({
  el: '#min_co2',
  data: {
     min_co2: null,
     min_co2_time: null
  }
});

var maxCo2Vue = new Vue({
  el: '#max_co2',
  data: {
     max_co2: null,
     max_co2_time: null
  }
});

var totalCo2Vue = new Vue({
  el: '#total_co2',
  data: {
     total_co2: null
  }
});

var timeInput = new Vue({
 el: '#time_input',
 data: {
   selected_date_type: "Week of",
   start_date: today,
   end_date: tomorrow,
   start_time: dateToString(today),
   end_time: dateToString(tomorrow),
   selected_value_type: selectedValueType,
   disabledStartDates: {
     from: today,
     to: new Date(2018, 10, 21)
   },
   disabledEndDates: {
     from: tomorrow,
     to: new Date(2018, 10, 21)
   }
 },
 components: {
   vuejsDatepicker
 },
 computed: {
   dateRange: function() {
      return this.selected_date_type == 'Range';
   }
 },
 // define methods under the `methods` object
 methods: {
   submit: function (event) {
     document.getElementById('loading').style.display = 'block'
     if(this.selected_date_type == 'Week of'){
        first_day_of_week = this.start_date.getDate() - this.start_date.getDay()
        last_day_of_week = first_day_of_week + 7
        toDate = new Date();
        toDate = new Date(toDate.setDate(last_day_of_week));
        fromDate = new Date();
        fromDate = new Date(fromDate.setDate(first_day_of_week));
     }
     else if(this.selected_date_type == 'Month of'){
        toDate = new Date(this.start_date.getFullYear(), this.start_date.getMonth() + 1, 1);
        fromDate = new Date(this.start_date.getFullYear(), this.start_date.getMonth(), 1);
     }
     else{
        toDate = new Date(this.end_date.getFullYear(), this.end_date.getMonth(), this.end_date.getDate());
        fromDate = new Date(this.start_date.getFullYear(), this.start_date.getMonth(), this.start_date.getDate());
     }
     if(this.validate_input(fromDate, toDate)){
        if(this.is_summary_statistics()){
            response_data = {}
            batchGetData(fromDate, toDate, this.selected_value_type).then(response => {
               fields_to_add = ['total_tons_co2', 'total_generation_mwh', 'total_renewable_generation_mwh',
                                'num_early_morning_peaks', 'num_morning_peaks',
                                'num_midday_peaks', 'num_afternoon_peaks', 'num_evening_peaks']
               response_data = JSON.parse(response[0].data)
               for(i=1; i < response.length; i++){
                  block = JSON.parse(response[i].data)
                  keys = Object.keys(block)
                  if(block.max_co2_per_kwh > response_data.max_co2_per_kwh){
                     response_data.max_co2_per_kwh = block.max_co2_per_kwh
                     response_data.max_co2_per_kwh_time = block.max_co2_per_kwh_time
                  }
                  if(block.min_co2_per_kwh < response_data.min_co2_per_kwh){
                     response_data.min_co2_per_kwh = block.min_co2_per_kwh
                     response_data.min_co2_per_kwh_time = block.min_co2_per_kwh_time
                  }
                  if(block.peak_mw > response_data.peak_mw){
                     response_data.peak_mw = block.peak_mw
                     response_data.peak_time = block.peak_time
                  }
                  if(block.trough_mw < response_data.trough_mw){
                     response_data.trough_mw = block.trough_mw
                     response_data.trough_time = block.trough_time
                  }
                  if(block.max_daily_swing > response_data.max_daily_swing){
                     response_data.max_daily_swing = block.max_daily_swing
                     response_data.max_daily_swing_date = block.max_daily_swing_date
                  }
                  if(block.peak_renewable_percentage > response_data.peak_renewable_percentage){
                     response_data.peak_renewable_percentage = block.peak_renewable_percentage
                  }
                  if(block.trough_renewable_percentage < response_data.trough_renewable_percentage){
                     response_data.trough_renewable_percentage = block.trough_renewable_percentage
                  }
                  for(j=0; j < fields_to_add.length; j++){
                     response_data[fields_to_add[j]] += block[fields_to_add[j]]
                  }
                  keys = Object.keys(block)
                  for(j=0; j < keys.length; j++){
                     key = keys[j]
                     if(response_data[key].constructor === Array){
                        response_data[key] = response_data[key].concat(block[key])
                     }
                  }
               }
               response_data['total_renewable_percentage'] = response_data['total_renewable_generation_mwh']/response_data['total_generation_mwh'] * 100
               response_data['avg_peak_renewable_percentage'] = math.mean(response_data['peak_renewable_percentage_list'])
               response_data['avg_total_generation'] = math.mean(response_data['total_generation_list'])
               response_data['total_generation_stdev'] = math.std(response_data['total_generation_list'])
               response_data['avg_renewable_generation'] = math.mean(response_data['renewable_generation_list'])
               response_data['avg_daytime_renewable_generation'] = math.mean(response_data['daytime_renewable_generation_list'])
               response_data['avg_daytime_renewable_generation_pct'] = math.mean(response_data['daytime_renewable_generation_pct_list'])
               response_data['avg_peak_generation'] = math.mean(response_data['peak_value_list'])
               response_data['avg_trough_generation'] = math.mean(response_data['trough_value_list'])
               response_data['avg_daily_swing'] = math.mean(response_data['daily_swing_list'])
               response_data['avg_net_demand_at_peak'] = math.mean(response_data['net_demand_at_peak_list'])
               response_data['avg_net_demand_at_shifted_peak'] = math.mean(response_data['net_demand_at_shifted_peak_list'])
               response_data['avg_co2_reduction_from_peak_shifting'] = (response_data['avg_net_demand_at_peak'] - response_data['avg_net_demand_at_shifted_peak']) / response_data['avg_net_demand_at_peak'] * 100.0
               renewable_time_list = response_data['peak_renewable_time_list'].sort()
               peak_time_list = response_data['peak_value_time_list'].sort()
               response_data['median_renewable_time'] = renewable_time_list[Math.floor(renewable_time_list.length / 2)]
               response_data['median_peak_time'] = peak_time_list[Math.floor(peak_time_list.length / 2)]

               plot_summary_statistics(response_data, dateToString(fromDate).substring(0, 10), dateToString(toDate).substring(0, 10));
               if(timeout != null){
                  clearTimeout(timeout);
                  timeout = null;
               }
            });
        }
        else if(this.is_ldc()){
            response_data = {}
            batchGetData(fromDate, toDate, this.selected_value_type).then(response => {
               response_data = JSON.parse(response[0].data)
               for(i=1; i < response.length; i++){
                  block = JSON.parse(response[i].data)
                  keys = Object.keys(block.timeseries_values)
                  for(j=0; j < keys.length; j++){
                     key = keys[j]
                     response_data.timeseries_values[key] = response_data.timeseries_values[key].concat(block.timeseries_values[key])
                  }
                  keys = Object.keys(block)
                  for(j=0; j < keys.length; j++){
                     key = keys[j]
                     if(response_data[key].constructor === Array){
                        response_data[key] = response_data[key].concat(block[key])
                     }
                  }
               }
               data = response_data
               demand_met = data.timeseries_values.demand_met
               total_generation = data.timeseries_values.total_generation

               beginning_of_from_date = new Date(fromDate.getTime())
               beginning_of_from_date.setHours(0, 0, 0, 0)

               beginning_of_to_date = new Date(toDate.getTime())
               beginning_of_to_date.setHours(0, 0, 0, 0)

               current_time = new Date()

               hours_between_dates = (Math.min(current_time, beginning_of_to_date) - beginning_of_from_date) / (1000 * 60 * 60);

               sorted_demand_met = demand_met.sort().reverse()
               sorted_total_generation = total_generation.sort().reverse()
               plot_load_duration_curve(sorted_demand_met, sorted_total_generation, hours_between_dates)
            });
        }
        else{
            response_data = {}
            batchGetData(fromDate, toDate, this.selected_value_type).then(response => {
               response_data = JSON.parse(response[0].data)
               for(i=1; i < response.length; i++){
                  block = JSON.parse(response[i].data)
                  keys = Object.keys(block.timeseries_values)
                  for(j=0; j < keys.length; j++){
                     key = keys[j]
                     response_data.timeseries_values[key] = response_data.timeseries_values[key].concat(block.timeseries_values[key])
                  }
                  keys = Object.keys(block)
                  for(j=0; j < keys.length; j++){
                     key = keys[j]
                     if(response_data[key].constructor === Array){
                        response_data[key] = response_data[key].concat(block[key])
                     }
                  }
               }
               data = response_data
               timestamps = data.timeseries_values.timestamps
               thermal = data.timeseries_values.thermal_generation
               gas = data.timeseries_values.gas_generation
               hydro = data.timeseries_values.hydro_generation
               renewable = data.timeseries_values.renewable_generation
               nuclear = data.timeseries_values.nuclear_generation
               demand_met = data.timeseries_values.demand_met

               if(this.is_moving_averages()){
                  timestamps_ma = data.timeseries_values.ma_timestamps
                  thermal_ma = data.timeseries_values.thermal_generation_ma
                  gas_ma = data.timeseries_values.gas_generation_ma
                  hydro_ma = data.timeseries_values.hydro_generation_ma
                  renewable_ma = data.timeseries_values.renewable_generation_ma
                  nuclear_ma = data.timeseries_values.nuclear_generation_ma
                  demand_met_ma = data.timeseries_values.demand_met_ma
                  plot_moving_averages(timestamps, thermal, gas, hydro, renewable, nuclear, demand_met, timestamps_ma, thermal_ma, gas_ma, hydro_ma, renewable_ma, nuclear_ma, demand_met_ma)
               }
               else{
                  timeRange.start_time = this.start_time
                  timeRange.end_time = this.end_time
                  minCo2Vue.min_co2 = (data.min_co2_per_kwh).toFixed(2)
                  minCo2Vue.min_co2_time = data.min_co2_per_kwh_time
                  maxCo2Vue.max_co2 = (data.max_co2_per_kwh).toFixed(2)
                  maxCo2Vue.max_co2_time = data.max_co2_per_kwh_time
                  totalCo2Vue.total_co2 = (data.total_tons_co2).toFixed(2)
                  total = data.timeseries_values.total_generation
                  net_demand = data.timeseries_values.net_demand
                  co2 = data.timeseries_values.tons_co2
                  co2_per_mwh = data.timeseries_values.g_co2_per_kwh

                  peak_timestamps = data.peak_timestamps
                  peak_values = data.peak_values
                  trough_timestamps = data.trough_timestamps
                  trough_values = data.trough_values
                  morning_peak_timestamps = data.morning_peak_timestamps
                  morning_peak_values = data.morning_peak_values
                  evening_peak_timestamps = data.evening_peak_timestamps
                  evening_peak_values = data.evening_peak_values

                  plot_data(timestamps, thermal, gas, hydro, renewable, nuclear, co2, co2_per_mwh, total, net_demand, demand_met, peak_timestamps, peak_values, trough_timestamps, trough_values, morning_peak_timestamps, morning_peak_values, evening_peak_timestamps, evening_peak_values);
                  if(timeout != null){
                     clearTimeout(timeout);
                     timeout = null;
                  }
               }
            });
        }
        document.getElementById('loading_text').style.display = 'none'
     }
     else{
        alert("Please ensure your start time is before your end time.")
        document.getElementById('loading').style.display = 'none'
     }
   },
   validate_input: function (start_time, end_time) {
     if(start_time < end_time){
        return true
     }
     return false
   },
   is_moving_averages: function() {
     if(this.selected_value_type == 'Daily Moving Averages' || this.selected_value_type == 'Monthly Moving Averages' || this.selected_value_type == 'Weekly Moving Averages'){
        return true;
     }
     return false;
   },
   is_ldc: function() {
     if(this.selected_value_type == 'Load Duration Curves'){
        return true;
     }
     return false;
   },
   is_summary_statistics: function() {
     if(this.selected_value_type == 'Summary Statistics'){
        return true;
     }
     return false;
   }
 },
 mounted () {
  this.submit()
 }
})

async function batchGetData(start_time, end_time, selected_value_type) {
  timeout = setTimeout(function(){ document.getElementById('loading_text').style.display = 'block' }, 1000 * 2 * 60)
  data_type_param = ''
  endpoint = ''
  if(selected_value_type == 'Raw Generation Data' || selected_value_type == 'Corrected Generation Data'){
     data_type_param = selected_value_type == 'Corrected Generation Data' ? '&corrected_values=true' : '&corrected_values=false'
     endpoint = 'get-merit-data'
  }
  else if(selected_value_type == 'Summary Statistics'){
     endpoint = 'get-merit-summary-statistics-batch'
  }
  else if(selected_value_type == 'Load Duration Curves'){
     endpoint = 'get-merit-demand-met'
  }
  else{
     if(selected_value_type == 'Daily Moving Averages'){
        data_type_param = '&ma_type=daily'
     }
     else if(selected_value_type == 'Weekly Moving Averages'){
        data_type_param = '&ma_type=weekly'
     }
     else if(selected_value_type == 'Monthly Moving Averages'){
        data_type_param = '&ma_type=monthly'
     }
     endpoint = 'get-merit-moving-averages'
  }
  promises = []
  batch_start = new Date(start_time)
  batch_end = new Date(start_time.getFullYear(), start_time.getMonth() + 1, 1);
  while(batch_end < end_time){
     promises.push(axios.get('https://32u36xakx6.execute-api.us-east-2.amazonaws.com/v3/' + endpoint + '?start_time=' + dateToString(batch_start) + '&end_time=' + dateToString(batch_end) + data_type_param))
     batch_start = new Date(batch_end)
     batch_end = new Date(batch_end.getFullYear(), batch_end.getMonth() + 1, 1);
  }
  promises.push(axios.get('https://32u36xakx6.execute-api.us-east-2.amazonaws.com/v3/' + endpoint + '?start_time=' + dateToString(batch_start) + '&end_time=' + dateToString(end_time) + data_type_param))
  return_data = {}
  return await Promise.all(promises)
}


async function getData(start_time, end_time, selected_value_type) {
    setTimeout(function(){ document.getElementById('loading_text').style.display = 'block' }, 1000 * 2 * 60)
    endpoint = ''
    if(selected_value_type == 'Summary Statistics'){
        endpoint = 'get-merit-summary-statistics'
    }
    return await axios.get('https://32u36xakx6.execute-api.us-east-2.amazonaws.com/v2/' + endpoint + '?start_time=' + start_time + '&end_time=' + end_time);
}