import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-c3-guage',
  templateUrl: './c3-guage.component.html',
  styleUrls: ['./c3-guage.component.css'],
})
export class C3GuageComponent implements OnInit {
  constructor() {}
  private updateInterval: any;
  private chart: any;
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

    this.chart.load({
      columns: [['data', newDataPoint.y]],
    });
    this.chart.tooltip.show({});
  }

  customTooltips = function (d, defaultTitleFormat, defaultValueFormat, color) {
    return generateTooltip(this.tooltip, d[0], d[1]);
    //.bind(this,this.tooltip, d[0], d[1])

    // this creates a chart inside the tooltips
    // var content = generateGraph(this.tooltip, d[0], d[1]);
    // we don't return anything - see .html function below
  };
  ngOnInit() {
    const appDiv = document.getElementById('guage');
    this.chart = c3.generate({
      bindto: appDiv,

      data: {
        columns: [['data', 91.4]],
        type: 'gauge',
        onclick: function (d, i) {
          // console.log('onclick', d, i);
          this.chart.tooltip.show = false;
        },
        onmouseover: function (d, i) {
          //  console.log('onmouseover', d, i);
        },
        onmouseout: function (d, i) {
          console.log('onmouseout', d, i);
        },
        onrendered: function (d, i) {
          console.log('on render');
        },
      },
      gauge: {
        //        label: {
        //            format: function(value, ratio) {
        //                return value;
        //            },
        //            show: false // to turn off the min/max labels.
        //        },
        //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        //    max: 100, // 100 is default
        //    units: ' %',
        //    width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          //            unit: 'value', // percentage is default
          //            max: 200, // 100 is default
          values: [30, 60, 90, 100],
        },
      },
      size: {
        height: 180,
      },
      axis:{
        x:{
          tick:{ count : 5}
        }
      },

      tooltip: {
        contents: this.customTooltips,
      },
    });

    this.updateInterval = setInterval(() => {
      this.updateData(); // Call function to update data
    }, 2000);
  }
}

function generateTooltip(tooltip, d, data2) {
  let riskDesc = '';
  let riskDescClass = '';
  if (d.value <= 80) {
    riskDesc = 'Low Risk';
    riskDescClass = 'low';
  } else {
    riskDesc = 'High Risk';
    riskDescClass = 'high';
  }

  return `<div class="tooltip-container ${riskDescClass}"> 
  <div class="risk-score"> 
  <section class="score-value"> Risk Score  ${d.value}</section>
  <section class="score-change"> 1.5% </section>
  </div>
  <div class="risk-level-description"> 
  <section class="score-risk ${riskDescClass}"> ${riskDesc} </section>
  </div>
   </div>`;
}

function generateGraph(tooltip, data1, data2) {
  // if the data is same as before don't regenrate the graph - this avoids flicker
  if (
    tooltip.data1 &&
    tooltip.data1.name === data1.name &&
    tooltip.data1.value === data1.value &&
    tooltip.data2.name === data2.name &&
    tooltip.data2.value === data2.value
  )
    return;

  tooltip.data1 = data1;
  tooltip.data2 = data2;

  // remove the existing chart
  if (tooltip.chart) {
    tooltip.chart = tooltip.chart.destroy();
    tooltip.selectAll('*').remove();
  }

  // create new chart
  tooltip.chart = c3.generate({
    bindto: tooltip,
    padding: {
      right: 15,
    },
    size: {
      width: 200,
      height: 200,
    },
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250, 160],
        ['data2', 50, 20, 10, 40, 15, 25, 34],
      ],
    },
    tooltip: {
      show: false,
    },
  });

  // creating a chart on an element sets its position attribute to relative
  // reset it to absolute (the tooltip was absolute originally) for proper positioning
  tooltip.style('position', 'absolute');
  tooltip.style('background-color', 'white');
}
