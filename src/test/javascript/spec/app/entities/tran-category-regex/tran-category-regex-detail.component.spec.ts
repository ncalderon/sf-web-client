/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SfWebClientTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TranCategoryRegexDetailComponent } from '../../../../../../main/webapp/app/entities/tran-category-regex/tran-category-regex-detail.component';
import { TranCategoryRegexService } from '../../../../../../main/webapp/app/entities/tran-category-regex/tran-category-regex.service';
import { TranCategoryRegex } from '../../../../../../main/webapp/app/entities/tran-category-regex/tran-category-regex.model';

describe('Component Tests', () => {

    describe('TranCategoryRegex Management Detail Component', () => {
        let comp: TranCategoryRegexDetailComponent;
        let fixture: ComponentFixture<TranCategoryRegexDetailComponent>;
        let service: TranCategoryRegexService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SfWebClientTestModule],
                declarations: [TranCategoryRegexDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TranCategoryRegexService,
                    JhiEventManager
                ]
            }).overrideTemplate(TranCategoryRegexDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TranCategoryRegexDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TranCategoryRegexService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TranCategoryRegex(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tranCategoryRegex).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
