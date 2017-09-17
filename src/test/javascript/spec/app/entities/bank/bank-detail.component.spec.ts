/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SfWebClientTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BankDetailComponent } from '../../../../../../main/webapp/app/entities/bank/bank-detail.component';
import { BankService } from '../../../../../../main/webapp/app/entities/bank/bank.service';
import { Bank } from '../../../../../../main/webapp/app/entities/bank/bank.model';

describe('Component Tests', () => {

    describe('Bank Management Detail Component', () => {
        let comp: BankDetailComponent;
        let fixture: ComponentFixture<BankDetailComponent>;
        let service: BankService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SfWebClientTestModule],
                declarations: [BankDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BankService,
                    JhiEventManager
                ]
            }).overrideTemplate(BankDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Bank(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bank).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
