url = "https://gist.githubusercontent.com/seankross/a412dfbd88b3db70b74b/raw/5f23f993cd87c283ce766e7ac6b329ee7cc2e1d1/mtcars.csv";
d3.csv(url).then(scatterPlot);
var ctx = document.getElementById('scatter').getContext('2d');

var dataset = [];

function scatterPlot(data) {
  // console.log(data);
  // TODO: Make a data parser function to format data. Want to abstract it away.
  data.forEach((d) => {
    d.mpg = +d.mpg;
    d.disp = +d.disp;
    dataset.push({
      x: d.mpg,
      y: d.disp
    })
  });
  scatterChart()
}

function scatterChart() {
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Scatter Dataset',
        data: dataset,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom'
        }]
      }
    }
  })
}


	var color = Chart.helpers.color;
	var scatterChartData = {
		datasets: [{
			label: 'My First dataset',
			xAxisID: 'x-axis-1',
			yAxisID: 'y-axis-1',
			borderColor: window.chartColors.red,
			backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
			data: [
        {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			},
      {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}]
		}, {
			label: 'My Second dataset',
			xAxisID: 'x-axis-1',
			yAxisID: 'y-axis-2',
			borderColor: window.chartColors.blue,
			backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
			data: [{
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
			}]
		}]
	};

	window.onload = function() {
		var ctx = document.getElementById('canvas').getContexvb; bvbt('2d');
		window.myScatter = Chart.Scatter(ctx,  {
			data: scatterChartData,
			options: {
				responsive: true,
				hoverMode: 'nearest',
				intersect: true,
				title: {
					display: true,
					text: 'Chart.js Scatter Chart - Multi Axis'
				},
				scales: {
					xAxes: [{
						position: 'bottom',
						gridLines: {
							zeroLineColor: 'rgba(0,0,0,1)'
						}
					}],
					yAxes: [{
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'left',
						id: 'y-axis-1',
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'right',
						reverse: true,
						id: 'y-axis-2',

						// grid line settings
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
						},
					}],
				}
			}
		});
	};

	document.getElementById('randomizeData').addEventListener('click', function() {
		scatterChartData.datasets.forEach(function(dataset) {
			dataset.data = dataset.data.map(function() {
				return {
					x: randomScalingFactor(),
					y: randomScalingFactor()
				};
			});
		});
		window.myScatter.update();
	});
