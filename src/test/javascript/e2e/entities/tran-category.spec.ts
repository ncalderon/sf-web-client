import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('TranCategory e2e test', () => {

    let navBarPage: NavBarPage;
    let tranCategoryDialogPage: TranCategoryDialogPage;
    let tranCategoryComponentsPage: TranCategoryComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TranCategories', () => {
        navBarPage.goToEntity('tran-category');
        tranCategoryComponentsPage = new TranCategoryComponentsPage();
        expect(tranCategoryComponentsPage.getTitle()).toMatch(/sfWebClientApp.tranCategory.home.title/);

    });

    it('should load create TranCategory dialog', () => {
        tranCategoryComponentsPage.clickOnCreateButton();
        tranCategoryDialogPage = new TranCategoryDialogPage();
        expect(tranCategoryDialogPage.getModalTitle()).toMatch(/sfWebClientApp.tranCategory.home.createOrEditLabel/);
        tranCategoryDialogPage.close();
    });

    it('should create and save TranCategories', () => {
        tranCategoryComponentsPage.clickOnCreateButton();
        tranCategoryDialogPage.setNameInput('name');
        expect(tranCategoryDialogPage.getNameInput()).toMatch('name');
        tranCategoryDialogPage.setDescriptionInput('description');
        expect(tranCategoryDialogPage.getDescriptionInput()).toMatch('description');
        tranCategoryDialogPage.userSelectLastOption();
        tranCategoryDialogPage.tranCategoryRegexSelectLastOption();
        tranCategoryDialogPage.save();
        expect(tranCategoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TranCategoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tran-category div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TranCategoryDialogPage {
    modalTitle = element(by.css('h4#myTranCategoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    userSelect = element(by.css('select#field_user'));
    tranCategoryRegexSelect = element(by.css('select#field_tranCategoryRegex'));

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

    tranCategoryRegexSelectLastOption = function () {
        this.tranCategoryRegexSelect.all(by.tagName('option')).last().click();
    }

    tranCategoryRegexSelectOption = function (option) {
        this.tranCategoryRegexSelect.sendKeys(option);
    }

    getTranCategoryRegexSelect = function () {
        return this.tranCategoryRegexSelect;
    }

    getTranCategoryRegexSelectedOption = function () {
        return this.tranCategoryRegexSelect.element(by.css('option:checked')).getText();
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
