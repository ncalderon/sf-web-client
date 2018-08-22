/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { FinAccSfUpdateComponent } from 'app/entities/fin-acc-sf/fin-acc-sf-update.component';
import { FinAccSfService } from 'app/entities/fin-acc-sf/fin-acc-sf.service';
import { FinAccSf } from 'app/shared/model/fin-acc-sf.model';

describe('Component Tests', () => {
    describe('FinAccSf Management Update Component', () => {
        let comp: FinAccSfUpdateComponent;
        let fixture: ComponentFixture<FinAccSfUpdateComponent>;
        let service: FinAccSfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [FinAccSfUpdateComponent]
            })
                .overrideTemplate(FinAccSfUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FinAccSfUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FinAccSfService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FinAccSf(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.finAcc = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FinAccSf();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.finAcc = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
