import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test('successful login with correct credentials', async ({ page }) => {
    //  Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'test1234';
    const userPassword = 'test1234';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Asser
    await expect(await page.getByTestId('user-name')).toHaveText(
      'Jan Demobankowy',
    );
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('test12');
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();

    await expect(await page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('test1234');
    await page.getByTestId('password-input').fill('test1');
    await page.getByTestId('password-input').blur();

    await expect(await page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
