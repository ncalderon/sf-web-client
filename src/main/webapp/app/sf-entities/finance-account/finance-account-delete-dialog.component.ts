import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FinanceAccount } from '../../shared/sf-model/finance-account.model';
import { FinanceAccountPopupService } from './finance-account-popup.service';
import { FinanceAccountService } from '../../shared/sf-services/finance-account/finance-account.service';

@Component({
    selector: 'jhi-finance-account-delete-dialog',
    templateUrl: './finance-account-delete-dialog.component.html'
})
export class FinanceAccountDeleteDialogComponent {

    financeAccount: FinanceAccount;

    constructor(
        private financeAccountService: FinanceAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.financeAccountService.delete(id).subscribe((response) => {
            this.activeModal.dismiss(true);
            // setTimeout used as a workaround for Getting navigation after delete account
            setTimeout(() => {
                this.eventManager.broadcast({
                    name: 'financeAccountListModification',
                    content: 'Deleted an financeAccount',
                    data: { action: 'transactionDeleted', item: this.financeAccount }
                });
            }, 1);
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
