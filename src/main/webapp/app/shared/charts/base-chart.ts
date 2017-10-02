import {FinanceAccount} from '../../sf-entities/finance-account/finance-account.model';
import {TranChartData} from './tran-chart-data';
import {DecimalPipe} from '@angular/common';

export class BaseChart {
    currentUser: any;
    accounts: FinanceAccount[];
    account: FinanceAccount;
    tranChartData: TranChartData;

    // chart
    chartData: Array<any> = [
        {data: [], label: 'EXPENSES'},
        {data: [], label: 'INCOMES'}
    ];

    chartLabels: Array<any> = [];

    lineChartOptions: any = {
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

    constructor() {
    }

    formatTick(value: any, index: any, values: any): any {
        this.logger.info('*****Format Tick*****');
        return new DecimalPipe('USD').transform(value, '2.2-2');;
    }
}
