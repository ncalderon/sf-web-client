/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { CurrencySfDetailComponent } from 'app/entities/currency-sf/currency-sf-detail.component';
import { CurrencySf } from 'app/shared/model/currency-sf.model';

describe('Component Tests', () => {
    describe('CurrencySf Management Detail Component', () => {
        let comp: CurrencySfDetailComponent;
        let fixture: ComponentFixture<CurrencySfDetailComponent>;
        const route = ({ data: of({ currency: new CurrencySf(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [CurrencySfDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CurrencySfDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CurrencySfDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.currency).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
