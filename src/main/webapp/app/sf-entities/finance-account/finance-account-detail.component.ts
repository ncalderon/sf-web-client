import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager} from 'ng-jhipster';

import {FinanceAccount} from './finance-account.model';
import {FinanceAccountService} from './finance-account.service';
import {AccountTransaction, TranType} from '../account-transaction/account-transaction.model';

@Component({
    selector: 'jhi-finance-account-detail',
    templateUrl: './finance-account-detail.component.html'
})
export class FinanceAccountDetailComponent implements OnInit, OnDestroy {

    financeAccount: FinanceAccount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private tranEventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager,
                private financeAccountService: FinanceAccountService,
                private route: ActivatedRoute,
                private router: Router,
                private location: Location) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFinanceAccounts();
    }

    load(id) {
        this.financeAccountService.find(id).subscribe((financeAccount) => {
            this.financeAccount = financeAccount;
        });
    }

    previousState() {
        this.router.navigate(['finance-account']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFinanceAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'financeAccountListModification',
            (response) => {
                if (!response.data)
                    this.load(this.financeAccount.id)

            }
        );
    }

    refreshBalance($event) {
        this.financeAccount.balance = $event;
    }
}
