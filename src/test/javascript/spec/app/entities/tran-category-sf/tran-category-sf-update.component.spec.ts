/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { TranCategorySfUpdateComponent } from 'app/entities/tran-category-sf/tran-category-sf-update.component';
import { TranCategorySfService } from 'app/entities/tran-category-sf/tran-category-sf.service';
import { TranCategorySf } from 'app/shared/model/tran-category-sf.model';

describe('Component Tests', () => {
    describe('TranCategorySf Management Update Component', () => {
        let comp: TranCategorySfUpdateComponent;
        let fixture: ComponentFixture<TranCategorySfUpdateComponent>;
        let service: TranCategorySfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [TranCategorySfUpdateComponent]
            })
                .overrideTemplate(TranCategorySfUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TranCategorySfUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranCategorySfService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TranCategorySf(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tranCategory = entity;
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
                    const entity = new TranCategorySf();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tranCategory = entity;
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
