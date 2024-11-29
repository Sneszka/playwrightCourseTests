# Test Automation training form jaktestowac.pl

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site
  https://demo-bank.vercel.app/  
  If link broken check first lesson for update:
  https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright:  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI:  
  `npx playwright test`
- run test with browser GUI:  
  `npx playwright test --headed`
- viewing report  
  `npx playwright show-report`
- udpating @playwright/test
  `npm i @playwright/test`
- updating browsers (after updating playwright itself)
  `npx playwright install`
- running Trace Viewer on zip file when u want to access it
`npx playwright show-trace trace.zip`


## Playwright Config modifications

- config file `playwright.config.ts`
- disabling browsers, i.e. Firefox:
  ```json
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
- implementing Prettier
  `npm install --save-dev --save-exact prettier`
- initiating formatting with Prettier
  `npx prettier --write .`
- ignoring Prettier files in file: `.prettier.ignore`
  `package-lock.json`
  `playwright-report`
- adding the rule to Prettier in `.prettierrc.json`

```
{
    "singleQuote": true
}
```

## Visual Studio code

- Preview: for README.dm
- Autosave (in File -> Auto Save) ticked
- Timeline: file context menu
- format documents option+command+F
- unfocus from a button/field: ().blur(); e.g.  
  `await page.getByTestId('password-input').blur();`
- to run one test of the pact -> add `.only` prior to the name: `test.only`
- to stabilize test: `await page.waitForLoadState("domcontentloaded")`

## Playwright snippets

- test:
  ```javascript
  test('test description', async ({ page }) => {});
  ```
- describe:

  ```javascript
  test.describe('Group description', () => {});
  ```

- running one test: `test.only`

-'#' odpowiada za atrybut ID, jest unikalnym elementem na całą stronę, mozna z niego korzystać za pomocą `page.locator`
