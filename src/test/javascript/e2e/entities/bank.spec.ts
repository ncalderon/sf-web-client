import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Bank e2e test', () => {

    let navBarPage: NavBarPage;
    let bankDialogPage: BankDialogPage;
    let bankComponentsPage: BankComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Banks', () => {
        navBarPage.goToEntity('bank');
        bankComponentsPage = new BankComponentsPage();
        expect(bankComponentsPage.getTitle()).toMatch(/sfWebClientApp.bank.home.title/);

    });

    it('should load create Bank dialog', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage = new BankDialogPage();
        expect(bankDialogPage.getModalTitle()).toMatch(/sfWebClientApp.bank.home.createOrEditLabel/);
        bankDialogPage.close();
    });

    it('should create and save Banks', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage.setNameInput('name');
        expect(bankDialogPage.getNameInput()).toMatch('name');
        bankDialogPage.setDescriptionInput('description');
        expect(bankDialogPage.getDescriptionInput()).toMatch('description');
        bankDialogPage.save();
        expect(bankDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BankComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bank div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BankDialogPage {
    modalTitle = element(by.css('h4#myBankLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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
