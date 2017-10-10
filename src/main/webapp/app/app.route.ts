import { Route } from '@angular/router';

import { NavbarComponent } from './layouts';
import {SidebarComponent} from './layouts/sidebar/sidebar.component';
import {CustomNavbarComponent} from './layouts/custom-navbar/custom-navbar.component';

export const navbarRoute: Route = {
    path: '',
    /*component: NavbarComponent,*/
    component: CustomNavbarComponent,
    outlet: 'navbar'
};

export const sidebarRoute: Route = {
    path: '',
    component: SidebarComponent,
    outlet: 'sidebar'
};
