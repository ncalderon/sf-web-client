/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SfwebTestModule } from '../../../test.module';
import { CurrencySfDeleteDialogComponent } from 'app/entities/currency-sf/currency-sf-delete-dialog.component';
import { CurrencySfService } from 'app/entities/currency-sf/currency-sf.service';

describe('Component Tests', () => {
    describe('CurrencySf Management Delete Component', () => {
        let comp: CurrencySfDeleteDialogComponent;
        let fixture: ComponentFixture<CurrencySfDeleteDialogComponent>;
        let service: CurrencySfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [CurrencySfDeleteDialogComponent]
            })
                .overrideTemplate(CurrencySfDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CurrencySfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencySfService);
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
