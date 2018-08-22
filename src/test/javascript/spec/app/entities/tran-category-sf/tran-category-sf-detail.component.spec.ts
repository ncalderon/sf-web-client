/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { TranCategorySfDetailComponent } from 'app/entities/tran-category-sf/tran-category-sf-detail.component';
import { TranCategorySf } from 'app/shared/model/tran-category-sf.model';

describe('Component Tests', () => {
    describe('TranCategorySf Management Detail Component', () => {
        let comp: TranCategorySfDetailComponent;
        let fixture: ComponentFixture<TranCategorySfDetailComponent>;
        const route = ({ data: of({ tranCategory: new TranCategorySf(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [TranCategorySfDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TranCategorySfDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranCategorySfDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tranCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
