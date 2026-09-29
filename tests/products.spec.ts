// import { test, expect } from '@playwright/test';
// import { writeFileSync, readFileSync } from 'fs'

// test.use({
//   storageState: 'playwright/.auth/logged_user.json'
// });

// test('successful search', async ({ page }) => {

//     const user = JSON.parse(readFileSync('test-user.json', 'utf8'));

//     await page.goto('/account') 
        
//     await expect(page.locator('app-header [data-test="nav-menu"]')).toHaveText(`${user.name} ${user.secondName}`)

//     await page.getByRole('link', {name: 'Home'}).click()

//     await expect(page.locator('app-overview [alt="Banner"]')).toHaveScreenshot('banner.png', {maxDiffPixels: 1})

//     await page.getByLabel('Search').fill('cross')

//     await page.getByRole('button', {name: 'Search '}).click()

//     await expect(page.locator('[data-test="product-name"]').filter({hasText: 'cross'})).toBeVisible()

//     await page.locator('[data-test="product-name"]').filter({hasText: 'cross'}).click()

//     await expect(page.getByRole('heading', {name: 'Cross-head screws'})).toBeVisible()

//     writeFileSync('product-url.json', JSON.stringify({url: page.url()}));

//     await page.context().storageState({path: 'playwright/.auth/selected_product.json'})
// })