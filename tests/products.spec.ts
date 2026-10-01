import { test, expect } from '@playwright/test';
import { permanentUser } from '../permanent-user';

test.describe('products /search/pagination/sorting/filtration scenarios', () => {  
    
    test.beforeEach(async ({ page }) => {

        await page.goto('/auth/login')
        
        await page.getByLabel('Email address *').fill(permanentUser.email)
        await page.getByLabel('Password *').fill(permanentUser.password)

        await page.getByRole('button', {name: 'Login'}).click()
        await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible()        
        await page.getByRole('link', {name: 'Home'}).click()
    })
    
    test('successful search', {tag: '@other'}, async ({ page }) => {

        await page.getByLabel('Search').fill('cross')

        await page.getByRole('button', {name: 'Search '}).click()

        await expect(page.locator('[data-test="product-name"]').filter({hasText: 'cross'})).toBeVisible()

        await page.locator('[data-test="product-name"]').filter({hasText: 'cross'}).click()

        await expect(page.getByRole('heading', {name: 'Cross-head screws'})).toBeVisible()
    })

    test('successful pagination', {tag: '@other'}, async({ page }) => {
        const nextPageButton = page.locator('[data-test="pagination-next"]')
        await expect(nextPageButton.locator('..')).not.toHaveClass(/disabled/)

        const previousPageButton = page.locator('[data-test="pagination-prev"]')
        await expect(previousPageButton.locator('..')).toHaveClass(/disabled/)

        const products = page.locator('[data-test="product-name"]')
        const firstProduct = products.first()
        const productToBuy = products.filter({hasText: 'Adjustable Wrench'})

        let guard = 0

        await expect(firstProduct).toBeVisible()

        while (await productToBuy.isHidden() && guard < 4){
            const previousName = await firstProduct.innerText()
            await nextPageButton.click()
            await expect(firstProduct).not.toHaveText(previousName)
            guard++
        }

        await expect(productToBuy).toBeVisible()
    })

    test('successful filtration', {tag: '@other'}, async({ page }) => {

        const ecoBadge = page.locator('[data-test="eco-badge"]')
        const products = page.locator('a.card')
        const productsWithoutEcoBadge = products.filter({ hasNot: ecoBadge })

        await expect(productsWithoutEcoBadge).not.toHaveCount(0)

        const checkbox = page.getByLabel('Show only eco-friendly products')

        await expect(checkbox).not.toBeChecked()

        await checkbox.check()

        await expect(checkbox).toBeChecked()

        await expect(productsWithoutEcoBadge).toHaveCount(0)
        await expect(products).not.toHaveCount(0)
    })

    test('successful sorting', {tag: '@other'}, async({ page }) => {

        const firstProduct = page.locator('[data-test="product-name"]').filter({hasText: 'Combination Pliers'})

        await expect(firstProduct).toBeVisible()

        const currentSorting = await page.locator('[data-test="product-price"]').allInnerTexts()

        await page.locator('[data-test="sort"]').selectOption({label: 'Price (Low - High)'})

        await expect(firstProduct).not.toBeVisible()

        const afterSortingState = await page.locator('[data-test="product-price"]').allInnerTexts()

        expect(afterSortingState).not.toEqual(currentSorting)

        const cleanPrice = afterSortingState.map(t => parseFloat(t.replace('$', '')))

        const sortedCopy = [...cleanPrice].sort((a, b) => a - b);
        
        expect(cleanPrice).toEqual(sortedCopy)
    })

    test('empty search', {tag: '@negative'}, async({ page }) => {

        const firstProduct = page.locator('[data-test="product-name"]').first()
        await expect(firstProduct).toBeVisible()
        
        const currentState = await page.locator('[data-test="product-name"]').allInnerTexts()

        await page.getByLabel('Search').fill('')

        await page.getByRole('button', {name: 'Search '}).click()

        const newState = await page.locator('[data-test="product-name"]').allInnerTexts()

        expect(currentState).toEqual(newState)
    })
})