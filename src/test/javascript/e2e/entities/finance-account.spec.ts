import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('FinanceAccount e2e test', () => {

    let navBarPage: NavBarPage;
    let financeAccountDialogPage: FinanceAccountDialogPage;
    let financeAccountComponentsPage: FinanceAccountComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load FinanceAccounts', () => {
        navBarPage.goToEntity('finance-account');
        financeAccountComponentsPage = new FinanceAccountComponentsPage();
        expect(financeAccountComponentsPage.getTitle()).toMatch(/sfWebClientApp.financeAccount.home.title/);

    });

    it('should load create FinanceAccount dialog', () => {
        financeAccountComponentsPage.clickOnCreateButton();
        financeAccountDialogPage = new FinanceAccountDialogPage();
        expect(financeAccountDialogPage.getModalTitle()).toMatch(/sfWebClientApp.financeAccount.home.createOrEditLabel/);
        financeAccountDialogPage.close();
    });

    it('should create and save FinanceAccounts', () => {
        financeAccountComponentsPage.clickOnCreateButton();
        financeAccountDialogPage.accountStatusSelectLastOption();
        financeAccountDialogPage.setAccountNumberInput('accountNumber');
        expect(financeAccountDialogPage.getAccountNumberInput()).toMatch('accountNumber');
        financeAccountDialogPage.setNameInput('name');
        expect(financeAccountDialogPage.getNameInput()).toMatch('name');
        financeAccountDialogPage.setDescriptionInput('description');
        expect(financeAccountDialogPage.getDescriptionInput()).toMatch('description');
        financeAccountDialogPage.setBalanceInput('5');
        expect(financeAccountDialogPage.getBalanceInput()).toMatch('5');
        financeAccountDialogPage.getIsCreditCardInput().isSelected().then(function (selected) {
            if (selected) {
                financeAccountDialogPage.getIsCreditCardInput().click();
                expect(financeAccountDialogPage.getIsCreditCardInput().isSelected()).toBeFalsy();
            } else {
                financeAccountDialogPage.getIsCreditCardInput().click();
                expect(financeAccountDialogPage.getIsCreditCardInput().isSelected()).toBeTruthy();
            }
        });
        financeAccountDialogPage.setDueDateInput('2000-12-31');
        expect(financeAccountDialogPage.getDueDateInput()).toMatch('2000-12-31');
        financeAccountDialogPage.setClosingDateInput('2000-12-31');
        expect(financeAccountDialogPage.getClosingDateInput()).toMatch('2000-12-31');
        financeAccountDialogPage.userSelectLastOption();
        financeAccountDialogPage.save();
        expect(financeAccountDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FinanceAccountComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-finance-account div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FinanceAccountDialogPage {
    modalTitle = element(by.css('h4#myFinanceAccountLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    accountStatusSelect = element(by.css('select#field_accountStatus'));
    accountNumberInput = element(by.css('input#field_accountNumber'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    balanceInput = element(by.css('input#field_balance'));
    isCreditCardInput = element(by.css('input#field_isCreditCard'));
    dueDateInput = element(by.css('input#field_dueDate'));
    closingDateInput = element(by.css('input#field_closingDate'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAccountStatusSelect = function (accountStatus) {
        this.accountStatusSelect.sendKeys(accountStatus);
    };

    getAccountStatusSelect = function () {
        return this.accountStatusSelect.element(by.css('option:checked')).getText();
    };

    accountStatusSelectLastOption = function () {
        this.accountStatusSelect.all(by.tagName('option')).last().click();
    };
    setAccountNumberInput = function (accountNumber) {
        this.accountNumberInput.sendKeys(accountNumber);
    };

    getAccountNumberInput = function () {
        return this.accountNumberInput.getAttribute('value');
    };

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    };

    setBalanceInput = function (balance) {
        this.balanceInput.sendKeys(balance);
    };

    getBalanceInput = function () {
        return this.balanceInput.getAttribute('value');
    };

    getIsCreditCardInput = function () {
        return this.isCreditCardInput;
    };
    setDueDateInput = function (dueDate) {
        this.dueDateInput.sendKeys(dueDate);
    };

    getDueDateInput = function () {
        return this.dueDateInput.getAttribute('value');
    };

    setClosingDateInput = function (closingDate) {
        this.closingDateInput.sendKeys(closingDate);
    };

    getClosingDateInput = function () {
        return this.closingDateInput.getAttribute('value');
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
