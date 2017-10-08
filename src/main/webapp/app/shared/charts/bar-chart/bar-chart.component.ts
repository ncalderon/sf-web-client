import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'jhi-bar-chart',
    templateUrl: './bar-chart.component.html',
    styles: []
})
export class BarChartComponent implements OnInit {

    @Input()
    chartLabels: Array<any> = [];

    @Input()
        // chart
    chartData: Array<any> = [
        {data: [], label: 'EXPENSES'},
        {data: [], label: 'INCOMES'}
    ];

    chartLegend = true
    chartType = 'bar';
    chartOptions: any = {
        title: {
            display: false,
            text: 'Bar Chart'
        },
        /*hover: {
            mode: 'nearest',
            intersect: true
        },*/
        scaleShowVerticalLines: true,
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Value'
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: (value: any, index: any, values: any) => {
                        return this.formatTick(value, index, values);
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: (value: any, data: any) => {
                    return this.formatTooltip(value, data);
                }
            },
            enabled: true,
            mode: 'index',
            intersect: false
        }
    };

    chartColors = [
        /*{
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false
        },
        {
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            fill: false
        }*/
    ];

    constructor() {

    }

    ngOnInit() {
        console.log("****BarChart On Init*****");
        console.log(this.chartData);
    }

    formatTick(value: any, index: any, values: any): any {
        console.log('*****Format Tick*****');
        return new DecimalPipe('USD').transform(value, '2.2-2');
        ;
    }

    formatTooltip(value: any, values: any): any {
        return new DecimalPipe('USD').transform(value.yLabel, '2.2-2');
    }

// events
    chartClicked(e: any): void {
        console.log(e);
    }

    chartHovered(e: any): void {
        console.log(e);
    }

}
