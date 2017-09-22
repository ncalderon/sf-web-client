import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FinanceAccount } from './finance-account.model';
import { FinanceAccountService } from './finance-account.service';

@Injectable()
export class FinanceAccountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private financeAccountService: FinanceAccountService

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
                this.financeAccountService.find(id).subscribe((financeAccount) => {
                    if (financeAccount.dueDate) {
                        financeAccount.dueDate = {
                            year: financeAccount.dueDate.getFullYear(),
                            month: financeAccount.dueDate.getMonth() + 1,
                            day: financeAccount.dueDate.getDate()
                        };
                    }
                    if (financeAccount.closingDate) {
                        financeAccount.closingDate = {
                            year: financeAccount.closingDate.getFullYear(),
                            month: financeAccount.closingDate.getMonth() + 1,
                            day: financeAccount.closingDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.financeAccountModalRef(component, financeAccount);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.financeAccountModalRef(component, new FinanceAccount());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    financeAccountModalRef(component: Component, financeAccount: FinanceAccount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.financeAccount = financeAccount;
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
