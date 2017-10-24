import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranCategory } from './tran-category.model';
import { TranCategoryService } from './tran-category.service';
import {Principal} from '../../shared/auth/principal.service';
import {DatetimeService} from '../../shared/datetime/datetime.service';
import {LoggerService} from '../../shared/logger/logger.service';
import {User} from '../../shared/user/user.model';

@Injectable()
export class TranCategoryPopupService {
    private ngbModalRef: NgbModalRef;
    private currentUser: User;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tranCategoryService: TranCategoryService,
        private principal: Principal,
        private logger: LoggerService,
        private dateTimeService: DatetimeService

    ) {
        this.ngbModalRef = null;
    }

    newCategory(): TranCategory{
        const category: TranCategory = new TranCategory();
        this.principal.identity().then((user) => {
            this.currentUser = user;
            category.user = user;
        });
        return category;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tranCategoryService.find(id).subscribe((tranCategory) => {
                    this.ngbModalRef = this.tranCategoryModalRef(component, tranCategory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tranCategoryModalRef(component, this.newCategory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tranCategoryModalRef(component: Component, tranCategory: TranCategory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tranCategory = tranCategory;
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
