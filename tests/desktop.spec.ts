import { test, expect } from '@playwright/test';

test.describe('Desktop tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const userID = 'test1234';
    const userPassword = 'test1234';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverID = '2';
    const transferAmount = '120';
    const transferTitle = 'zwrot srodkow';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    //Act
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    // await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    await page.getByRole('link', { name: 'Przelew wykonany! Chuck' });

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const selectedNumber = '500 xxx xxx';
    const transferAmount = '50';

    //Act
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_topup_receiver').selectOption(selectedNumber);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Doładowanie wykonane! ${transferAmount},00PLN na numer ${selectedNumber}`,
    );
  });
  //TODO: develop further desktop tests but with various assertions

  test('correct after successful mobile top-up', async ({ page }) => {
    //Arrange
    const selectedNumber = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_topup_receiver').selectOption(selectedNumber);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
