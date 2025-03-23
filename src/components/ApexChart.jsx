import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: "Series 1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 135, 125]
      }],
      options: {
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart 
          options={this.state.options} 
          series={this.state.series} 
          type="line" 
          height={350} 
        />
      </div>
    );
  }
}

export default ApexChart;