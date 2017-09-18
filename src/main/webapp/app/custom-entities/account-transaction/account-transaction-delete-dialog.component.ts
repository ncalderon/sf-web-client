import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountTransaction } from './account-transaction.model';
import { AccountTransactionPopupService } from './account-transaction-popup.service';
import { AccountTransactionService } from './account-transaction.service';

@Component({
    selector: 'jhi-account-transaction-delete-dialog',
    templateUrl: './account-transaction-delete-dialog.component.html'
})
export class AccountTransactionDeleteDialogComponent {

    accountTransaction: AccountTransaction;

    constructor(
        private accountTransactionService: AccountTransactionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountTransactionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'accountTransactionListModification',
                content: 'Deleted an accountTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-account-transaction-delete-popup',
    template: ''
})
export class AccountTransactionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountTransactionPopupService: AccountTransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accountTransactionPopupService
                .open(AccountTransactionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
