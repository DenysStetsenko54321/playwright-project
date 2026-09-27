import { test, expect } from '@playwright/test';

let user = {
  name: 'test',
  secondName: 'test'
}

test.describe('new account flow', () => {
  test.describe.configure({mode: 'serial'})
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let email = '';

  for (let i = 0; i < 5; i++) {
    email += letters[Math.floor(Math.random() * letters.length)];
  }

email += '@mail.com'
const password = '@!Welcome01!'
const postalCode = '1999'
const houseNumber = '19'

  test('register', async ({ page }) => {

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
    await page.getByLabel('Postal code').fill(postalCode)
    await page.getByLabel('House number').fill(houseNumber)

    // street, city and state update the value all the time so I don't see point to fill something here that takes time and is not used
    //await page.getByLabel('Street').fill('test')
    // await page.getByLabel('City').fill('test')
    // await page.getByLabel('State').fill('test')

    await page.getByLabel('Phone').fill('1234567890')

    await page.getByLabel('Email address').fill(email)
    await page.getByLabel('Password').pressSequentially(password, { delay: 100 })
    console.log(email, password)

    await page.locator('.btn-outline-secondary').click()
    await expect(page.locator('.text-success')).toHaveCount(4)

    // how strogn password is - is not loaded so test fails always. I avoid this check
    //await page.waitForLoadState('load')
    //await expect(page.locator('.strength-labels span .active')).toHaveCount(1)

    await page.getByRole('button', {name: 'Register'}).click()

    await expect(page).toHaveURL('/auth/login')
  })

  test('login', async ({ page }) => {
    await page.goto('/auth/login')

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

    await page.getByLabel('Email address *').fill(email)
    await page.getByLabel('Password *').fill(password)

    await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByRole('heading', {name: 'My account'})).toBeVisible()
    await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible()
    await expect(page.locator('app-header .navbar-brand')).toHaveScreenshot('toolshop-logo.png', {maxDiffPixels: 1})
    await expect(page.locator('app-header [data-test="nav-menu"]')).toHaveText(`${user.name} ${user.secondName}`)
    await expect(page).toHaveURL('/account')

    await page.context().storageState({path: 'playwright/.auth/user.json'})
  })

  test('checkout', async ({ page }) => {
    await page.context().setStorageState('playwright/.auth/user.json')
    
    await page.goto('/account') 
    
    await expect(page.locator('app-header [data-test="nav-menu"]')).toHaveText(`${user.name} ${user.secondName}`)

    await page.getByRole('link', {name: 'Home'}).click()

    const nextPageButton = page.locator('[data-test="pagination-next"]')
    await expect(nextPageButton).toBeEnabled()

    // button itself has now disabled attribute, it's needed to go up to parent (..) and assert that it has class disabled. I don't do this
    // const previousPageButton = page.locator('[data-test="pagination-prev"]')
    // await expect(previousPageButton).toBeDisabled()

    const productToBuy = page.locator('[data-test="product-name"]').filter({hasText: 'Adjustable Wrench'})

    let guard = 0

    while (await productToBuy.isHidden({timeout: 1000}) && guard < 4){
      await nextPageButton.click()
      await page.waitForTimeout(1000)
      guard++
    }

    await expect(productToBuy).toBeVisible()
    await productToBuy.click()
    
    const productName = (await productToBuy.innerText()).trim()

    await expect(page.getByRole('heading', {name: 'Adjustable Wrench'})).toBeVisible()

    const price = (await page.locator('[data-test="unit-price"]').innerText()).trim()
    const quantity = await page.locator('[data-test="quantity"]').inputValue()

    const cart = page.locator('.nav-item [aria-label="cart"]')

    await expect(cart).toBeHidden()
    await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeHidden()

    await page.getByRole('button', {name: 'Add to cart'}).click()

    await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeVisible()
    await expect(cart).toBeVisible()
    await expect(cart).toHaveText('1')
    await cart.click()

    const cartProduct = (await page.locator('[data-test="product-title"]').innerText()).trim()
    const cartQuantity = await page.locator('[data-test="product-quantity"]').inputValue()
    const cartPrice = (await page.locator('[data-test="product-price"]').innerText()).replace('$', '').trim()
    const total = (await page.locator('[data-test="cart-total"]').innerText()).replace('$', '').trim()

    expect(productName).toEqual(cartProduct)
    expect(quantity).toEqual(cartQuantity)
    expect(price).toEqual(cartPrice)
    expect(price).toEqual(total)

    await page.getByRole('button', {name: 'Proceed to checkout'}).click()

    // this steps are needed if user is not logged in
    // await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible()
    // await page.getByLabel('Email address *').fill('customer@practicesoftwaretesting.com')
    // await page.getByLabel('Password *').fill('welcome01')
    // await page.getByRole('button', {name: 'Login'}).click()

    await expect(page.getByText(`Hello ${user.name} ${user.secondName}, you are already logged in. You can proceed to checkout.`)).toBeVisible()

    await page.getByRole('button', {name: 'Proceed to checkout'}).click()

    await expect(page.getByRole('heading', {name: 'Billing Address'})).toBeVisible()

    await page.getByLabel('Country').selectOption({label: 'Antarctica'})

    await page.getByLabel('Postal code').fill(postalCode)
    await page.getByLabel('House number').fill(houseNumber)

    await page.getByRole('button', {name: 'Proceed to checkout'}).click()

    await expect(page.getByRole('heading', {name: 'Payment'})).toBeVisible()

    await page.getByLabel('Payment Method').selectOption({label: 'Credit Card'})

    await page.getByLabel('Credit Card Number').fill('4242-4242-4242-4242')
    await page.getByLabel('Expiration Date').fill('11/2029')
    await page.getByLabel('CVV').fill('111')
    await page.getByLabel('Card Holder Name').fill(`${user.name} ${user.secondName}`)

    await expect(page.locator('[data-test="payment-success-message"]')).toBeHidden()

    await page.getByRole('button', {name: 'Confirm'}).click()

    await expect(page.locator('[data-test="payment-success-message"]')).toBeVisible()
  })
});