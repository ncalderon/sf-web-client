import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICurrencySf } from 'app/shared/model/currency-sf.model';
import { CurrencySfService } from './currency-sf.service';

@Component({
    selector: 'sf-currency-sf-delete-dialog',
    templateUrl: './currency-sf-delete-dialog.component.html'
})
export class CurrencySfDeleteDialogComponent {
    currency: ICurrencySf;

    constructor(private currencyService: CurrencySfService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currencyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'currencyListModification',
                content: 'Deleted an currency'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'sf-currency-sf-delete-popup',
    template: ''
})
export class CurrencySfDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ currency }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CurrencySfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.currency = currency;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
