import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FinanceAccount } from './finance-account.model';
import { FinanceAccountService } from './finance-account.service';
import {AccountTransaction} from "../account-transaction/account-transaction.model";

@Component({
    selector: 'jhi-finance-account-detail',
    templateUrl: './finance-account-detail.component.html'
})
export class FinanceAccountDetailComponent implements OnInit, OnDestroy {

    private _id: number;
    financeAccount: FinanceAccount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private accountSubscriber: Subscription;
    private tranEventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private financeAccountService: FinanceAccountService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this._id = params['id'];
            this.load(params['id']);
        });
        this.registerChangeInFinanceAccounts();
    }

    load(id) {
        this.financeAccountService.find(id).subscribe((financeAccount) => {
            this.financeAccount = financeAccount;
        }, error => {
            debugger;
            if(error.status === 404){
                this.eventManager.broadcast({
                    name: 'financeAccountListModification',
                    content: 'Account ' + this._id + ' not found.',
                });
                this.router.navigate(['/finance-account']);
            }
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFinanceAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'financeAccountDetailModification',
            (response) => {
                debugger;
                if(!response.data){
                    this.load(this.financeAccount.id);
                    return;
                }

                if(response.data.action === 'financeAccountDeleted'){
                    let account: FinanceAccount  = response.data.item;
                    if (this.financeAccount.id === account.id){
                        window.history.back();
                        //this.router.navigate(['/finance-account']);
                        return;
                    }
                }

            }
        );

        this.tranEventSubscriber = this.eventManager.subscribe(
            'transactionListModification'
            , (response) => {

                if(!response.data)
                    return;

                if(response.data.action === 'transactionDeleted'){
                    let tran: AccountTransaction  = response.data.item;
                    this.financeAccount.balance = this.financeAccount.balance - tran.amount;
                }
            }
        );
    }
}
