export const planData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	datasets: [
		{
			label: ['Active Subscribers in Selected Plan'],
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
			data: [100, 78, 95, 92, 88, 91, 108, 125, 115, 106, 98, 117]
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
				labelString: 'Month'
			}
		}],
		yAxes: [{
			display: true,
			scaleLabel: {
				display: true,
				labelString: 'Total Number of Subscribers'
			},
			ticks: {
				beginAtZero: false,
				callback: function (value) { if (Number.isInteger(value)) { return value; } },
				stepSize: 10,
				max: Math.ceil((Math.max(...planData.datasets[0].data) + 1) / 10) * 10
			}
		}]
	},
	// title: {
	//   display: true,
	//   text: 'Plans',
	//   fontSize: 12
	// }
}
