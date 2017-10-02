import {Component, OnInit} from '@angular/core';
import {AccountTransactionService} from '../../../sf-entities/account-transaction/account-transaction.service';
import {LoggerService} from '../../logger/logger.service';
import {Principal} from '../../auth/principal.service';
import {FinanceAccountService} from '../../../sf-entities/finance-account/finance-account.service';
import {ResponseWrapper} from '../../model/response-wrapper.model';
import {FinanceAccount} from '../../../sf-entities/finance-account/finance-account.model';
import {JhiAlertService} from 'ng-jhipster';
import {AccountTransaction} from '../../../sf-entities/account-transaction/account-transaction.model';
import {TranChartData} from '../tran-chart-data';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'jhi-line-chart',
    templateUrl: './line-chart.component.html',
    styles: []
})
export class LineChartComponent implements OnInit {

    currentUser: any;
    accounts: FinanceAccount[];
    account: FinanceAccount;
    chartData: TranChartData;

    // lineChart
    lineChartData: Array<any> = [
        {data: [], label: 'EXPENSES'},
        {data: [], label: 'INCOMES'}
    ];
    /*= [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, '90'], label: 'Series B'}
    ];*/
    lineChartLabels: Array<any> = [];
    /*= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];*/
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
    lineChartLegend = true;
    lineChartType = 'line';
    barChartType = 'bar';


    /*scales: {
        yAxes: [{
            ticks: {
                // Include a dollar sign in the ticks
                callback: (value: any, index: any, values: any) => {
                    this.formatTick(value, index, values);
                }
            }
        }]
    }*/

    constructor(
        private tranService: AccountTransactionService,
        private accountService: FinanceAccountService,
        private logger: LoggerService,
        private principal: Principal,
        private alertService: JhiAlertService
    ) {
    }

    private load() {
        this.accountService.query()
            .subscribe((res: ResponseWrapper) => {
                this.accounts = res.json;
                this.account = this.accounts.length > 0 ? this.accounts[0] : null;
                this.loadTransaction(this.account)
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private loadTransaction(account: FinanceAccount) {
        this.accountService.findTransactions(account.id)
            .subscribe((transactions: AccountTransaction[]) => {
                this.account.accountTransactions = transactions;
                this.refreshChart(transactions);
            });

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentUser = account;
        });
        this.load();
    }

    refreshChart(transactions: AccountTransaction[]) {
        const currentYear = new Date().getFullYear();
        this.chartData = new TranChartData(transactions);
        this.lineChartLabels = this.chartData.getChartLabels(currentYear);
        this.lineChartData = this.chartData.getChartData(currentYear);
    }

    formatTick(value: any, index: any, values: any): any {
        this.logger.info('*****Format Tick*****');
        return new DecimalPipe('USD').transform(value, '2.2-2');;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
