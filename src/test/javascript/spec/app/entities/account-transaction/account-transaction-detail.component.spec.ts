/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SfWebClientTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AccountTransactionDetailComponent } from '../../../../../../main/webapp/app/sf-entities/account-transaction/account-transaction-detail.component';
import { AccountTransactionService } from '../../../../../../main/webapp/app/sf-entities/account-transaction/account-transaction.service';
import { AccountTransaction } from '../../../../../../main/webapp/app/sf-entities/account-transaction/account-transaction.model';

describe('Component Tests', () => {

    describe('AccountTransaction Management Detail Component', () => {
        let comp: AccountTransactionDetailComponent;
        let fixture: ComponentFixture<AccountTransactionDetailComponent>;
        let service: AccountTransactionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SfWebClientTestModule],
                declarations: [AccountTransactionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AccountTransactionService,
                    JhiEventManager
                ]
            }).overrideTemplate(AccountTransactionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AccountTransactionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountTransactionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AccountTransaction(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.accountTransaction).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
