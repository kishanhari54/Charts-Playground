import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations,
  ApexTooltip,
  ApexLegend,
  ApexMarkers,
  ApexFill,
} from 'ng-apexcharts';

import { series } from './data';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    //this.hardCodedDateRangeXAxis();
  }
  ngOnInit() {
    //  this.checkApexcharts();
  }

  normalApexChart() {
    this.chartOptions = {
      series: [
        {
          name: 'image_url',
          data: series.monthDataSeries1.prices,
        },
        {
          name: 'secondary_heading',
          data: series.monthDataSeries2.prices,
        },
      ],
      chart: {
        type: 'line',
      },
      annotations: {
        yaxis: [
          {
            y: 8200,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396',
              },
              text: 'Y Axis Annotation',
            },
          },
        ],
        xaxis: [
          {
            // in a datetime series, the x value should be a timestamp, just like it is generated below
            x: new Date('11/17/2017').getTime(),
            strokeDashArray: 0,
            borderColor: '#775DD0',
            label: {
              borderColor: '#775DD0',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'X Axis Anno Vertical',
            },
          },
          {
            x: new Date('06 Dec 2017').getTime(),
            strokeDashArray: 10,
            borderColor: '#FEB019',
            label: {
              borderColor: '#FEB019',
              style: {
                color: '#fff',
                background: '#FEB019',
              },
              orientation: 'horizontal',
              text: 'X Axis Anno Horizonal',
            },
          },
        ],
        points: [
          {
            x: new Date('14 Nov 2017').getTime(),
            y: 8900,
            mouseEnter: () => {},
            marker: {
              size: 6,
              fillColor: '#fff',
              strokeColor: 'red',
              radius: 2,
            },
            label: {
              text: 'Data feature',
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
              },
            },
          },
        ],
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 3,
      },
      grid: {
        padding: {
          right: 30,
          left: 20,
        },
      },
      title: {
        text: 'Notification anomalies',
        align: 'left',
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: 'datetime',
      },
    };
  }

  hardCodedDateRangeXAxis() {
    // Hardcoded Date Time Range
    this.chartOptions = {
      series: [
        {
          name: 'Series 1',
          data: [
            { x: new Date('2024-01-01'), y: 30 },
            { x: new Date('2024-01-02'), y: 40 },
            // Add more data points as needed
          ],
        },
      ],
      xaxis: {
        type: 'datetime',
        min: new Date('2024-01-01').getTime(),
        max: new Date('2024-01-31').getTime(),
      },
      yaxis: {
        min: 0,
        max: 100,
      },
      chart: {
        type: 'line',
      },
      annotations: {
        points: [
          {
            x: new Date('2024-01-15').getTime(),
            y: 30,
            marker: {
              size: 6,
              fillColor: '#FF4560',
              strokeColor: '#333',
              radius: 2,
            },
            label: {
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
              },
              text: 'Annotation within range',
            },
          },
        ],
        xaxis: [
          {
            // in a datetime series, the x value should be a timestamp, just like it is generated below
            x: new Date('01/05/2024').getTime(),
            strokeDashArray: 0,
            borderColor: '#775DD0',

            label: {
              borderColor: '#775DD0',
              style: {
                background: '#fff',
                color: '#777',
                fontSize: '12px',
                fontWeight: 400,
                fontFamily: undefined,
                cssClass: 'apexcharts-xaxis-annotation-label',
              },
              orientation: 'horizontal',
              text: '<div>',
              textAnchor: 'end',
            },
          },
        ],
      },
    };
  }
  numericChartValues() {
    this.chartOptions = {
      series: [
        {
          name: 'Series 1',
          data: [
            { x: 1, y: 30 },
            { x: 2, y: 40 },
            { x: 3, y: 45 },
            // Add more data points as needed
          ],
        },
      ],
      xaxis: {
        type: 'numeric',
      },
    };
  }

  checkApexcharts() {
    /* let value = 10;
    let iteration = 0;
    let interval = setInterval(() => {
      // Add Anamoly

      if (iteration / 3 == 0) {
        let anam = {
          // in a datetime series, the x value should be a timestamp, just like it is generated below
          x: new Date(new Date().toISOString()).getTime(),
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: 'Anamoly Detected',
          },
        };
        this.chartOptions.annotations.xaxis.push(anam);
        console.log(this.chartOptions.annotations);
      } else {
        let data = {
          timeStamp: new Date(new Date().toISOString()).getTime(),
          value: value,
          iteration,
        };
        let chartData = { x: data.timeStamp, y: data.value };
        // console.log(this.chartOptions.series[0].data);
        //this.chartOptions.series[0].data =
        this.chartOptions.series[0].data.push(chartData);
        // console.log(data);
        value += Math.random() * 20;
      }

      iteration += 1;
      if (iteration >= 10) {
        window.clearInterval(interval);
      }
    }, 5000);*/

    let data = [];
    this.chartOptions = {
      series: [
        {
          name: 'image_url',
          type: 'line',
          data: [
            { x: new Date('13 Nov 2017').getTime(), y: 20 },
            { x: new Date('14 Nov 2017').getTime(), y: 25 },
            //{ x: new Date('15 Nov 2017').getTime(), y: 10 },
            { x: new Date('16 Nov 2017').getTime(), y: 50 },
            { x: new Date('17 Nov 2017').getTime(), y: 80 },
          ],
          //series.monthDataSeries1.prices,
        },
        {
          name: 'image',
          type: 'scatter',
          data: [
            { x: new Date('15 Nov 2017').getTime(), y: 100 },
            { x: new Date('14 Nov 2017').getTime(), y: 100 },
            //{ x: new Date('15 Nov 2017').getTime(), y: 10 },
            { x: new Date('16 Nov 2017').getTime(), y: 100 },
            { x: new Date('17 Nov 2017').getTime(), y: 100 },
          ],
          //series.monthDataSeries1.prices,
        },
        /*  {
          name: 'anamoly',
          type: 'scatter',
          data: [
            [1485907200000, 20],
            [1485993600000, 8],
            [1486080000000, 24],
            [1486166400000, 6],
            [1486252800000, 15],
            [1486339200000, 21],
            [1486425600000, 23],
            [1486512000000, 17],
            [1486598400000, 11],
            [1486684800000, 6],
            [1486771200000, 16],
            [1486857600000, 24],
            [1486944000000, 14],
            [1487030400000, 18],
            [1487116800000, 14],
            [1487203200000, 12],
            [1487289600000, 19],
            [1487376000000, 10],
            [1487462400000, 17],
            [1487548800000, 17],
          ],
        },*/
        /*  {
          name: 'secondary_heading',
          data: series.monthDataSeries2.prices,
        },*/
      ],
      chart: {
        type: 'line',
      },
      /*tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="arrow_box">' +
            '<p> Poda</p> <span>' +
            series[seriesIndex][dataPointIndex] +
            '</span>' +
            '</div>'
          );
        },
      },*/
      annotations: {
        xaxis: [
          {
            // in a datetime series, the x value should be a timestamp, just like it is generated below
            x: new Date('14 Nov 2017').getTime(),
            strokeDashArray: 2,
            //borderColor: '#775DD0',
            label: {
              offsetY: 10,
              offsetX: 10,
              //borderColor: '#775DD0',

              textAnchor: 'start',
              style: {
                color: 'black',
                background: 'white',
                cssClass: 'apex-annotation-css',
              },
              orientation: 'horizontal',
              text: 'X Axis Anno Vertical',
            },
          },
          {
            // in a datetime series, the x value should be a timestamp, just like it is generated below
            x: new Date('14 Nov 2017').getTime(),
            strokeDashArray: 2,
            borderColor: '#775DD0',
            borderWidth: 5,
            label: {
              borderColor: '#775DD0',
              textAnchor: 'start',
              offsetY: 28,
              offsetX: 10,
              style: {
                color: 'black',
                background: 'white',
                cssClass: 'apex-annotation-css',
              },
              orientation: 'horizontal',
              text: 'X Axis AS Vertical',
            },
          },
        ],
        /* xaxis: [
          {
            // in a datetime series, the x value should be a timestamp, just like it is generated below
            x: new Date('11/17/2016').getTime(),
            strokeDashArray: 0,
            borderColor: '#775DD0',
            label: {
              borderColor: '#775DD0',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'X Axis Anno Vertical',
            },
          },
          {
            x: new Date('17 Dec 2017').getTime(),
            strokeDashArray: 10,
            borderColor: '#FEB019',
            label: {
              borderColor: '#FEB019',
              style: {
                color: '#fff',
                background: '#FEB019',
              },
              orientation: 'horizontal',
              text: 'X Axis Anno Horizonal',
            },
          },
        ],*/
        /* points: [
          {
            x: new Date('14 Nov 2017').getTime(),
            y: 120,
            mouseEnter: () => {},

            marker: {
              size: 6,
              fillColor: '#fff',
              strokeColor: 'red',
              radius: 2,
            },
            label: {
              text: 'Data feature',
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
              },
            },
          },
        ],*/
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 20,
      },
      fill: {},
      /* legend: {
        show: true,
        markers: {
          customHTML: [
            function () {
              return '<span>Hi</span>';
            },
            function () {
              return '<span><i class="fab fa-instagram"></i></span>';
            },
          ],
        },
      },*/
      /*  stroke: {
        curve: 'smooth',
        width: 3,
      },*/
      /*   grid: {
        padding: {
          right: 30,
          left: 20,
        },
      },*/
      title: {
        text: 'Notification anomalies',
        align: 'left',
      },
      // labels: series.monthDataSeries1.dates,
      xaxis: {
        type: 'datetime',
        // min: new Date('15 Nov 2017').getTime(),
        //  max: new Date('17 Dec 2017').getTime(),
        // tickPlacement: 'between',
        // tickAmount: 5,
      },
    };

    /* let index = 0;

    let dataValues = series.monthDataSeries1.prices;
    let dateInputs = series.monthDataSeries1.dates;
    let int = setInterval(() => {
      //   let data = this.chartOptions.series[0].data;
      let newData = [
        { x: new Date(dateInputs[index]).getTime(), y: dataValues[index] },
      ];
      data.push(newData);
      //this.chart.updateSeries([
     //   {
    //      name: 'image_url',
     //     data: data,
    //    },
     // ]);
      index += 1;
      if (index == dateInputs.length) {
        clearInterval(int);
      }
    }, 1000);*/
  }
}
