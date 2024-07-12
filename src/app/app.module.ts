import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';

import { AppComponent } from './app.component';
import { NewChartComponent } from './new-chart/new-chart.component';
import { GuagechartComponent } from './guagechart/guagechart.component';
import { C3GuageComponent } from './c3-guage/c3-guage.component';
import { MixedChartsComponent } from './mixed-charts/mixed-charts.component';

@NgModule({
  imports: [BrowserModule, FormsModule, NgApexchartsModule],
  declarations: [
    AppComponent,
    NewChartComponent,
    MixedChartsComponent,
    GuagechartComponent,
    C3GuageComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
