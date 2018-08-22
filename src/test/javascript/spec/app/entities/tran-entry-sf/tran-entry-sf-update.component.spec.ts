/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { TranEntrySfUpdateComponent } from 'app/entities/tran-entry-sf/tran-entry-sf-update.component';
import { TranEntrySfService } from 'app/entities/tran-entry-sf/tran-entry-sf.service';
import { TranEntrySf } from 'app/shared/model/tran-entry-sf.model';

describe('Component Tests', () => {
    describe('TranEntrySf Management Update Component', () => {
        let comp: TranEntrySfUpdateComponent;
        let fixture: ComponentFixture<TranEntrySfUpdateComponent>;
        let service: TranEntrySfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [TranEntrySfUpdateComponent]
            })
                .overrideTemplate(TranEntrySfUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TranEntrySfUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranEntrySfService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TranEntrySf(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tranEntry = entity;
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
                    const entity = new TranEntrySf();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tranEntry = entity;
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
