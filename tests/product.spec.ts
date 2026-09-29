// import { test, expect } from '@playwright/test';
// import { readFileSync, writeFileSync } from 'fs'

// test.use({
//   storageState: 'playwright/.auth/selected_product.json'
// });

// test('successful product addition to cart', async({ page }) => {

//   const user = JSON.parse(readFileSync('test-user.json', 'utf8'));
//   const product = JSON.parse(readFileSync('product-url.json', 'utf8'));

//   await page.goto(product.url)

//   await expect(page.getByRole('heading', {name: 'Cross-head screws'})).toBeVisible()

// })