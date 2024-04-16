import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-nutrients-chart',
  templateUrl: './nutrients-chart.component.html',
  styleUrl: './nutrients-chart.component.css'
})
export class NutrientsChartComponent implements OnInit,OnChanges {
@Input() pieChartData!: any[]
  pieChart!: Highcharts.Chart;

ngOnInit(): void {
    this.initializeChart();
}

ngOnChanges(changes: SimpleChanges): void {
    this.updateChart()
}
  initializeChart() {
    
    this.pieChart = Highcharts.chart('pieChart', {
      chart: {
        type: 'pie',
        plotShadow: false,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          innerSize: '0%',
          borderWidth: 0,
          borderColor: '',
          slicedOffset: 0,
          borderRadius: 0,
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f}%',
            distance: -30, 
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          tooltip: {
            headerFormat: '<div style="background-color:red;"><span style="font-size: 14px; font-weight: bold;color:#4663ac;">{point.key}</span></div><br/>',
           pointFormat: '<span style="font-weight: bold">Amount:</span> <span style="font-weight: bold;color:red">{point.y} g</span><br/>',
          }
        },
      },
      legend: {
        enabled: false,
      },
      title: {
        
      },
      series: [
      {
        type: 'pie',
        data: this.pieChartData
      },
    ],
    })
  }

  updateChart(){
    this.pieChart.update({
      series: [
        {
          type: 'pie',
          data: this.pieChartData
        }
      ]
    })
  }
}
