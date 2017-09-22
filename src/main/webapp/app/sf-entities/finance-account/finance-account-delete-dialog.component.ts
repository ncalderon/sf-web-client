import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FinanceAccount } from './finance-account.model';
import { FinanceAccountPopupService } from './finance-account-popup.service';
import { FinanceAccountService } from './finance-account.service';

@Component({
    selector: 'jhi-finance-account-delete-dialog',
    templateUrl: './finance-account-delete-dialog.component.html'
})
export class FinanceAccountDeleteDialogComponent {

    financeAccount: FinanceAccount;

    constructor(
        private financeAccountService: FinanceAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.financeAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'financeAccountListModification',
                content: 'Deleted an financeAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-finance-account-delete-popup',
    template: ''
})
export class FinanceAccountDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private financeAccountPopupService: FinanceAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.financeAccountPopupService
                .open(FinanceAccountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
