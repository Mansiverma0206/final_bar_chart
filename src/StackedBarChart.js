import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const FloatBarChart = () => {
  const canvasRef = useRef(null);

  const newFloat = [33, 24, 22, 19, 13,25]

  useEffect(() => {
    // setup 
    const data = {
      labels: ['G7', 'YV', 'C5', 'OO', 'YX'],
      datasets: [
        {
          label: "Red Sales",
          data: [
            { x: 'G7', y: [10, newFloat[0]]},
            { x: 'YV', y: [15, newFloat[1]]},
            { x: 'C5', y: [7, newFloat[2]]},
            { x: 'OO', y: [8, newFloat[3]]},
            { x: 'YX', y: [6, newFloat[4]]},
            { x: 'XX', y: [13, newFloat[5]]},

          ],
          backgroundColor: ['#772a42', '#192c54', '#5476be', '#1986e5', '#4d2a56','#ff9000'],
          borderWidth: 0,
        },
        {
          label: "Black Sales",
          data: [
            { x: 'G7', y: [newFloat[0], 40] },
            { x: 'YV', y: [newFloat[1], 30] },
            { x: 'C5', y: [newFloat[2], 24] },
            { x: 'OO', y: [newFloat[3], 23] },
            { x: 'YX', y: [newFloat[4], 15] },
            { x: 'XX', y: [newFloat[5],35]},

          ],
          backgroundColor: ['#b19aa4', '#7d889e', '#a1a7bf', '#4a9dfb', '#a58ca0','#00ff90'],
          borderWidth: 0,
          dataLabels : [],
        }
      ]
    };
  
    
    const topLabels = {
      id: 'topLabels',
      afterDatasetsDraw(chart) {
        const { ctx, scales: { x, y } } = chart;
        const specialValues = [...newFloat];
        chart.data.datasets.forEach((dataset) => {
          if (dataset.label === "Black Sales" || dataset.label === "Red Sales") {
            dataset.data.forEach((datapoint, index) => {
              const values = datapoint.y;
              const xPos = x.getPixelForValue(datapoint.x);
              const yPosMax = y.getPixelForValue(values[0]); // Bar end position

              // Manually check each value for the index[0] condition
              let isSpecialValue = false;
             if(values[0] > 0 && values[0] < 40 && dataset.label === "Black Sales" ){
              for (let i = 0; i < specialValues.length; i++) {
                if (values[0] === specialValues[i]) {
                  isSpecialValue = true;
                  break;
                }
              }
             }

              // Draw a rounded rectangle at the top of the bar for the specified index[0] values

               if (isSpecialValue && values[0] > 13 && values[0] < 20 ) {
                const width = 25;
                const height = 9;
                const radius = 7;
                const marginTop = -3.6;
                // const marginBottom =70;
                const backgroundColor = '#ff9000';
                ctx.fillStyle = backgroundColor
                ctx.beginPath();
                const adjustedYPosMax = yPosMax - marginTop;
                ctx.roundRect(xPos - width / 2, adjustedYPosMax - height - 5, width, height, radius,marginTop);
                ctx.fill();
                ctx.closePath();
                   ctx.fillStyle = backgroundColor === '#ff9000' ? '#000000' : '#FFFFFF';
              }


              else if (isSpecialValue && values[0] > 25 && values[0] < 40 ) {
                const width = 25;
                const height = 10;
                const radius = 7;
                const marginTop = -3.6;
                // const marginBottom =70;
                ctx.fillStyle = 'green';
                ctx.beginPath();
                const adjustedYPosMax = yPosMax - marginTop;
                ctx.roundRect(xPos - width / 2, adjustedYPosMax - height - 5, width, height, radius,marginTop);
                ctx.fill();
                ctx.closePath();
              }

            
              else if (isSpecialValue && values[0] > 20 && values[0] < 30 ) {
                const width = 25;
                const height = 10;
                const radius = 7;
                const marginTop = -3.6;
                ctx.fillStyle = 'red';
                ctx.beginPath();
                const adjustedYPosMax = yPosMax - marginTop;
                ctx.roundRect(xPos - width / 2, adjustedYPosMax - height - 5, width, height, radius,marginTop);
                ctx.fill();
                ctx.closePath();
              }

              values.forEach((value) => {
                const yPos = y.getPixelForValue(value);
                const isTopOfColumn = value === Math.max(...values);
                ctx.font = 'bold 9px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = isTopOfColumn ? '#000000' : '#ffffff'; // Change color based on position
                ctx.fillText(value, xPos , yPos - 2.9); // Black text color
              });
            });
          }
        });
      }
    };

    const config = {
      type: 'bar',
      data,
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          }
        },
        scales: {
          x: {
            stacked: true,
            title : {
              display : true,
              text : "Unscheduled",
              padding : {
                top: 20
              }
            }
            
          },
          y: {
            beginAtZero: true,
            max: 40, // Explicitly set the maximum value for the y-axis
            ticks: {
              stepSize: 20, // Step size between ticks
              callback: function (value) {
                if (value === 0 || value === 20 || value === 40) {
                  return value; // Display only 0, 20, 40
                }
                return null; // Skip other values
              }
            }
          }
        },
        barThickness: 45,
       
        
      },
      plugins: [topLabels]
    };

    const myChart = new Chart(
      canvasRef.current,
      config
    );

    // Clean up
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <div className="chartCard">
        <div className="chartBox" style={{ width: "400px", height: "auto" }}> {/* Adjust the height here */}
          <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }}></canvas>
        </div>
      </div>
    </div>
  );
};

export default FloatBarChart;
