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
        scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: (value: any, index: any, values: any) => {
                        return this.formatTick(value, index, values);
                    }
                }
            }]
        }
    };
    chartLegend = true;
    chartType = 'line';

    constructor() {

    }

    ngOnInit() {

    }

    formatTick(value: any, index: any, values: any): any {
        return new DecimalPipe('USD').transform(value, '2.2-2');;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

}
