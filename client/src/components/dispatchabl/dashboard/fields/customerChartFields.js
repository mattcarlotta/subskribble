import { defaults } from 'react-chartjs-2';
defaults.global.defaultFontFamily = "'Poppins Medium', sans-serif";
export const customerData = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
  maintainAspectRatio: false,
  datasets: [
    {
      label: ['Sign Ups'],
      fill: true,
      lineTension: 0.25,
      backgroundColor: 'rgba(3,169,243,0.2)',
      borderColor: 'rgba(3,169,243,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0,
      borderJoinStyle: 'miter',
      borderWidth: 1,
      pointBorderColor: 'rgba(3,169,243,1)',
      pointBackgroundColor: 'rgba(3,169,243,1)',
      pointBorderWidth: 2,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: 'rgba(3,169,243,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 2,
      pointHitRadius: 5,
      data: [1, 6, 3, 1, 5, 1, 7, 8, 1, 0, 1, 1, 1, 4, 9, 6, 1, 1, 3, 0, 0, 2, 3, 2, 5, 3, 7, 4, 0, 0, 1]
    }, {
      label: ['Cancellations'],
      fill: true,
      lineTension: 0.25,
      backgroundColor: 'rgba(255,161,181,0.4)',
      borderColor: 'rgba(255,161,181,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0,
      borderJoinStyle: 'miter',
      borderWidth: 2,
      pointBorderColor: 'rgba(255,161,181,1)',
      pointBackgroundColor: 'rgba(255,161,181,1)',
      pointBorderWidth: 2,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: 'rgba(255,161,181,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 2,
      pointHitRadius: 5,
      data: [0, 0, 1, 0, 2, 0, 0, 2, 0, 1, 1, 1, 2, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0]
    }
  ],
};

/*
{
  label: ['Cancellations'],
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(255,161,181,0.4)',
  borderColor: 'rgba(255,161,181,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderWidth: 2,
  pointBorderColor: 'rgba(255,161,181,1)',
  pointBackgroundColor: 'rgba(255,161,181,1)',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(255,161,181,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 1,
  pointRadius: 3,
  pointHitRadius: 5,
  data: [0, 0, 1, 0, 2, 0, 0, 2, 0, 1, 1, 1, 2, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0]
}

max: Math.max(Math.max(...customerData.datasets[0].data) + 1, Math.max(...customerData.datasets[1].data) + 1)
*/

export const customerOptions = {
  responsive: true,
  // legend: {
  //  position: 'bottom',
  // },
  hover: {
   mode: 'label'
  },
  scales: {
  xAxes: [{
    display: true,
      scaleLabel: {
        display: true,
        labelString: 'Days in Current Month'
      }
    }],
    yAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Number of Customers'
      },
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: Math.max(Math.max(...customerData.datasets[0].data) + 1)
      }
    }]
  },
  // title: {
  //   display: true,
  //   text: 'Customer Sign Ups / Cancellations',
  //   fontSize: 12,
  // }
}
