import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApexOptions } from 'apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  annotations: ApexAnnotations;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  markers: ApexMarkers;
  legend: ApexLegend | any;
  fill: ApexFill;
};

@Component({
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.css'],
})
export class NewChartComponent implements OnInit {
  @ViewChild('customAnnotation', { static: true }) customAnnotation: ElementRef;

  public chartOptions: ChartOptions | any = {
    series: [
      {
        name: 'Series 1',
        data: [],
      },
    ],
    annotations: {
      points: [],
    },
    toolbar: {
      grouped: false,
    },
    chart: {
      type: 'line',
      height: '100%',
      width: '100%',
      animations: {
        enabled: false,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000, // Adjust animation speed as needed
        },
      },
      toolbar: {
        show: true, // Optional: Hide toolbar if not needed
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        //format: 'dd MMM HH:mm:ss', // Adjust date format as needed
        format: 'HH:mm:ss', // Adjust date format as needed
      },
    },
    markers: {
      size: 0, // Optional: Hide markers if not needed
    },
  };

  private updateInterval: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Simulate real-time data update
    this.updateInterval = setInterval(() => {
      this.updateData(); // Call function to update data
    }, 5000); // Update interval in milliseconds (adjust as needed)
  }

  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private updateData(): void {
    // Simulate new data point addition (replace with actual data retrieval)
    const newDataPoint = {
      x: new Date().getTime(),
      y: Math.floor(Math.random() * 100) + 1, // Generate random y-value (replace with actual data)
    };

    // Update series data
    const updatedSeries = [...this.chartOptions.series];
    updatedSeries[0].data.push(newDataPoint);

    // Limit number of data points (optional: adjust as needed)
    const maxDataPoints = 20; // Limit to 20 data points
    if (updatedSeries[0].data.length > maxDataPoints) {
      updatedSeries[0].data.shift(); // Remove oldest data point
    }

    // Update chartOptions with new data
    this.chartOptions = {
      ...this.chartOptions,
      series: updatedSeries,
      //annotations: annotations,
    };
    this.handleAnnotations(updatedSeries, newDataPoint);
  }

  private handleAnnotations(updatedSeries, newDataPoint) {
    if (updatedSeries[0].data.length % 11 == 0) {
      this.addPotentialFailureAnnotation(newDataPoint);
    }
    if (updatedSeries[0].data.length % 2 == 0) {
      this.addAnamolyWarningAnnotation(newDataPoint);
    }
    /*if (updatedSeries[0].data.length % 2 == 0) {
      this.addPointAnnotation(newDataPoint);
    }*/
  }

  private addPotentialFailureAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];

    let annotations = this.chartOptions.annotations;
    // if (updatedSeries[0].data.length % 5 == 0) {
    annotations = {
      points: annotations.points,
      xaxis: [
        ...annotations.xaxis,
        {
          // in a datetime series, the x value should be a timestamp, just like it is generated below
          x: newDataPoint.x,
          strokeDashArray: 2,
          fillColor: '#c2c2c2',
          borderColor: 'red',
          width: '15px',
          strokeWidth: 4,
          //offsetY:100,
          label: {
            offsetY: 10,
            offsetX: 10,
            //borderColor: '#775DD0',
            borderColor: 'red',
            borderWidth: 3,
            borderRadius: 2,
            textAnchor: 'middle',

            style: {
              color: 'black',
              background: 'white',
              fontSize: '12px',
              fontWeight: 400,
              cssClass: 'apex-annotation-css',
            },
            orientation: 'horizontal',
            text: [
              new Date(newDataPoint.x).toLocaleDateString('en-US'),
              '🔺  Potential Failure Alert',
              'Risk Score : ' + newDataPoint.y,
              'RUT : 40 hours',
            ],
          },
        },
      ],
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
    // }
  }
  private addAnamolyWarningAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];
    //console.log(this.chartOptions);
    let parentRect = document
      .querySelector('app-new-chart')
      .querySelector('div')
      .getBoundingClientRect();

    var maxDataValue = Math.min(
      Math.abs(Math.max(...this.chartOptions.series[0].data) - newDataPoint.y),
      parentRect.height
    );
    let annotations = this.chartOptions.annotations;
    // if (updatedSeries[0].data.length % 5 == 0) {
    annotations = {
      points: annotations.points,
      xaxis: [
        ...annotations.xaxis,
        {
          // in a datetime series, the x value should be a timestamp, just like it is generated below
          x: newDataPoint.x + 3500,
          strokeDashArray: 2,
          borderColor: '#f5c105',
          width: '15px',
          //offsetY: maxDataValue,
          strokeWidth: 4,
          label: {
            offsetY: 10,
            offsetX: 10,
            //borderColor: '#775DD0',
            borderColor: '#f5c105',
            borderWidth: 3,
            borderRadius: 2,
            textAnchor: 'middle',
            mouseEnter: (event, d: MouseEvent) => {
              //console.log(event);
              this.addCustomTooltip(event, d);
            },
            mouseLeave: () => {
              this.hideCustomTooltip();
            },
            style: {
              color: 'black',
              background: 'white',
              fontSize: '12px',
              fontWeight: 400,
              cssClass: 'apex-annotation-css',
            },
            orientation: 'horizontal',
            text: ['Anamoly Detected'],
            /* text: [
              new Date(newDataPoint.x).toLocaleDateString('en-US'),
              '△  Anomaly Warning',
              'Risk Score : ' + newDataPoint.y,
            ],*/
          },
        },
      ],
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
    // }
  }

  private addPointAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];
    let annotations = this.chartOptions.annotations;
    let points = [
      ...annotations.points,
      {
        x: newDataPoint.x,
        y: newDataPoint.y,
        yAxisIndex: 0,
        seriesIndex: 0,
        mouseEnter: undefined,
        mouseLeave: undefined,
        click: undefined,
        marker: {
          size: 0,
          fillColor: '#fff',
          strokeColor: '#333',
          strokeWidth: 3,
          shape: 'circle',
          radius: 2,
          OffsetX: 0,
          OffsetY: 0,
          cssClass: '',
        },
        label: {
          borderColor: '#c2c2c2',
          borderWidth: 1,
          borderRadius: 2,
          text: 'Error',
          textAnchor: 'middle',
          offsetX: 0,
          offsetY: -15,
          mouseEnter: undefined,
          mouseLeave: undefined,
          click: undefined,
          style: {
            background: '#fff',
            color: '#777',
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: undefined,
            cssClass: 'apexcharts-point-annotation-label',
            padding: {
              left: 5,
              right: 5,
              top: 0,
              bottom: 2,
            },
          },
        },
        image: {
          path: undefined,
          width: 20,
          height: 20,
          offsetX: 0,
          offsetY: 0,
        },
      },
    ];
    annotations = {
      xaxis: annotations.xaxis,
      points: points,
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
  }

  addCustomTooltip(data, event) {
    //console.log(data.pageX);

    const dialogElement = this.renderer.createElement('div');
    this.renderer.setProperty(dialogElement, 'id', 'customDialog');

    this.renderer.addClass(dialogElement, 'customAnnotation');

    this.renderer.setStyle(dialogElement, 'position', 'absolute');

    let translate = `translate(${event.pageX}px, ${event.pageY}px ) `;
    this.renderer.setStyle(dialogElement, 'transform', translate);

    let timeElement = this.renderer.createElement('div');
    this.renderer.setProperty(timeElement, 'innerHTML', 'Some Date');
    let alertText = this.renderer.createElement('div');
    this.renderer.setProperty(
      alertText,
      'innerHTML',
      'Some Alert Text Received'
    );
    let riskScoreElem = this.renderer.createElement('div');
    this.renderer.setProperty(riskScoreElem, 'innerHTML', `Risk Score ${20}`);
    let rutElement = this.renderer.createElement('div');
    this.renderer.setProperty(rutElement, 'innerHTML', `RUT Score ${30}`);

    this.renderer.appendChild(dialogElement, timeElement);
    this.renderer.appendChild(dialogElement, alertText);
    this.renderer.appendChild(dialogElement, riskScoreElem);
    this.renderer.appendChild(dialogElement, rutElement);
    // Append dialog to the chart container
    this.renderer.appendChild(
      document.querySelector('#chartItem'),
      dialogElement
    );
  }
  private hideCustomTooltip() {
    const dialogElement = document.querySelectorAll('#customDialog');
    if (dialogElement.length >= 0) {
      dialogElement.forEach((elem) => {
        elem.remove();
      });
    }
  }
}

