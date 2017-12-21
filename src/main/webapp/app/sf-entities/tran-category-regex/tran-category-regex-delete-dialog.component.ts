import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TranCategoryRegex } from '../../shared/sf-model/tran-category-regex.model';
import { TranCategoryRegexPopupService } from './tran-category-regex-popup.service';
import { TranCategoryRegexService } from '../../shared/sf-services/tran-category-regex/tran-category-regex.service';

@Component({
    selector: 'jhi-tran-category-regex-delete-dialog',
    templateUrl: './tran-category-regex-delete-dialog.component.html'
})
export class TranCategoryRegexDeleteDialogComponent {

    tranCategoryRegex: TranCategoryRegex;

    constructor(
        private tranCategoryRegexService: TranCategoryRegexService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tranCategoryRegexService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tranCategoryRegexListModification',
                content: 'Deleted an tranCategoryRegex'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tran-category-regex-delete-popup',
    template: ''
})
export class TranCategoryRegexDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tranCategoryRegexPopupService: TranCategoryRegexPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tranCategoryRegexPopupService
                .open(TranCategoryRegexDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
