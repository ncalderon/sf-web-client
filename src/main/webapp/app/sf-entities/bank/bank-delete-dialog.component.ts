import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bank } from '../../shared/sf-model/bank.model';
import { BankPopupService } from './bank-popup.service';
import { BankService } from '../../shared/sf-services/bank/bank.service';

@Component({
    selector: 'jhi-bank-delete-dialog',
    templateUrl: './bank-delete-dialog.component.html'
})
export class BankDeleteDialogComponent {

    bank: Bank;

    constructor(
        private bankService: BankService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankListModification',
                content: 'Deleted an bank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bank-delete-popup',
    template: ''
})
export class BankDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankPopupService: BankPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankPopupService
                .open(BankDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