// Working with point / line annotations -- 11-07- backup
/*
export class NewChartComponent implements OnInit {
  @ViewChild('customAnnotation', { static: true }) customAnnotation: ElementRef;

  public chartOptions: ChartOptions | any = {
    series: [
      {
        name: 'Series 1',
        data: [],
      },
    ],
    annotations: {
      points: [],
    },
    toolbar: {
      grouped: false,
    },
    chart: {
      type: 'line',
      height: '100%',
      width: '100%',
      animations: {
        enabled: false,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000, // Adjust animation speed as needed
        },
      },
      toolbar: {
        show: true, // Optional: Hide toolbar if not needed
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        //format: 'dd MMM HH:mm:ss', // Adjust date format as needed
        format: 'HH:mm:ss', // Adjust date format as needed
      },
    },
    markers: {
      size: 0, // Optional: Hide markers if not needed
    },
  };

  private updateInterval: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Simulate real-time data update
    this.updateInterval = setInterval(() => {
      this.updateData(); // Call function to update data
    }, 5000); // Update interval in milliseconds (adjust as needed)
  }

  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private updateData(): void {
    // Simulate new data point addition (replace with actual data retrieval)
    const newDataPoint = {
      x: new Date().getTime(),
      y: Math.floor(Math.random() * 100) + 1, // Generate random y-value (replace with actual data)
    };

    // Update series data
    const updatedSeries = [...this.chartOptions.series];
    updatedSeries[0].data.push(newDataPoint);

    // Limit number of data points (optional: adjust as needed)
    const maxDataPoints = 20; // Limit to 20 data points
    if (updatedSeries[0].data.length > maxDataPoints) {
      updatedSeries[0].data.shift(); // Remove oldest data point
    }

    // Update chartOptions with new data
    this.chartOptions = {
      ...this.chartOptions,
      series: updatedSeries,
      //annotations: annotations,
    };

    // Update custom annotation (external HTML)
    //  this.updateCustomAnnotation(newDataPoint);

    if (updatedSeries[0].data.length % 11 == 0) {
      this.addPotentialFailureAnnotation(newDataPoint);
    }
    if (updatedSeries[0].data.length % 5 == 0) {
      this.addAnamolyWarningAnnotation(newDataPoint);
    }
    if (updatedSeries[0].data.length % 2 == 0) {
      this.addPointAnnotation(newDataPoint);
    }
  }

  private addPotentialFailureAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];

    let annotations = this.chartOptions.annotations;
    // if (updatedSeries[0].data.length % 5 == 0) {
    annotations = {
      points: annotations.points,
      xaxis: [
        ...annotations.xaxis,
        {
          // in a datetime series, the x value should be a timestamp, just like it is generated below
          x: newDataPoint.x,
          strokeDashArray: 2,
          fillColor: '#c2c2c2',
          borderColor: 'red',
          width: '15px',
          strokeWidth: 4,
          //offsetY:100,
          label: {
            offsetY: 10,
            offsetX: 10,
            //borderColor: '#775DD0',
            borderColor: 'red',
            borderWidth: 3,
            borderRadius: 2,
            textAnchor: 'middle',

            style: {
              color: 'black',
              background: 'white',
              fontSize: '12px',
              fontWeight: 400,
              cssClass: 'apex-annotation-css',
            },
            orientation: 'horizontal',
            text: [
              new Date(newDataPoint.x).toLocaleDateString('en-US'),
              '🔺  Potential Failure Alert',
              'Risk Score : ' + newDataPoint.y,
              'RUT : 40 hours',
            ],
          },
        },
      ],
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
    // }
  }
  private addAnamolyWarningAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];
    //console.log(this.chartOptions);
    let parentRect = document
      .querySelector('app-new-chart')
      .querySelector('div')
      .getBoundingClientRect();

    var maxDataValue = Math.min(
      Math.abs(Math.max(...this.chartOptions.series[0].data) - newDataPoint.y),
      parentRect.height
    );
    let annotations = this.chartOptions.annotations;
    // if (updatedSeries[0].data.length % 5 == 0) {
    annotations = {
      points: annotations.points,
      xaxis: [
        ...annotations.xaxis,
        {
          // in a datetime series, the x value should be a timestamp, just like it is generated below
          x: newDataPoint.x,
          strokeDashArray: 2,
          borderColor: '#f5c105',
          width: '15px',
          //offsetY: maxDataValue,
          strokeWidth: 4,
          label: {
            offsetY: 10,
            offsetX: 10,
            //borderColor: '#775DD0',
            borderColor: '#f5c105',
            borderWidth: 3,
            borderRadius: 2,
            textAnchor: 'middle',

            style: {
              color: 'black',
              background: 'white',
              fontSize: '12px',
              fontWeight: 400,
              cssClass: 'apex-annotation-css',
            },
            orientation: 'horizontal',
            text: [
              new Date(newDataPoint.x).toLocaleDateString('en-US'),
              '△  Anomaly Warning',
              'Risk Score : ' + newDataPoint.y,
            ],
          },
        },
      ],
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
    // }
  }

  private addPointAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];
    let annotations = this.chartOptions.annotations;
    let points = [
      ...annotations.points,
      {
        x: newDataPoint.x,
        y: newDataPoint.y,
        yAxisIndex: 0,
        seriesIndex: 0,
        mouseEnter: undefined,
        mouseLeave: undefined,
        click: undefined,
        marker: {
          size: 0,
          fillColor: '#fff',
          strokeColor: '#333',
          strokeWidth: 3,
          shape: 'circle',
          radius: 2,
          OffsetX: 0,
          OffsetY: 0,
          cssClass: '',
        },
        label: {
          borderColor: '#c2c2c2',
          borderWidth: 1,
          borderRadius: 2,
          text: 'Error',
          textAnchor: 'middle',
          offsetX: 0,
          offsetY: -15,
          mouseEnter: undefined,
          mouseLeave: undefined,
          click: undefined,
          style: {
            background: '#fff',
            color: '#777',
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: undefined,
            cssClass: 'apexcharts-point-annotation-label',
            padding: {
              left: 5,
              right: 5,
              top: 0,
              bottom: 2,
            },
          },
        },
        image: {
          path: undefined,
          width: 20,
          height: 20,
          offsetX: 0,
          offsetY: 0,
        },
      },
    ];
    annotations = {
      xaxis: annotations.xaxis,
      points: points,
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
  }
  private updateCustomAnnotation(dataPoint: any): void {
    // Create or update custom annotation content
    const { x, y } = dataPoint;
    const customAnnotationEl = this.customAnnotation.nativeElement;

    // Example: Update content based on data point
    customAnnotationEl.innerHTML = `
      <div class="custom-annotation">
        <h3>Data Point Annotation</h3>
        <p>X: ${new Date(x).toLocaleString()}, Y: ${y}</p>
      </div>
    `;

    // Position custom annotation relative to chart using CSS positioning
    const chartElement =
      this.elementRef.nativeElement.querySelector('.apexcharts-canvas');
    if (chartElement) {
      const chartBounds = chartElement.getBoundingClientRect();
      customAnnotationEl.style.left = `${
        chartBounds.left + chartBounds.width / 2
      }px`; // Example: Center horizontally
      customAnnotationEl.style.top = `${
        chartBounds.top + chartBounds.height / 2
      }px`; // Example: Center vertically
    }
  }
}*/

