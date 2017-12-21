import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {AccountTransaction, PaymentMethod, TranType} from '../../shared/sf-model/account-transaction.model';
import { AccountTransactionService } from '../../shared/sf-services/account-transaction/account-transaction.service';
import {Principal} from '../../shared/auth/principal.service';
import {User} from '../../shared/user/user.model';
import {LoggerService} from '../../shared/logger/logger.service';
import {DatetimeService} from '../../shared/datetime/datetime.service';

@Injectable()
export class AccountTransactionPopupService {
    private ngbModalRef: NgbModalRef;
    private currentUser: User;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private accountTransactionService: AccountTransactionService,
        private principal: Principal,
        private logger: LoggerService,
        private dateTimeService: DatetimeService

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
                    if (accountTransaction.postDate) {
                        accountTransaction.postDate = {
                            year: accountTransaction.postDate.getFullYear(),
                            month: accountTransaction.postDate.getMonth() + 1,
                            day: accountTransaction.postDate.getDate()
                        };
                    }
                    this.logger.info(accountTransaction);
                    this.ngbModalRef = this.accountTransactionModalRef(component, accountTransaction);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accountTransactionModalRef(component, this.newAccountTransaction());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    newAccountTransaction() {
        const tran: AccountTransaction = new AccountTransaction();
        tran.tranType = <TranType><any>'EXPENSE';
        tran.paymentMethod = <PaymentMethod><any>'UNSPECIFIED';
        tran.postDate = this.dateTimeService.nowLocalDate();
        this.principal.identity().then((user) => {
            this.currentUser = user;
            tran.user = user;
        });
        this.logger.info(tran);
        return tran;
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
