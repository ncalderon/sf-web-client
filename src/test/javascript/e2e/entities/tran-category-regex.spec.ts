import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('TranCategoryRegex e2e test', () => {

    let navBarPage: NavBarPage;
    let tranCategoryRegexDialogPage: TranCategoryRegexDialogPage;
    let tranCategoryRegexComponentsPage: TranCategoryRegexComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TranCategoryRegexes', () => {
        navBarPage.goToEntity('tran-category-regex');
        tranCategoryRegexComponentsPage = new TranCategoryRegexComponentsPage();
        expect(tranCategoryRegexComponentsPage.getTitle()).toMatch(/sfWebClientApp.tranCategoryRegex.home.title/);

    });

    it('should load create TranCategoryRegex dialog', () => {
        tranCategoryRegexComponentsPage.clickOnCreateButton();
        tranCategoryRegexDialogPage = new TranCategoryRegexDialogPage();
        expect(tranCategoryRegexDialogPage.getModalTitle()).toMatch(/sfWebClientApp.tranCategoryRegex.home.createOrEditLabel/);
        tranCategoryRegexDialogPage.close();
    });

    it('should create and save TranCategoryRegexes', () => {
        tranCategoryRegexComponentsPage.clickOnCreateButton();
        tranCategoryRegexDialogPage.setNameInput('name');
        expect(tranCategoryRegexDialogPage.getNameInput()).toMatch('name');
        tranCategoryRegexDialogPage.setDescriptionInput('description');
        expect(tranCategoryRegexDialogPage.getDescriptionInput()).toMatch('description');
        tranCategoryRegexDialogPage.setRegexInput('regex');
        expect(tranCategoryRegexDialogPage.getRegexInput()).toMatch('regex');
        tranCategoryRegexDialogPage.userSelectLastOption();
        tranCategoryRegexDialogPage.save();
        expect(tranCategoryRegexDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TranCategoryRegexComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tran-category-regex div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TranCategoryRegexDialogPage {
    modalTitle = element(by.css('h4#myTranCategoryRegexLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    regexInput = element(by.css('input#field_regex'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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

    setRegexInput = function (regex) {
        this.regexInput.sendKeys(regex);
    }

    getRegexInput = function () {
        return this.regexInput.getAttribute('value');
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
