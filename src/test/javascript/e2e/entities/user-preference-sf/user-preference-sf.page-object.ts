import { element, by, ElementFinder } from 'protractor';

export class UserPreferenceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('sf-user-preference-sf div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserPreferenceUpdatePage {
    pageTitle = element(by.id('sf-user-preference-sf-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    valueInput = element(by.id('field_value'));
    userSelect = element(by.id('field_user'));
    preferenceSelect = element(by.id('field_preference'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setValueInput(value) {
        await this.valueInput.sendKeys(value);
    }

    async getValueInput() {
        return this.valueInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async preferenceSelectLastOption() {
        await this.preferenceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async preferenceSelectOption(option) {
        await this.preferenceSelect.sendKeys(option);
    }

    getPreferenceSelect(): ElementFinder {
        return this.preferenceSelect;
    }

    async getPreferenceSelectedOption() {
        return this.preferenceSelect.element(by.css('option:checked')).getText();
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
