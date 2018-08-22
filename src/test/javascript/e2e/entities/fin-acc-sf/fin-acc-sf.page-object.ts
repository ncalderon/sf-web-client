import { element, by, ElementFinder } from 'protractor';

export class FinAccComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('sf-fin-acc-sf div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FinAccUpdatePage {
    pageTitle = element(by.id('sf-fin-acc-sf-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    statusSelect = element(by.id('field_status'));
    accNumInput = element(by.id('field_accNum'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    balanceInput = element(by.id('field_balance'));
    isCreditCardInput = element(by.id('field_isCreditCard'));
    dueDateInput = element(by.id('field_dueDate'));
    closingDateInput = element(by.id('field_closingDate'));
    userSelect = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setAccNumInput(accNum) {
        await this.accNumInput.sendKeys(accNum);
    }

    async getAccNumInput() {
        return this.accNumInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setBalanceInput(balance) {
        await this.balanceInput.sendKeys(balance);
    }

    async getBalanceInput() {
        return this.balanceInput.getAttribute('value');
    }

    getIsCreditCardInput() {
        return this.isCreditCardInput;
    }
    async setDueDateInput(dueDate) {
        await this.dueDateInput.sendKeys(dueDate);
    }

    async getDueDateInput() {
        return this.dueDateInput.getAttribute('value');
    }

    async setClosingDateInput(closingDate) {
        await this.closingDateInput.sendKeys(closingDate);
    }

    async getClosingDateInput() {
        return this.closingDateInput.getAttribute('value');
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
