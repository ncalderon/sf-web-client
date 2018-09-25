/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SfwebTestModule } from '../../../test.module';
import { TranEntrySfDetailComponent } from 'app/entities/tran-entry-sf/tran-entry-sf-detail.component';
import { TranEntrySf } from 'app/shared/model/tran-entry-sf.model';

describe('Component Tests', () => {
    describe('TranEntrySf Management Detail Component', () => {
        let comp: TranEntrySfDetailComponent;
        let fixture: ComponentFixture<TranEntrySfDetailComponent>;
        const route = ({ data: of({ tranEntry: new TranEntrySf(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SfwebTestModule],
                declarations: [TranEntrySfDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TranEntrySfDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TranEntrySfDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tranEntry).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
