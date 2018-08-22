import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserPreferenceSf } from 'app/shared/model/user-preference-sf.model';
import { UserPreferenceSfService } from './user-preference-sf.service';

@Component({
    selector: 'sf-user-preference-sf-delete-dialog',
    templateUrl: './user-preference-sf-delete-dialog.component.html'
})
export class UserPreferenceSfDeleteDialogComponent {
    userPreference: IUserPreferenceSf;

    constructor(
        private userPreferenceService: UserPreferenceSfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userPreferenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userPreferenceListModification',
                content: 'Deleted an userPreference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'sf-user-preference-sf-delete-popup',
    template: ''
})
export class UserPreferenceSfDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userPreference }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserPreferenceSfDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userPreference = userPreference;
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
