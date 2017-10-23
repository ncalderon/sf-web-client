import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('AccountTransaction e2e test', () => {

    let navBarPage: NavBarPage;
    let accountTransactionDialogPage: AccountTransactionDialogPage;
    let accountTransactionComponentsPage: AccountTransactionComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AccountTransactions', () => {
        navBarPage.goToEntity('account-transaction');
        accountTransactionComponentsPage = new AccountTransactionComponentsPage();
        expect(accountTransactionComponentsPage.getTitle()).toMatch(/sfWebClientApp.accountTransaction.home.title/);

    });

    it('should load create AccountTransaction dialog', () => {
        accountTransactionComponentsPage.clickOnCreateButton();
        accountTransactionDialogPage = new AccountTransactionDialogPage();
        expect(accountTransactionDialogPage.getModalTitle()).toMatch(/sfWebClientApp.accountTransaction.home.createOrEditLabel/);
        accountTransactionDialogPage.close();
    });

   /* it('should create and save AccountTransactions', () => {
        accountTransactionComponentsPage.clickOnCreateButton();
        accountTransactionDialogPage.tranTypeSelectLastOption();
        accountTransactionDialogPage.setTranNumberInput('tranNumber');
        expect(accountTransactionDialogPage.getTranNumberInput()).toMatch('tranNumber');
        accountTransactionDialogPage.setReferenceNumberInput('referenceNumber');
        expect(accountTransactionDialogPage.getReferenceNumberInput()).toMatch('referenceNumber');
        accountTransactionDialogPage.setPostDateInput('2000-12-31');
        expect(accountTransactionDialogPage.getPostDateInput()).toMatch('2000-12-31');
        accountTransactionDialogPage.setDescriptionInput('description');
        expect(accountTransactionDialogPage.getDescriptionInput()).toMatch('description');
        accountTransactionDialogPage.setAmountInput('5');
        expect(accountTransactionDialogPage.getAmountInput()).toMatch('5');
        accountTransactionDialogPage.paymentMethodSelectLastOption();
        accountTransactionDialogPage.userSelectLastOption();
        accountTransactionDialogPage.financeAccountSelectLastOption();
        accountTransactionDialogPage.tranCategorySelectLastOption();
        accountTransactionDialogPage.save();
        expect(accountTransactionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AccountTransactionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-account-transaction div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AccountTransactionDialogPage {
    modalTitle = element(by.css('h4#myAccountTransactionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tranTypeSelect = element(by.css('select#field_tranType'));
    tranNumberInput = element(by.css('input#field_tranNumber'));
    referenceNumberInput = element(by.css('input#field_referenceNumber'));
    postDateInput = element(by.css('input#field_postDate'));
    descriptionInput = element(by.css('input#field_description'));
    amountInput = element(by.css('input#field_amount'));
    paymentMethodSelect = element(by.css('select#field_paymentMethod'));
    userSelect = element(by.css('select#field_user'));
    financeAccountSelect = element(by.css('select#field_financeAccount'));
    tranCategorySelect = element(by.css('select#field_tranCategory'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTranTypeSelect = function (tranType) {
        this.tranTypeSelect.sendKeys(tranType);
    };

    getTranTypeSelect = function () {
        return this.tranTypeSelect.element(by.css('option:checked')).getText();
    };

    tranTypeSelectLastOption = function () {
        this.tranTypeSelect.all(by.tagName('option')).last().click();
    };
    setTranNumberInput = function (tranNumber) {
        this.tranNumberInput.sendKeys(tranNumber);
    };

    getTranNumberInput = function () {
        return this.tranNumberInput.getAttribute('value');
    };

    setReferenceNumberInput = function (referenceNumber) {
        this.referenceNumberInput.sendKeys(referenceNumber);
    };

    getReferenceNumberInput = function () {
        return this.referenceNumberInput.getAttribute('value');
    };

    setPostDateInput = function (postDate) {
        this.postDateInput.sendKeys(postDate);
    };

    getPostDateInput = function () {
        return this.postDateInput.getAttribute('value');
    };

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    };

    setAmountInput = function (amount) {
        this.amountInput.sendKeys(amount);
    };

    getAmountInput = function () {
        return this.amountInput.getAttribute('value');
    };

    setPaymentMethodSelect = function (paymentMethod) {
        this.paymentMethodSelect.sendKeys(paymentMethod);
    };

    getPaymentMethodSelect = function () {
        return this.paymentMethodSelect.element(by.css('option:checked')).getText();
    };

    paymentMethodSelectLastOption = function () {
        this.paymentMethodSelect.all(by.tagName('option')).last().click();
    };
    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function () {
        return this.userSelect;
    };

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    financeAccountSelectLastOption = function () {
        this.financeAccountSelect.all(by.tagName('option')).last().click();
    };

    financeAccountSelectOption = function (option) {
        this.financeAccountSelect.sendKeys(option);
    };

    getFinanceAccountSelect = function () {
        return this.financeAccountSelect;
    };

    getFinanceAccountSelectedOption = function () {
        return this.financeAccountSelect.element(by.css('option:checked')).getText();
    };

    tranCategorySelectLastOption = function () {
        this.tranCategorySelect.all(by.tagName('option')).last().click();
    };

    tranCategorySelectOption = function (option) {
        this.tranCategorySelect.sendKeys(option);
    };

    getTranCategorySelect = function () {
        return this.tranCategorySelect;
    };

    getTranCategorySelectedOption = function () {
        return this.tranCategorySelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
