/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { FinAccSfDetailComponent } from 'app/entities/fin-acc-sf/fin-acc-sf-detail.component';
import { FinAccSf } from 'app/shared/model/fin-acc-sf.model';

describe('Component Tests', () => {
    describe('FinAccSf Management Detail Component', () => {
        let comp: FinAccSfDetailComponent;
        let fixture: ComponentFixture<FinAccSfDetailComponent>;
        const route = ({ data: of({ finAcc: new FinAccSf(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [FinAccSfDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FinAccSfDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FinAccSfDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.finAcc).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
