export const planData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: ['Active Subscriptions in Plan'],
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(183,221,248,0.4)',
      borderColor: 'rgba(183,221,248,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0,
      borderJoinStyle: 'miter',
      borderWidth: 2,
      pointBorderColor: 'rgba(183,221,248,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(183,221,248,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 3,
      pointHitRadius: 5,
      data: [1, 1, 1, 1, 2, 1, 3, 3, 4, 4, 3, 3]
    }
  ],
};

export const planOptions = {
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
        labelString: 'Per Month'
      }
    }],
    yAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Number of Subscriptions'
      },
      ticks: {
        beginAtZero: true,
        callback: function (value) { if (Number.isInteger(value)) { return value; } },
        stepSize: 1,
        max: Math.max(...planData.datasets[0].data) + 1
      }
    }]
  },
  title: {
    display: true,
    text: 'Plans',
    fontSize: 12
  }
}
