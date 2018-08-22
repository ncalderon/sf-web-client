/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfwebTestModule } from '../../../test.module';
import { FinAccSfDeleteDialogComponent } from 'app/entities/fin-acc-sf/fin-acc-sf-delete-dialog.component';
import { FinAccSfService } from 'app/entities/fin-acc-sf/fin-acc-sf.service';

describe('Component Tests', () => {
    describe('FinAccSf Management Delete Component', () => {
        let comp: FinAccSfDeleteDialogComponent;
        let fixture: ComponentFixture<FinAccSfDeleteDialogComponent>;
        let service: FinAccSfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [FinAccSfDeleteDialogComponent]
            })
                .overrideTemplate(FinAccSfDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FinAccSfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FinAccSfService);
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
