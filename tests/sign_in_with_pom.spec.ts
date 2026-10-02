
/* This test with POM and fixture was added just for the sake of preparing for an interview.
To see how it works and be able to answer on possible interviewer questions */

import { test, expect } from '../fixtures/loginFixture';
import { permanentUser } from '../permanent-user';

test('successful sign in', async ({ loginPage, page }) => {

    await loginPage.goto();

    await expect(loginPage.heading).toBeVisible();

    await loginPage.login(permanentUser.email, permanentUser.password);

    const myAccount = page.getByRole('heading', { name: 'My account' });
    const myName = page.locator('app-header [data-test="nav-menu"]');
    const lockedUser = page.locator('[data-test="login-error"]');

    const isAccountVisible = await myAccount.isVisible();

    const isCorrectName =
        await myName.isVisible() &&
        await myName.innerText() === `${permanentUser.name} ${permanentUser.secondName}`;

//     if (isAccountVisible && isCorrectName) {
//         await expect(page).toHaveURL('/account');
//     } else {
//         await expect(lockedUser).toBeVisible();
//         await expect(lockedUser).toHaveText('Account locked, too many failed attempts. Please contact the administrator.');
//     }

    await expect(page).toHaveURL('/account')
    await expect(myName).toHaveText(`${permanentUser.name} ${permanentUser.secondName}`)
    await expect(myAccount).toBeVisible()
});