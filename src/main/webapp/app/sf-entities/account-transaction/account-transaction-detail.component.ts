import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AccountTransaction } from '../../shared/sf-model/account-transaction.model';
import {AccountTransactionService} from '../../shared/sf-services/account-transaction';

@Component({
    selector: 'jhi-account-transaction-detail',
    templateUrl: './account-transaction-detail.component.html'
})
export class AccountTransactionDetailComponent implements OnInit, OnDestroy {

    accountTransaction: AccountTransaction;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accountTransactionService: AccountTransactionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAccountTransactions();
    }

    load(id) {
        this.accountTransactionService.find(id).subscribe((accountTransaction) => {
            this.accountTransaction = accountTransaction;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccountTransactions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'accountTransactionListModification',
            (response) => this.load(this.accountTransaction.id)
        );
    }
}
