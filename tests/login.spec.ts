// import { test, expect } from '@playwright/test';
// import { readFileSync } from 'fs'

// test('successful login', async ({ page }) => {
    
//     const user = JSON.parse(readFileSync('test-user.json', 'utf8'));

//     await page.goto('/auth/login')

//     await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

//     await page.getByLabel('Email address *').fill(user.email)
//     await page.getByLabel('Password *').fill(user.password)

//     await page.getByRole('button', {name: 'Login'}).click()

//     await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible()
//     await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible()
//     await expect(page.locator('app-header .navbar-brand')).toHaveScreenshot('toolshop-logo.png', {maxDiffPixels: 1})
//     await expect(page.locator('app-header [data-test="nav-menu"]')).toHaveText(`${user.name} ${user.secondName}`)
//     await expect(page).toHaveURL('/account')

//     await page.context().storageState({path: 'playwright/.auth/logged_user.json'})
//   })