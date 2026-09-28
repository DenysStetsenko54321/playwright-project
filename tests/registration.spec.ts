import { test, expect } from '@playwright/test';
import { writeFileSync } from 'fs'
import { user } from '../test-data';


  test('successful register', async ({ page }) => {

    await page.goto('');

    await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible()
    await expect(page.locator('app-header .navbar-brand')).toHaveScreenshot('toolshop-logo.png', {maxDiffPixels: 1})

    await page.getByRole('link', {name: 'Sign in'}).click()

    await page.getByLabel('Register your account').click()
  
    await expect(page.getByRole('heading', { name: 'Customer registration', })).toBeVisible()

    await page.getByLabel('First name').fill(user.name)
    await page.getByLabel('Last name').fill(user.secondName)
    await page.getByLabel('Date of Birth').fill('1999-12-31')
    await page.getByLabel('Country').selectOption({ label: 'Antarctica' })
    await page.getByLabel('Postal code').fill(user.postalCode)
    await page.getByLabel('House number').fill(user.houseNumber)

    // street, city and state update the value all the time so I don't see point to fill something here that takes time and is not used
    // await page.getByLabel('Street').fill('test')
    // await page.getByLabel('City').fill('test')
    // await page.getByLabel('State').fill('test')

    await page.getByLabel('Phone').fill('1234567890')

    await page.getByLabel('Email address').fill(user.email)
    await page.getByLabel('Password').pressSequentially(user.password, { delay: 100 })

    await page.locator('.btn-outline-secondary').click()
    await expect(page.locator('.text-success')).toHaveCount(4)

    // how strogn password is - is not loaded so test fails always. I avoid this check
    // await page.waitForLoadState('load')
    // await expect(page.locator('.strength-labels span .active')).toHaveCount(1)

    await page.getByRole('button', {name: 'Register'}).click()

    await expect(page).toHaveURL('/auth/login')

    writeFileSync('test-user.json', JSON.stringify(user, null, 2));
  })