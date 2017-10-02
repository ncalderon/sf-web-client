import {Component, OnInit} from '@angular/core';
import {AccountTransactionService} from "../../../sf-entities/account-transaction/account-transaction.service";
import {LoggerService} from "../../logger/logger.service";
import {Principal} from "../../auth/principal.service";
import {FinanceAccountService} from "../../../sf-entities/finance-account/finance-account.service";
import {ResponseWrapper} from "../../model/response-wrapper.model";
import {FinanceAccount} from "../../../sf-entities/finance-account/finance-account.model";
import {JhiAlertService} from "ng-jhipster";
import {AccountTransaction} from "../../../sf-entities/account-transaction/account-transaction.model";

@Component({
    selector: 'jhi-line-chart',
    templateUrl: './line-chart.component.html',
    styles: []
})
export class LineChartComponent implements OnInit {

    currentUser: any;
    accounts: FinanceAccount[];
    account: FinanceAccount;


    constructor(
        private tranService: AccountTransactionService,
        private accountService: FinanceAccountService,
        private logger: LoggerService,
        private principal: Principal,
        private alertService: JhiAlertService
    ) {
    }

    private load(){
        this.accountService.query()
            .subscribe((res: ResponseWrapper) => {
                this.accounts = res.json;
                this.account = this.accounts.length > 0? this.accounts[0]: null;
                this.loadTransaction(this.account)
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private loadTransaction(account: FinanceAccount) {
        this.accountService.findTransactions(account.id)
            .subscribe((transactions: AccountTransaction[]) => {
                this.account.accountTransactions = transactions;
            });

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentUser = account;
        });
        this.load();
    }

    // lineChart
    public lineChartData: Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    public randomize(): void {
        let _lineChartData: Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {
                data: new Array(this.lineChartData[i].data.length),
                label: this.lineChartData[i].label
            };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
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
