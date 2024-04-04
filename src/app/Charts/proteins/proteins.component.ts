import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-proteins',
  templateUrl: './proteins.component.html',
  styleUrl: './proteins.component.css'
})
export class ProteinsComponent implements OnInit{
  pieChart!: Highcharts.Chart;

  @Input() chartData: { name: string, y: number }[] = [];


ngOnInit(): void {
  this.initializeChart()
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
         pointFormat: '<span style="font-weight: bold">{series.name}:</span> <span style="font-weight: bold;color:red">${point.y}</span><br/>',
        }
      },
    },
    legend: {
      enabled: false,
    },
    title: {
      text: 'Macro Distribution'
    },
    series: [
    {
      type: 'pie',
      data: [
        { name: 'Grocery', y: 200,color:'	#009bd6' },
        { name: 'Transportation', y: 240, color: '#4663ac'},
        { name: 'Rent', y: 1000, color: '#0000FF' },
        { name: 'Electricity Bill', y: 250 ,color:'#007AFF'},
        { name: 'Shopping', y: 500,color:'#00719c' },
      ],
    },
  ],
  })
}
   
}
