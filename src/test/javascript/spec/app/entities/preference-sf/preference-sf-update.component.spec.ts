/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { PreferenceSfUpdateComponent } from 'app/entities/preference-sf/preference-sf-update.component';
import { PreferenceSfService } from 'app/entities/preference-sf/preference-sf.service';
import { PreferenceSf } from 'app/shared/model/preference-sf.model';

describe('Component Tests', () => {
    describe('PreferenceSf Management Update Component', () => {
        let comp: PreferenceSfUpdateComponent;
        let fixture: ComponentFixture<PreferenceSfUpdateComponent>;
        let service: PreferenceSfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [PreferenceSfUpdateComponent]
            })
                .overrideTemplate(PreferenceSfUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PreferenceSfUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferenceSfService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PreferenceSf(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.preference = entity;
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
                    const entity = new PreferenceSf();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.preference = entity;
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
