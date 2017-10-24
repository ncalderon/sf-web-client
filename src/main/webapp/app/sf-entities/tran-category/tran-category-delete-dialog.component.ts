import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TranCategory } from './tran-category.model';
import { TranCategoryPopupService } from './tran-category-popup.service';
import { TranCategoryService } from './tran-category.service';

@Component({
    selector: 'jhi-tran-category-delete-dialog',
    templateUrl: './tran-category-delete-dialog.component.html'
})
export class TranCategoryDeleteDialogComponent {

    tranCategory: TranCategory;

    constructor(
        private tranCategoryService: TranCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tranCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tranCategoryListModification',
                content: 'Deleted an tranCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tran-category-delete-popup',
    template: ''
})
export class TranCategoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tranCategoryPopupService: TranCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tranCategoryPopupService
                .open(TranCategoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
