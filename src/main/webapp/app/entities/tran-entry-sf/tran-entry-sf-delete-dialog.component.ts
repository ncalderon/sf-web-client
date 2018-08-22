import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITranEntrySf } from 'app/shared/model/tran-entry-sf.model';
import { TranEntrySfService } from './tran-entry-sf.service';

@Component({
    selector: 'sf-tran-entry-sf-delete-dialog',
    templateUrl: './tran-entry-sf-delete-dialog.component.html'
})
export class TranEntrySfDeleteDialogComponent {
    tranEntry: ITranEntrySf;

    constructor(private tranEntryService: TranEntrySfService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tranEntryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tranEntryListModification',
                content: 'Deleted an tranEntry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'sf-tran-entry-sf-delete-popup',
    template: ''
})
export class TranEntrySfDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tranEntry }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TranEntrySfDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tranEntry = tranEntry;
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
