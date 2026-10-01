import { test, expect } from '@playwright/test';
import { permanentUser } from '../permanent-user';

test.describe('product selection scenarios', () => {   
    test.beforeEach(async ({page}) => {
        await page.goto('/auth/login')
        
        await page.getByLabel('Email address *').fill(permanentUser.email)
        await page.getByLabel('Password *').fill(permanentUser.password)

        await page.getByRole('button', {name: 'Login'}).click()
        await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible()        
        await page.getByRole('link', {name: 'Home'}).click()

        const firstProduct = page.locator('[data-test="product-name"]').first()
        await expect(firstProduct).toBeVisible()
    }) 
    test('successful product addition to cart', async({ page }) => {

    })
})