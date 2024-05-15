import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

const FloatBarChart = () => {
  useEffect(() => {
    // setup 
    const data = {
      labels: ['G7', 'YV', 'C5', 'OO', 'YX'],
      datasets: [
        {
          label: 'Red Sales',
          data: [
            { x: 'G7', y: [10, 33,]},
            { x: 'YV', y: [15, 24,]},
            { x: 'C5', y: [7, 22,] },
            { x: 'OO', y: [8, 19]},
            { x: 'YX', y: [6, 13]}
          ],
          backgroundColor:['#772a42' ,
          '#192c54','#5476be','#1986e5', '#4d2a56'],
          dataLabels: [10, 15, 7, 8, 6],
          dataLabels2: [33, 24, 22, 19, 13],
          borderWidth: 0
        },
        {
          label: 'Black Sales',
          data: [
            { x: 'G7', y: [33, 40]},
            { x: 'YV', y: [24, 30] },
            { x: 'C5', y: [22, 24]},
            { x: 'OO', y: [19, 23]},
            { x: 'YX', y: [13, 15] }
          ],
          backgroundColor:['#b19aa4' ,'#7d889e','#a1a7bf','#4a9dfb', '#a58ca0'],
          dataLabels: [33, 24, 22, 19, 13],
          dataLabels2: [10, 15, 7, 8, 6],
          borderWidth: 0
        }
      ]
    };

    const topLabels = {
      id: 'topLabels',
      afterDatasetsDraw(chart) {
        const { ctx, scales: { x, y } } = chart;
        chart.data.datasets.forEach((dataset, datasetIndex) => {
          dataset.data.forEach((datapoint, index) => {
            const values = datapoint.y; // Array of values
            ctx.font = 'bold 15px sans-serif';
           
            ctx.fillStyle = dataset.backgroundColor;
            ctx.textAlign = 'center';
            values.forEach((value, i) => {
              const xPos = x.getPixelForValue(datapoint.x);
              const yPos = y.getPixelForValue(value);
              ctx.fillText(value, xPos, yPos - 5);
            });
          });
        });
      }
    };
    
    
    // config 
    const config = {
      type: 'bar',
      data,
      options: {
        scales: {
          x: {
            stacked: true
          },
          y: {
            // stacked: true,
            beginAtZero: true,
            grace: 4,
            suggestedMin:0,
            suggestedMax:40,
            ticks:{
               stepSize:20,
            }
          }
        }
      },
      plugins: [ topLabels],
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    // Clean up
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <div className="chartMenu">
        <p>WWW.CHARTJS3.COM (Chart JS <span id="chartVersion"></span>)</p>
      </div>
      <div className="chartCard">
        <div className="chartBox">
          <canvas id="myChart" width={100} height={50}></canvas>
        </div>
      </div>
    </div>
  );
};

export default FloatBarChart;
