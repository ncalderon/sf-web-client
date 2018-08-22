import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserPreferenceComponentsPage, UserPreferenceUpdatePage } from './user-preference-sf.page-object';

describe('UserPreference e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userPreferenceUpdatePage: UserPreferenceUpdatePage;
    let userPreferenceComponentsPage: UserPreferenceComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserPreferences', async () => {
        await navBarPage.goToEntity('user-preference-sf');
        userPreferenceComponentsPage = new UserPreferenceComponentsPage();
        expect(await userPreferenceComponentsPage.getTitle()).toMatch(/sfwebApp.userPreference.home.title/);
    });

    it('should load create UserPreference page', async () => {
        await userPreferenceComponentsPage.clickOnCreateButton();
        userPreferenceUpdatePage = new UserPreferenceUpdatePage();
        expect(await userPreferenceUpdatePage.getPageTitle()).toMatch(/sfwebApp.userPreference.home.createOrEditLabel/);
        await userPreferenceUpdatePage.cancel();
    });

    /* it('should create and save UserPreferences', async () => {
        await userPreferenceComponentsPage.clickOnCreateButton();
        await userPreferenceUpdatePage.setValueInput('value');
        expect(await userPreferenceUpdatePage.getValueInput()).toMatch('value');
        await userPreferenceUpdatePage.userSelectLastOption();
        await userPreferenceUpdatePage.preferenceSelectLastOption();
        await userPreferenceUpdatePage.save();
        expect(await userPreferenceUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
