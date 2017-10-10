import {Component, OnDestroy, OnInit} from '@angular/core';
import {JhiEventManager} from 'ng-jhipster';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

    eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager) {
    }

    ngOnInit() {
    }

    registerChangeInSidebarComponent() {
        this.eventSubscriber = this.eventManager.subscribe('sidebarModification', (response) => {
            console.log(response);
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
}
