/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { UserPreferenceSfUpdateComponent } from 'app/entities/user-preference-sf/user-preference-sf-update.component';
import { UserPreferenceSfService } from 'app/entities/user-preference-sf/user-preference-sf.service';
import { UserPreferenceSf } from 'app/shared/model/user-preference-sf.model';

describe('Component Tests', () => {
    describe('UserPreferenceSf Management Update Component', () => {
        let comp: UserPreferenceSfUpdateComponent;
        let fixture: ComponentFixture<UserPreferenceSfUpdateComponent>;
        let service: UserPreferenceSfService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [UserPreferenceSfUpdateComponent]
            })
                .overrideTemplate(UserPreferenceSfUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserPreferenceSfUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserPreferenceSfService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserPreferenceSf(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userPreference = entity;
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
                    const entity = new UserPreferenceSf();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userPreference = entity;
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
