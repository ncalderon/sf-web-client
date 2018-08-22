/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { UserPreferenceSfDetailComponent } from 'app/entities/user-preference-sf/user-preference-sf-detail.component';
import { UserPreferenceSf } from 'app/shared/model/user-preference-sf.model';

describe('Component Tests', () => {
    describe('UserPreferenceSf Management Detail Component', () => {
        let comp: UserPreferenceSfDetailComponent;
        let fixture: ComponentFixture<UserPreferenceSfDetailComponent>;
        const route = ({ data: of({ userPreference: new UserPreferenceSf(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [UserPreferenceSfDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserPreferenceSfDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserPreferenceSfDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userPreference).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
