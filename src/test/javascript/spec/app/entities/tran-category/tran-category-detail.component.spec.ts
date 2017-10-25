/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SfWebClientTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TranCategoryDetailComponent } from '../../../../../../main/webapp/app/sf-entities/tran-category/tran-category-detail.component';
import { TranCategoryService } from '../../../../../../main/webapp/app/sf-entities/tran-category/tran-category.service';
import { TranCategory } from '../../../../../../main/webapp/app/sf-entities/tran-category/tran-category.model';

describe('Component Tests', () => {

    describe('TranCategory Management Detail Component', () => {
        let comp: TranCategoryDetailComponent;
        let fixture: ComponentFixture<TranCategoryDetailComponent>;
        let service: TranCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SfWebClientTestModule],
                declarations: [TranCategoryDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TranCategoryService,
                    JhiEventManager
                ]
            }).overrideTemplate(TranCategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TranCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TranCategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tranCategory).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
