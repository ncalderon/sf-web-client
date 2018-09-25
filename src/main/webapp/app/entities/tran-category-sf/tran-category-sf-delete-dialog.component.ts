import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITranCategorySf } from 'app/shared/model/tran-category-sf.model';
import { TranCategorySfService } from './tran-category-sf.service';

@Component({
    selector: 'sf-tran-category-sf-delete-dialog',
    templateUrl: './tran-category-sf-delete-dialog.component.html'
})
export class TranCategorySfDeleteDialogComponent {
    tranCategory: ITranCategorySf;

    constructor(
        private tranCategoryService: TranCategorySfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tranCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tranCategoryListModification',
                content: 'Deleted an tranCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'sf-tran-category-sf-delete-popup',
    template: ''
})
export class TranCategorySfDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tranCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TranCategorySfDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tranCategory = tranCategory;
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
