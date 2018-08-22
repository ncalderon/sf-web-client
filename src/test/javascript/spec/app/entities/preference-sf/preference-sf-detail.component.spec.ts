/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { PreferenceSfDetailComponent } from 'app/entities/preference-sf/preference-sf-detail.component';
import { PreferenceSf } from 'app/shared/model/preference-sf.model';

describe('Component Tests', () => {
    describe('PreferenceSf Management Detail Component', () => {
        let comp: PreferenceSfDetailComponent;
        let fixture: ComponentFixture<PreferenceSfDetailComponent>;
        const route = ({ data: of({ preference: new PreferenceSf(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [PreferenceSfDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PreferenceSfDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PreferenceSfDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.preference).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
