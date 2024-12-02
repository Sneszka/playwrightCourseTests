import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'test1234';
    const userPassword = 'test1234';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(await page.getByTestId('user-name')).toHaveText(
      'Jan Demobankowy',
    );
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'test123';
    const expectedMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').click();
    await page.getByTestId('error-login-id').click();

    //Assert
    await expect(await page.getByTestId('error-login-id')).toHaveText(
      expectedMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'test1234';
    const userWrongPassword = 'test1';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userWrongPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(await page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
