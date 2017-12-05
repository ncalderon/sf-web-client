import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountTransaction} from '../../../account-transaction/account-transaction.model';
import {AccountTransactionService} from '../../../account-transaction/account-transaction.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {ActivatedRoute} from '@angular/router';
import {TransactionPopupService} from '../transaction-popup.service';

@Component({
    selector: 'jhi-transaction-delete-dialog',
    templateUrl: './transaction-delete-dialog.component.html'
})
export class TransactionDeleteDialogComponent {

    transaction: AccountTransaction;

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
                name: 'transactionListModification',
                content: 'Deleted an Transaction',
                data: { action: 'transactionDeleted', item: this.transaction}
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-delete-popup',
    template: ''
})
export class TransactionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountTransactionPopupService: TransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accountTransactionPopupService
                .open(TransactionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
