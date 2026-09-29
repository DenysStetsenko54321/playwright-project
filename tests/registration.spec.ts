import { test, expect } from '@playwright/test';
import { user } from '../test-data';

  
test.describe('registration scenarios', () => {

  test.beforeEach(async({ page }) => {
    await page.goto('');

    await page.getByRole('link', {name: 'Sign in'}).click()

    await page.getByLabel('Register your account').click()
  })

  test('street, city, state autofilling', { tag: '@other' }, async({ page }) => {

    const responsePromise = page.waitForResponse(resp =>
      resp.url().includes('/postcode') && resp.status() === 200);

    await page.getByLabel('Country').selectOption({ label: 'Antarctica' })
    await page.getByLabel('Postal code').fill(user.postalCode)
    await page.getByLabel('House number').fill(user.houseNumber)
    await page.getByLabel('Phone').fill('1234567890')

    const response = await responsePromise;
    const body = await response.json()
    
    expect(body.street).not.toBe('')
    expect(body.city).not.toBe('')
    expect(body.state).not.toBe('')
  })

  test('sign up with no email', { tag: '@negative' }, async ({ page }) => {

    await page.getByLabel('First name').fill(user.name)
    await page.getByLabel('Last name').fill(user.secondName)
    await page.getByLabel('Date of Birth').fill('1999-12-31')
    await page.getByLabel('Country').selectOption({ label: 'Antarctica' })
    await page.getByLabel('Postal code').fill(user.postalCode)
    await page.getByLabel('House number').fill(user.houseNumber)
    await page.getByLabel('Phone').fill('1234567890')
    await page.getByLabel('Email address').fill(user.email)

    const passwordError = page.getByRole('alert').filter({hasText: 'Password is required'});

    await expect(passwordError).toBeHidden()

    await page.getByRole('button', {name: 'Register'}).click()

    await expect(passwordError).toBeVisible()
  })

  test('sign up with occupied email', { tag: '@negative' }, async({ page }) => {
    await page.getByLabel('First name').fill(user.name)
    await page.getByLabel('Last name').fill(user.secondName)
    await page.getByLabel('Date of Birth').fill('1999-12-31')
    await page.getByLabel('Country').selectOption({ label: 'Antarctica' })
    await page.getByLabel('Postal code').fill(user.postalCode)
    await page.getByLabel('House number').fill(user.houseNumber)
    await page.getByLabel('Phone').fill('1234567890')
    await page.getByLabel('Email address').fill('customer@practicesoftwaretesting.com')
    await page.getByLabel('Password').pressSequentially(user.password, { delay: 100 })

    const emailError = page.locator('[data-test="register-error"]').filter({hasText: 'A customer with this email address already exists.'});

    await expect(emailError).toBeHidden()

    await page.getByRole('button', {name: 'Register'}).click()

    await expect(emailError).toBeVisible()
  })
})