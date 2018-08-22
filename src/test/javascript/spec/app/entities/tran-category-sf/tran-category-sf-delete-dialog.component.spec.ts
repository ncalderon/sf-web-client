/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfwebTestModule } from '../../../test.module';
import { TranCategorySfDeleteDialogComponent } from 'app/entities/tran-category-sf/tran-category-sf-delete-dialog.component';
import { TranCategorySfService } from 'app/entities/tran-category-sf/tran-category-sf.service';

describe('Component Tests', () => {
    describe('TranCategorySf Management Delete Component', () => {
        let comp: TranCategorySfDeleteDialogComponent;
        let fixture: ComponentFixture<TranCategorySfDeleteDialogComponent>;
        let service: TranCategorySfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [TranCategorySfDeleteDialogComponent]
            })
                .overrideTemplate(TranCategorySfDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranCategorySfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranCategorySfService);
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
