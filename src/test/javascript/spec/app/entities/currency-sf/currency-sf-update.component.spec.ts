/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { CurrencySfUpdateComponent } from 'app/entities/currency-sf/currency-sf-update.component';
import { CurrencySfService } from 'app/entities/currency-sf/currency-sf.service';
import { CurrencySf } from 'app/shared/model/currency-sf.model';

describe('Component Tests', () => {
    describe('CurrencySf Management Update Component', () => {
        let comp: CurrencySfUpdateComponent;
        let fixture: ComponentFixture<CurrencySfUpdateComponent>;
        let service: CurrencySfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [CurrencySfUpdateComponent]
            })
                .overrideTemplate(CurrencySfUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CurrencySfUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencySfService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CurrencySf(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currency = entity;
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
                    const entity = new CurrencySf();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currency = entity;
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
