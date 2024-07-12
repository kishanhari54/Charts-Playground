import { Component, OnInit } from '@angular/core';
import { ApexPlotOptions } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  annotations: ApexAnnotations;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
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
  selector: 'app-guagechart',
  templateUrl: './guagechart.component.html',
  styleUrls: ['./guagechart.component.css'],
})
export class GuagechartComponent implements OnInit {
  constructor() {}
  options2 = {
    chart: {
      height: 280,
      type: 'radialBar',
    },
    series: [67],
    colors: ['#20E647'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#333',
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#87D4F9'],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'butt',
    },
    labels: ['Progress'],
  };

  options3 = {
    chart: {
      height: '300',
      type: 'radialBar',
    },
    series: [67],
    colors: ['#20E647'],
    plotOptions: {
      radialBar: {
        startAngle: -45,
        endAngle: 45,
        track: {
          background: '#333',
          startAngle: -45,
          endAngle: 45,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    toolbar: {
      show: true,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#87D4F9'],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'butt',
    },
    labels: ['Progress'],
  };
  public chartOptions: ChartOptions | any = this.options3;

  ngOnInit() {}
}
