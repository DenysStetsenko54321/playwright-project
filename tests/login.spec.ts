import { test, expect } from '@playwright/test';
import { user } from '../test-data';
import { permanentUser } from '../permanent-user';

test.describe('sign in scenarios', { tag: '@other' }, () => {

    test.beforeEach(async({ page }) => {
        await page.goto('/auth/login')

        await page.getByLabel('Email address *').fill(user.email)
        await page.getByLabel('Password *').fill(user.password)
    })

    test('successful sign in with uppercase email', {tag: '@other'}, async({ page }) => {
        await page.getByLabel('Email address *').fill(permanentUser.email.toUpperCase())
        await page.getByLabel('Password *').fill(permanentUser.password)

        await page.getByRole('button', {name: 'Login'}).click()


        await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible()
        await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible()
        await expect(page.locator('app-header .navbar-brand')).toHaveScreenshot('toolshop-logo.png', {maxDiffPixels: 1})
        await expect(page.locator('app-header [data-test="nav-menu"]')).toHaveText(`${permanentUser.name} ${permanentUser.secondName}`)
        await expect(page).toHaveURL('/account')
    })

    test('show pasword button correctness', {tag: '@other'}, async ({ page }) => {

        const passwordInput = page.locator('[data-test="password"]')

        await passwordInput.inputValue()
        
        await expect(passwordInput).toHaveAttribute('type', 'password')

        await page.locator('.input-group .btn').click()

        await expect(passwordInput).toHaveAttribute('type', 'text')
    })

    test('sign in with empty email', {tag: '@negative'}, async({ page }) => {
        await page.getByLabel('Email address *').clear()

        const emailError = page.locator('[data-test="email-error"]')

        await expect(emailError).toBeHidden()

        await page.getByRole('button', {name: 'Login'}).click()

        await expect(emailError).toBeVisible()
        await expect(emailError).toHaveText('Email is required')
    })

    test('sign in with password', {tag: '@negative'}, async({ page }) => {
        await page.getByLabel('Password *').clear()

        const passwordError = page.locator('[data-test="password-error"]')

        await expect(passwordError).toBeHidden()

        await page.getByRole('button', {name: 'Login'}).click()

        await expect(passwordError).toBeVisible()
        await expect(passwordError).toHaveText('Password is required')
    })
})