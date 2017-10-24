import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'jhi-line-chart',
    templateUrl: './line-chart.component.html',
    styles: []
})
export class LineChartComponent implements OnInit {
    @Input()
    chartLabels: Array<any> = [];

    @Input()
        // chart
    chartData: Array<any> = [
        {data: [], label: 'EXPENSES'},
        {data: [], label: 'INCOMES'}
    ];

    chartOptions: any = {
        responsive: true,
        title: {
            display: false,
            text: 'Line Chart'
        }
        ,
        hover: {
            mode: 'nearest',
            intersect: true
        },
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
            mode: 'index',
            intersect: false,
            callbacks: {
                label: (value: any, data: any) => {
                    return this.formatTooltip(value, data);
                }
            }
        }
        /*tooltipTemplate: '<%if (label){%><%=label %>: <%}%><%= value + \' %\' %>',
        // String - Template string for multiple tooltips
        multiTooltipTemplate: '<%= value + \' %\' %>'*/
    };
    chartLegend = true;
    chartType = 'line';
    chartColors = [
        /*{
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)'
        },
        {
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)'
        }*/
    ];

    constructor() {

    }

    ngOnInit() {

    }

    formatTick(value: any, index: any, values: any): any {
        return new DecimalPipe('USD').transform(value, '2.2-2');
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