// Working with point / line annotations -- 11-07- backup
/*
export class NewChartComponent implements OnInit {
  @ViewChild('customAnnotation', { static: true }) customAnnotation: ElementRef;

  public chartOptions: ChartOptions | any = {
    series: [
      {
        name: 'Series 1',
        data: [],
      },
    ],
    annotations: {
      points: [],
    },
    chart: {
      type: 'line',
      height: '100%',
      width: '100%',
      animations: {
        enabled: false,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000, // Adjust animation speed as needed
        },
      },
      toolbar: {
        show: false, // Optional: Hide toolbar if not needed
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        //format: 'dd MMM HH:mm:ss', // Adjust date format as needed
        format: 'HH:mm:ss', // Adjust date format as needed
      },
    },
    markers: {
      size: 0, // Optional: Hide markers if not needed
    },
  };

  private updateInterval: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Simulate real-time data update
    this.updateInterval = setInterval(() => {
      this.updateData(); // Call function to update data
    }, 5000); // Update interval in milliseconds (adjust as needed)
  }

  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private updateData(): void {
    // Simulate new data point addition (replace with actual data retrieval)
    const newDataPoint = {
      x: new Date().getTime(),
      y: Math.floor(Math.random() * 100) + 1, // Generate random y-value (replace with actual data)
    };

    // Update series data
    const updatedSeries = [...this.chartOptions.series];
    updatedSeries[0].data.push(newDataPoint);

    // Limit number of data points (optional: adjust as needed)
    const maxDataPoints = 20; // Limit to 20 data points
    if (updatedSeries[0].data.length > maxDataPoints) {
      updatedSeries[0].data.shift(); // Remove oldest data point
    }

    // Update chartOptions with new data
    this.chartOptions = {
      ...this.chartOptions,
      series: updatedSeries,
      //annotations: annotations,
    };

    // Update custom annotation (external HTML)
    //  this.updateCustomAnnotation(newDataPoint);

    if (updatedSeries[0].data.length % 11 == 0) {
      this.addPotentialFailureAnnotation(newDataPoint);
    }
    if (updatedSeries[0].data.length % 5 == 0) {
      this.addAnamolyWarningAnnotation(newDataPoint);
    }
    if (updatedSeries[0].data.length % 2 == 0) {
      this.addPointAnnotation(newDataPoint);
    }
  }

  private addPotentialFailureAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];

    let annotations = this.chartOptions.annotations;
    // if (updatedSeries[0].data.length % 5 == 0) {
    annotations = {
      points: annotations.points,
      xaxis: [
        ...annotations.xaxis,
        {
          // in a datetime series, the x value should be a timestamp, just like it is generated below
          x: newDataPoint.x,
          strokeDashArray: 2,
          fillColor: '#c2c2c2',
          borderColor: 'red',
          width: '15px',
          strokeWidth: 4,
          //offsetY:100,
          label: {
            offsetY: 10,
            offsetX: 10,
            //borderColor: '#775DD0',
            borderColor: 'red',
            borderWidth: 3,
            borderRadius: 2,
            textAnchor: 'middle',

            style: {
              color: 'black',
              background: 'white',
              fontSize: '12px',
              fontWeight: 400,
              cssClass: 'apex-annotation-css',
            },
            orientation: 'horizontal',
            text: [
              new Date(newDataPoint.x).toLocaleDateString('en-US'),
              '🔺  Potential Failure Alert',
              'Risk Score : ' + newDataPoint.y,
              'RUT : 40 hours',
            ],
          },
        },
      ],
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
    // }
  }
  private addAnamolyWarningAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];
    //console.log(this.chartOptions);
    let parentRect = document
      .querySelector('app-new-chart')
      .querySelector('div')
      .getBoundingClientRect();

    var maxDataValue = Math.min(
      Math.abs(Math.max(...this.chartOptions.series[0].data) - newDataPoint.y),
      parentRect.height
    );
    let annotations = this.chartOptions.annotations;
    // if (updatedSeries[0].data.length % 5 == 0) {
    annotations = {
      points: annotations.points,
      xaxis: [
        ...annotations.xaxis,
        {
          // in a datetime series, the x value should be a timestamp, just like it is generated below
          x: newDataPoint.x,
          strokeDashArray: 2,
          borderColor: '#f5c105',
          width: '15px',
          //offsetY: maxDataValue,
          strokeWidth: 4,
          label: {
            offsetY: 10,
            offsetX: 10,
            //borderColor: '#775DD0',
            borderColor: '#f5c105',
            borderWidth: 3,
            borderRadius: 2,
            textAnchor: 'middle',

            style: {
              color: 'black',
              background: 'white',
              fontSize: '12px',
              fontWeight: 400,
              cssClass: 'apex-annotation-css',
            },
            orientation: 'horizontal',
            text: [
              new Date(newDataPoint.x).toLocaleDateString('en-US'),
              '△  Anomaly Warning',
              'Risk Score : ' + newDataPoint.y,
            ],
          },
        },
      ],
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
    // }
  }

  private addPointAnnotation(newDataPoint) {
    const updatedSeries = [...this.chartOptions.series];
    let annotations = this.chartOptions.annotations;
    let points = [
      ...annotations.points,
      {
        x: newDataPoint.x,
        y: newDataPoint.y,
        yAxisIndex: 0,
        seriesIndex: 0,
        mouseEnter: undefined,
        mouseLeave: undefined,
        click: undefined,
        marker: {
          size: 0,
          fillColor: '#fff',
          strokeColor: '#333',
          strokeWidth: 3,
          shape: 'circle',
          radius: 2,
          OffsetX: 0,
          OffsetY: 0,
          cssClass: '',
        },
        label: {
          borderColor: '#c2c2c2',
          borderWidth: 1,
          borderRadius: 2,
          text: 'Error',
          textAnchor: 'middle',
          offsetX: 0,
          offsetY: -15,
          mouseEnter: undefined,
          mouseLeave: undefined,
          click: undefined,
          style: {
            background: '#fff',
            color: '#777',
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: undefined,
            cssClass: 'apexcharts-point-annotation-label',
            padding: {
              left: 5,
              right: 5,
              top: 0,
              bottom: 2,
            },
          },
        },
        image: {
          path: undefined,
          width: 20,
          height: 20,
          offsetX: 0,
          offsetY: 0,
        },
      },
    ];
    annotations = {
      xaxis: annotations.xaxis,
      points: points,
    };
    this.chartOptions = {
      ...this.chartOptions,
      annotations: annotations,
    };
  }
  private updateCustomAnnotation(dataPoint: any): void {
    // Create or update custom annotation content
    const { x, y } = dataPoint;
    const customAnnotationEl = this.customAnnotation.nativeElement;

    // Example: Update content based on data point
    customAnnotationEl.innerHTML = `
      <div class="custom-annotation">
        <h3>Data Point Annotation</h3>
        <p>X: ${new Date(x).toLocaleString()}, Y: ${y}</p>
      </div>
    `;

    // Position custom annotation relative to chart using CSS positioning
    const chartElement =
      this.elementRef.nativeElement.querySelector('.apexcharts-canvas');
    if (chartElement) {
      const chartBounds = chartElement.getBoundingClientRect();
      customAnnotationEl.style.left = `${
        chartBounds.left + chartBounds.width / 2
      }px`; // Example: Center horizontally
      customAnnotationEl.style.top = `${
        chartBounds.top + chartBounds.height / 2
      }px`; // Example: Center vertically
    }
  }
}
*/
