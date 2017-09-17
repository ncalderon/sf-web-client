import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('BankAccount e2e test', () => {

    let navBarPage: NavBarPage;
    let bankAccountDialogPage: BankAccountDialogPage;
    let bankAccountComponentsPage: BankAccountComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BankAccounts', () => {
        navBarPage.goToEntity('bank-account');
        bankAccountComponentsPage = new BankAccountComponentsPage();
        expect(bankAccountComponentsPage.getTitle()).toMatch(/sfWebClientApp.bankAccount.home.title/);

    });

    it('should load create BankAccount dialog', () => {
        bankAccountComponentsPage.clickOnCreateButton();
        bankAccountDialogPage = new BankAccountDialogPage();
        expect(bankAccountDialogPage.getModalTitle()).toMatch(/sfWebClientApp.bankAccount.home.createOrEditLabel/);
        bankAccountDialogPage.close();
    });

   /* it('should create and save BankAccounts', () => {
        bankAccountComponentsPage.clickOnCreateButton();
        bankAccountDialogPage.accountStatusSelectLastOption();
        bankAccountDialogPage.accountTypeSelectLastOption();
        bankAccountDialogPage.setAccountNumberInput('accountNumber');
        expect(bankAccountDialogPage.getAccountNumberInput()).toMatch('accountNumber');
        bankAccountDialogPage.setNameInput('name');
        expect(bankAccountDialogPage.getNameInput()).toMatch('name');
        bankAccountDialogPage.setDescriptionInput('description');
        expect(bankAccountDialogPage.getDescriptionInput()).toMatch('description');
        bankAccountDialogPage.setBalanceInput('5');
        expect(bankAccountDialogPage.getBalanceInput()).toMatch('5');
        bankAccountDialogPage.userSelectLastOption();
        bankAccountDialogPage.bankSelectLastOption();
        bankAccountDialogPage.save();
        expect(bankAccountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BankAccountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bank-account div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BankAccountDialogPage {
    modalTitle = element(by.css('h4#myBankAccountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    accountStatusSelect = element(by.css('select#field_accountStatus'));
    accountTypeSelect = element(by.css('select#field_accountType'));
    accountNumberInput = element(by.css('input#field_accountNumber'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    balanceInput = element(by.css('input#field_balance'));
    userSelect = element(by.css('select#field_user'));
    bankSelect = element(by.css('select#field_bank'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAccountStatusSelect = function (accountStatus) {
        this.accountStatusSelect.sendKeys(accountStatus);
    }

    getAccountStatusSelect = function () {
        return this.accountStatusSelect.element(by.css('option:checked')).getText();
    }

    accountStatusSelectLastOption = function () {
        this.accountStatusSelect.all(by.tagName('option')).last().click();
    }
    setAccountTypeSelect = function (accountType) {
        this.accountTypeSelect.sendKeys(accountType);
    }

    getAccountTypeSelect = function () {
        return this.accountTypeSelect.element(by.css('option:checked')).getText();
    }

    accountTypeSelectLastOption = function () {
        this.accountTypeSelect.all(by.tagName('option')).last().click();
    }
    setAccountNumberInput = function (accountNumber) {
        this.accountNumberInput.sendKeys(accountNumber);
    }

    getAccountNumberInput = function () {
        return this.accountNumberInput.getAttribute('value');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setBalanceInput = function (balance) {
        this.balanceInput.sendKeys(balance);
    }

    getBalanceInput = function () {
        return this.balanceInput.getAttribute('value');
    }

    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function () {
        return this.userSelect;
    }

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    bankSelectLastOption = function () {
        this.bankSelect.all(by.tagName('option')).last().click();
    }

    bankSelectOption = function (option) {
        this.bankSelect.sendKeys(option);
    }

    getBankSelect = function () {
        return this.bankSelect;
    }

    getBankSelectedOption = function () {
        return this.bankSelect.element(by.css('option:checked')).getText();
    }

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
