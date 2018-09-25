import { element, by, ElementFinder } from 'protractor';

export class TranEntryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('sf-tran-entry-sf div table .btn-danger'));
    title = element.all(by.css('sf-tran-entry-sf div h2#page-heading span')).first();

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

export class TranEntryUpdatePage {
    pageTitle = element(by.id('sf-tran-entry-sf-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tranTypeSelect = element(by.id('field_tranType'));
    tranNumInput = element(by.id('field_tranNum'));
    refNumInput = element(by.id('field_refNum'));
    postDateInput = element(by.id('field_postDate'));
    descriptionInput = element(by.id('field_description'));
    amountInput = element(by.id('field_amount'));
    ccyValInput = element(by.id('field_ccyVal'));
    ccyCodeInput = element(by.id('field_ccyCode'));
    paymentMethodSelect = element(by.id('field_paymentMethod'));
    userSelect = element(by.id('field_user'));
    finAccSelect = element(by.id('field_finAcc'));
    tranCategorySelect = element(by.id('field_tranCategory'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTranTypeSelect(tranType) {
        await this.tranTypeSelect.sendKeys(tranType);
    }

    async getTranTypeSelect() {
        return this.tranTypeSelect.element(by.css('option:checked')).getText();
    }

    async tranTypeSelectLastOption() {
        await this.tranTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setTranNumInput(tranNum) {
        await this.tranNumInput.sendKeys(tranNum);
    }

    async getTranNumInput() {
        return this.tranNumInput.getAttribute('value');
    }

    async setRefNumInput(refNum) {
        await this.refNumInput.sendKeys(refNum);
    }

    async getRefNumInput() {
        return this.refNumInput.getAttribute('value');
    }

    async setPostDateInput(postDate) {
        await this.postDateInput.sendKeys(postDate);
    }

    async getPostDateInput() {
        return this.postDateInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setCcyValInput(ccyVal) {
        await this.ccyValInput.sendKeys(ccyVal);
    }

    async getCcyValInput() {
        return this.ccyValInput.getAttribute('value');
    }

    async setCcyCodeInput(ccyCode) {
        await this.ccyCodeInput.sendKeys(ccyCode);
    }

    async getCcyCodeInput() {
        return this.ccyCodeInput.getAttribute('value');
    }

    async setPaymentMethodSelect(paymentMethod) {
        await this.paymentMethodSelect.sendKeys(paymentMethod);
    }

    async getPaymentMethodSelect() {
        return this.paymentMethodSelect.element(by.css('option:checked')).getText();
    }

    async paymentMethodSelectLastOption() {
        await this.paymentMethodSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

    async finAccSelectLastOption() {
        await this.finAccSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async finAccSelectOption(option) {
        await this.finAccSelect.sendKeys(option);
    }

    getFinAccSelect(): ElementFinder {
        return this.finAccSelect;
    }

    async getFinAccSelectedOption() {
        return this.finAccSelect.element(by.css('option:checked')).getText();
    }

    async tranCategorySelectLastOption() {
        await this.tranCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async tranCategorySelectOption(option) {
        await this.tranCategorySelect.sendKeys(option);
    }

    getTranCategorySelect(): ElementFinder {
        return this.tranCategorySelect;
    }

    async getTranCategorySelectedOption() {
        return this.tranCategorySelect.element(by.css('option:checked')).getText();
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

export class TranEntryDeleteDialog {
    private dialogTitle = element(by.id('sf-delete-tranEntry-heading'));
    private confirmButton = element(by.id('sf-confirm-delete-tranEntry'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
