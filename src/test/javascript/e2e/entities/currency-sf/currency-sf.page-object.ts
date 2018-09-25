import { element, by, ElementFinder } from 'protractor';

export class CurrencyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('sf-currency-sf div table .btn-danger'));
    title = element.all(by.css('sf-currency-sf div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CurrencyUpdatePage {
    pageTitle = element(by.id('sf-currency-sf-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    nameInput = element(by.id('field_name'));
    isDefaultInput = element(by.id('field_isDefault'));
    jsonvalInput = element(by.id('field_jsonval'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    getIsDefaultInput() {
        return this.isDefaultInput;
    }
    async setJsonvalInput(jsonval) {
        await this.jsonvalInput.sendKeys(jsonval);
    }

    async getJsonvalInput() {
        return this.jsonvalInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CurrencyDeleteDialog {
    private dialogTitle = element(by.id('sf-delete-currency-heading'));
    private confirmButton = element(by.id('sf-confirm-delete-currency'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
