/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SfWebClientTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FinanceAccountDetailComponent } from '../../../../../../main/webapp/app/entities/finance-account/finance-account-detail.component';
import { FinanceAccountService } from '../../../../../../main/webapp/app/entities/finance-account/finance-account.service';
import { FinanceAccount } from '../../../../../../main/webapp/app/entities/finance-account/finance-account.model';

describe('Component Tests', () => {

    describe('FinanceAccount Management Detail Component', () => {
        let comp: FinanceAccountDetailComponent;
        let fixture: ComponentFixture<FinanceAccountDetailComponent>;
        let service: FinanceAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SfWebClientTestModule],
                declarations: [FinanceAccountDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FinanceAccountService,
                    JhiEventManager
                ]
            }).overrideTemplate(FinanceAccountDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FinanceAccountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FinanceAccountService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FinanceAccount(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.financeAccount).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
