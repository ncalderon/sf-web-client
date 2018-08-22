/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfwebTestModule } from '../../../test.module';
import { TranEntrySfDeleteDialogComponent } from 'app/entities/tran-entry-sf/tran-entry-sf-delete-dialog.component';
import { TranEntrySfService } from 'app/entities/tran-entry-sf/tran-entry-sf.service';

describe('Component Tests', () => {
    describe('TranEntrySf Management Delete Component', () => {
        let comp: TranEntrySfDeleteDialogComponent;
        let fixture: ComponentFixture<TranEntrySfDeleteDialogComponent>;
        let service: TranEntrySfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [TranEntrySfDeleteDialogComponent]
            })
                .overrideTemplate(TranEntrySfDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranEntrySfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranEntrySfService);
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
