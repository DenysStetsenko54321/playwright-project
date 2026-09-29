// import { test, expect } from '@playwright/test';
// import { readFileSync } from 'fs'

// test.use({
//   storageState: 'playwright/.auth/user.json'
// });

// test('successful checkout - logged in user', { tag: '@e2e' }, async ({ page }) => {
    
//   const user = JSON.parse(readFileSync('test-user.json', 'utf8'));
    
//   await page.goto('/account') 

//   // await page.getByLabel('Email address *').fill(user.email)
//   // await page.getByLabel('Password *').fill(user.password)

//   //await page.getByRole('button', {name: 'Login'}).click()
    
//   await expect(page.locator('app-header [data-test="nav-menu"]')).toHaveText(`${user.name} ${user.secondName}`)

//   await page.getByRole('link', {name: 'Home'}).click()

//   const nextPageButton = page.locator('[data-test="pagination-next"]')
//   await expect(nextPageButton).toBeEnabled()

//   // button itself has now disabled attribute, it's needed to go up to parent (..) and assert that it has class disabled. I don't do this
//   // const previousPageButton = page.locator('[data-test="pagination-prev"]')
//   // await expect(previousPageButton).toBeDisabled()

//   const products = page.locator('[data-test="product-name"]')
//   const firstProduct = products.first()
//   const productToBuy = products.filter({hasText: 'Adjustable Wrench'})

//   let guard = 0

//   await expect(firstProduct).toBeVisible()

//   while (await productToBuy.isHidden() && guard < 4){
//     const previousName = await firstProduct.innerText()
//     await nextPageButton.click()
//     await expect(firstProduct).not.toHaveText(previousName)
//     guard++
//   }

//   await expect(productToBuy).toBeVisible()
//   await productToBuy.click()
    
//   const productName = (await productToBuy.innerText()).trim()

//   await expect(page.getByRole('heading', {name: 'Adjustable Wrench'})).toBeVisible()

//   const price = (await page.locator('[data-test="unit-price"]').innerText()).trim()
//   const quantity = await page.locator('[data-test="quantity"]').inputValue()

//   const cart = page.locator('.nav-item [aria-label="cart"]')

//   await expect(cart).toBeHidden()
//   await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeHidden()

//   await page.getByRole('button', {name: 'Add to cart'}).click()

//   await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeVisible()
//   await expect(cart).toBeVisible()
//   await expect(cart).toHaveText('1')
//   await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeHidden({timeout: 10000}) /*this one takes more than default 5sec*/
//   await cart.click()

//   const cartProduct = (await page.locator('[data-test="product-title"]').innerText()).trim()
//   const cartQuantity = await page.locator('[data-test="product-quantity"]').inputValue()
//   const cartPrice = (await page.locator('[data-test="product-price"]').innerText()).replace('$', '').trim()
//   const total = (await page.locator('[data-test="cart-total"]').innerText()).replace('$', '').trim()

//   expect(productName).toEqual(cartProduct)
//   expect(quantity).toEqual(cartQuantity)
//   expect(price).toEqual(cartPrice)
//   expect(price).toEqual(total)

//   await page.getByRole('button', {name: 'Proceed to checkout'}).click()

//     // this steps are needed if user is not logged in
//     // await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible()
//     // await page.getByLabel('Email address *').fill('customer@practicesoftwaretesting.com')
//     // await page.getByLabel('Password *').fill('welcome01')
//     // await page.getByRole('button', {name: 'Login'}).click()

//   await expect(page.getByText(`Hello ${user.name} ${user.secondName}, you are already logged in. You can proceed to checkout.`)).toBeVisible()

//   await page.getByRole('button', {name: 'Proceed to checkout'}).click()

//   await expect(page.getByRole('heading', {name: 'Billing Address'})).toBeVisible()

//   await page.getByLabel('Country').selectOption({label: 'Antarctica'})

//   await page.getByLabel('Postal code').fill(user.postalCode)
//   await page.getByLabel('House number').fill(user.houseNumber)

//   await page.getByRole('button', {name: 'Proceed to checkout'}).click()

//   await expect(page.getByRole('heading', {name: 'Payment'})).toBeVisible()

//   await page.getByLabel('Payment Method').selectOption({label: 'Credit Card'})

//   await page.getByLabel('Credit Card Number').fill('4242-4242-4242-4242')
//   await page.getByLabel('Expiration Date').fill('11/2029')
//   await page.getByLabel('CVV').fill('111')
//   await page.getByLabel('Card Holder Name').fill(`${user.name} ${user.secondName}`)

//   await expect(page.locator('[data-test="payment-success-message"]')).toBeHidden()

//   await page.getByRole('button', {name: 'Confirm'}).click()

//   await expect(page.locator('[data-test="payment-success-message"]')).toBeVisible()
// })