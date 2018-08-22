import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPreferenceSf } from 'app/shared/model/preference-sf.model';
import { PreferenceSfService } from './preference-sf.service';

@Component({
    selector: 'sf-preference-sf-delete-dialog',
    templateUrl: './preference-sf-delete-dialog.component.html'
})
export class PreferenceSfDeleteDialogComponent {
    preference: IPreferenceSf;

    constructor(
        private preferenceService: PreferenceSfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.preferenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'preferenceListModification',
                content: 'Deleted an preference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'sf-preference-sf-delete-popup',
    template: ''
})
export class PreferenceSfDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preference }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PreferenceSfDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.preference = preference;
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
