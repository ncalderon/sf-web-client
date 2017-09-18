import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Bank } from './bank.model';
import { BankService } from './bank.service';

@Component({
    selector: 'jhi-bank-detail',
    templateUrl: './bank-detail.component.html'
})
export class BankDetailComponent implements OnInit, OnDestroy {

    bank: Bank;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankService: BankService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBanks();
    }

    load(id) {
        this.bankService.find(id).subscribe((bank) => {
            this.bank = bank;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBanks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankListModification',
            (response) => this.load(this.bank.id)
        );
    }
}
