import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranCategoryRegex } from './tran-category-regex.model';
import { TranCategoryRegexService } from './tran-category-regex.service';

@Injectable()
export class TranCategoryRegexPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tranCategoryRegexService: TranCategoryRegexService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tranCategoryRegexService.find(id).subscribe((tranCategoryRegex) => {
                    this.ngbModalRef = this.tranCategoryRegexModalRef(component, tranCategoryRegex);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tranCategoryRegexModalRef(component, new TranCategoryRegex());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tranCategoryRegexModalRef(component: Component, tranCategoryRegex: TranCategoryRegex): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tranCategoryRegex = tranCategoryRegex;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
