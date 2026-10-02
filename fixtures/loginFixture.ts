
/* Fixure was added just for the sake of preparing for an interview.
To see how it works and be able to answer on possible interviewer questions */

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },
});

export { expect } from '@playwright/test';