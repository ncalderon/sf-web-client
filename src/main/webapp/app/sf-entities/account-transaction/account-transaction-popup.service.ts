import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AccountTransaction } from './account-transaction.model';
import { AccountTransactionService } from './account-transaction.service';

@Injectable()
export class AccountTransactionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private accountTransactionService: AccountTransactionService

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
                this.accountTransactionService.find(id).subscribe((accountTransaction) => {
                    accountTransaction.postDate = this.datePipe
                        .transform(accountTransaction.postDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.accountTransactionModalRef(component, accountTransaction);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accountTransactionModalRef(component, new AccountTransaction());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accountTransactionModalRef(component: Component, accountTransaction: AccountTransaction): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.accountTransaction = accountTransaction;
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
