import { test, expect } from '@playwright/test';
import { loginData, userID } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userID = loginData.userId;
    const userPassword = loginData.userPassword;

    //Act
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
    const userID = 'test123';
    const expectedMessage = 'identyfikator ma min. 8 znaków';

    //Act
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
    const userID = loginData.userId;
    const userWrongPassword = 'test1';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userWrongPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(await page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
