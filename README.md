# Playwright + TypeScript Mini Project

Application under test: https://practicesoftwaretesting.com

## Test coverage

The suite covers a complete customer journey:

1. Register an account using a randomly generated email.
2. Log in with the newly registered account.
3. Find a product, add it to the cart, and complete checkout.

Assertions cover account details, product information, cart quantity,
prices, payment confirmation, and logo screenshots.

## Tools

- Playwright Test
- TypeScript
- Node.js and npm

Configured browsers: Chromium, Firefox, and WebKit.

## Setup

Install Node.js and npm before starting.

After cloning or downloading this repository, open a terminal in the
project folder and run:

```bash
npm ci
npx playwright install
```

## Run the tests

Run the complete flow in Chromium:

```bash
npx playwright test --project=chromium
```

Run in Chromium with the browser window visible:

```bash
npx playwright test --project=chromium --headed
```

Run all configured browsers with one worker:

```bash
npx playwright test --workers=1
```

Use one worker when running multiple browsers because the tests share
the same saved authentication file.

## View the report

```bash
npx playwright show-report
```

## Test dependencies

Registration, login, and checkout run in a serial group.

Login depends on the account created during registration. Checkout
depends on authentication saved during login.

Run the complete flow rather than individual login or checkout tests.
Independent checkout with fallback credentials is not implemented yet.

Authentication is saved locally to:

`playwright/.auth/user.json`

This file is excluded from Git.

## Screenshot checks

The suite compares the application logo and banner against baseline screenshots
stored alongside the tests.

Screenshot results can vary across operating systems and browser
versions. A contributor using another environment may need baselines
for that environment.

Run command below to create screenshots for your OS

```bash 
npx playwright test --update-snapshots 
```

## Current limitations

- Random email generation does not guarantee uniqueness.
- Product pagination uses a fixed wait.
- The tests depend on the availability and behavior of the public demo site.