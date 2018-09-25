/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfwebTestModule } from '../../../test.module';
import { UserPreferenceSfDeleteDialogComponent } from 'app/entities/user-preference-sf/user-preference-sf-delete-dialog.component';
import { UserPreferenceSfService } from 'app/entities/user-preference-sf/user-preference-sf.service';

describe('Component Tests', () => {
    describe('UserPreferenceSf Management Delete Component', () => {
        let comp: UserPreferenceSfDeleteDialogComponent;
        let fixture: ComponentFixture<UserPreferenceSfDeleteDialogComponent>;
        let service: UserPreferenceSfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [UserPreferenceSfDeleteDialogComponent]
            })
                .overrideTemplate(UserPreferenceSfDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserPreferenceSfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPreferenceSfService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
