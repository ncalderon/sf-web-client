import {Component, OnInit} from '@angular/core';
import {JhiEventManager} from 'ng-jhipster';

@Component({
    selector: 'jhi-custom-navbar',
    templateUrl: './custom-navbar.component.html',
    styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent implements OnInit {

    collapse = false;
    constructor(private eventManager: JhiEventManager) {
    }

    ngOnInit() {
    }

    onToggle() {
        this.collapse = !this.collapse;
        this.eventManager.broadcast({name: 'sidebarModification', content: this.collapse});
    }

}
