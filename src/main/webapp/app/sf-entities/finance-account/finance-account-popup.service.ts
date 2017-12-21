import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {AccountStatus, FinanceAccount} from '../../shared/sf-model/finance-account.model';
import { FinanceAccountService } from '../../shared/sf-services/finance-account/finance-account.service';
import {LoggerService} from "../../shared/logger/logger.service";
import {DatetimeService} from "../../shared/datetime/datetime.service";
import {User} from "../../shared/user/user.model";
import {Principal} from "../../shared/auth/principal.service";

@Injectable()
export class FinanceAccountPopupService {
    private ngbModalRef: NgbModalRef;
    private currentUser: User;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private financeAccountService: FinanceAccountService,
        private principal: Principal,
        private logger: LoggerService,
        private dateTimeService: DatetimeService
    ) {
        this.ngbModalRef = null;
    }

    newAccount() {
        const account: FinanceAccount = new FinanceAccount();
        account.accountStatus = <AccountStatus><any>'ACTIVE';
        this.principal.identity().then((user) => {
            this.currentUser = user;
            account.user = user;
        });
        account.isCreditCard = false;
        return account;
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
                    this.ngbModalRef = this.financeAccountModalRef(component, this.newAccount());
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
