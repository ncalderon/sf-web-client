import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

import { ActivateService } from './activate.service';
import { LoginModalService } from '../../shared';
import {Principal} from "../../shared/auth/principal.service";
import {Subscription} from "rxjs/Subscription";
import {JhiEventManager} from "ng-jhipster";

@Component({
    selector: 'jhi-activate',
    templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit, OnDestroy {
    error: string;
    success: string;
    modalRef: NgbModalRef;
    eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private activateService: ActivateService,
        private loginModalService: LoginModalService,
        private route: ActivatedRoute,
        private router: Router,
        private principal: Principal,
    ) {
    }

    ngOnInit() {
        this.onAuthentication();

        this.route.queryParams.subscribe((params) => {
            this.activateService.get(params['key']).subscribe(() => {
                this.error = null;
                this.success = 'OK';
            }, () => {
                this.success = null;
                this.error = 'ERROR';
            });
        });
        this.registerOnUserLogin();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    onAuthentication() {
        if(this.principal.isAuthenticated())
            this.router.navigate(['/']);
    }
    registerOnUserLogin() {
        this.eventSubscriber = this.eventManager.subscribe('authenticationSuccess', (content) => {
            this.onAuthentication();
        });
    }


    ngOnDestroy(): void {
        this.eventManager.destroy(this.eventSubscriber);
    }
}
