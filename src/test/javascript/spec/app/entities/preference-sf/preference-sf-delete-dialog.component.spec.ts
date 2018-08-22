/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfwebTestModule } from '../../../test.module';
import { PreferenceSfDeleteDialogComponent } from 'app/entities/preference-sf/preference-sf-delete-dialog.component';
import { PreferenceSfService } from 'app/entities/preference-sf/preference-sf.service';

describe('Component Tests', () => {
    describe('PreferenceSf Management Delete Component', () => {
        let comp: PreferenceSfDeleteDialogComponent;
        let fixture: ComponentFixture<PreferenceSfDeleteDialogComponent>;
        let service: PreferenceSfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [PreferenceSfDeleteDialogComponent]
            })
                .overrideTemplate(PreferenceSfDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PreferenceSfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferenceSfService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
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
                )
            );
        });
    });
});
