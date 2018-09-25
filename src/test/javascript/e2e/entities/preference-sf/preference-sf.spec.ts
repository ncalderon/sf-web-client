/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PreferenceComponentsPage, PreferenceDeleteDialog, PreferenceUpdatePage } from './preference-sf.page-object';

const expect = chai.expect;

describe('Preference e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let preferenceUpdatePage: PreferenceUpdatePage;
    let preferenceComponentsPage: PreferenceComponentsPage;
    let preferenceDeleteDialog: PreferenceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Preferences', async () => {
        await navBarPage.goToEntity('preference-sf');
        preferenceComponentsPage = new PreferenceComponentsPage();
        expect(await preferenceComponentsPage.getTitle()).to.eq('sfwebApp.preference.home.title');
    });

    it('should load create Preference page', async () => {
        await preferenceComponentsPage.clickOnCreateButton();
        preferenceUpdatePage = new PreferenceUpdatePage();
        expect(await preferenceUpdatePage.getPageTitle()).to.eq('sfwebApp.preference.home.createOrEditLabel');
        await preferenceUpdatePage.cancel();
    });

    it('should create and save Preferences', async () => {
        const nbButtonsBeforeCreate = await preferenceComponentsPage.countDeleteButtons();

        await preferenceComponentsPage.clickOnCreateButton();
        await preferenceUpdatePage.setNameInput('name');
        expect(await preferenceUpdatePage.getNameInput()).to.eq('name');
        await preferenceUpdatePage.setValueInput('value');
        expect(await preferenceUpdatePage.getValueInput()).to.eq('value');
        await preferenceUpdatePage.save();
        expect(await preferenceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await preferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Preference', async () => {
        const nbButtonsBeforeDelete = await preferenceComponentsPage.countDeleteButtons();
        await preferenceComponentsPage.clickOnLastDeleteButton();

        preferenceDeleteDialog = new PreferenceDeleteDialog();
        expect(await preferenceDeleteDialog.getDialogTitle()).to.eq('sfwebApp.preference.delete.question');
        await preferenceDeleteDialog.clickOnConfirmButton();

        expect(await preferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
