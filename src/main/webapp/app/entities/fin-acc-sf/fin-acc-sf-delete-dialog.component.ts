import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFinAccSf } from 'app/shared/model/fin-acc-sf.model';
import { FinAccSfService } from './fin-acc-sf.service';

@Component({
    selector: 'sf-fin-acc-sf-delete-dialog',
    templateUrl: './fin-acc-sf-delete-dialog.component.html'
})
export class FinAccSfDeleteDialogComponent {
    finAcc: IFinAccSf;

    constructor(private finAccService: FinAccSfService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.finAccService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'finAccListModification',
                content: 'Deleted an finAcc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'sf-fin-acc-sf-delete-popup',
    template: ''
})
export class FinAccSfDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ finAcc }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FinAccSfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.finAcc = finAcc;
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
