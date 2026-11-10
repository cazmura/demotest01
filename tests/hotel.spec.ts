import { test, expect, type Page } from '@playwright/test';

const VALID_EMAIL = 'ichiro@example.com';
const VALID_PASSWORD = 'password';

async function login(page: Page, email: string, password: string) {
  await page.goto('/ja/login.html');
  await page.getByLabel('メールアドレス').fill(email);
  await page.getByLabel('パスワード').fill(password);
  await page.locator('#login-button').click();
}

test.describe('HOTEL PLANISPHERE login and plans', () => {
  // TC1: 正しい認証情報でログインできる
  test('TC1: logs in successfully with valid credentials', async ({ page }) => {
    await test.step('正しい認証情報でログインする', async () => {
      await login(page, VALID_EMAIL, VALID_PASSWORD);
    });

    await test.step('マイページに会員情報が表示されることを確認する', async () => {
      await expect(page).toHaveURL(/mypage\.html/);
      await expect(page.getByText(VALID_EMAIL)).toBeVisible();
      await expect(page.getByText('山田一郎')).toBeVisible();
    });
  });

  // TC2: 誤った認証情報でログインするとエラーが表示される
  test('TC2: shows an error with invalid credentials', async ({ page }) => {
    await test.step('誤った認証情報でログインする', async () => {
      await login(page, 'wrong@example.com', 'wrongpass');
    });

    await test.step('エラーメッセージが表示されることを確認する', async () => {
      await expect(page.locator('#email-message')).toHaveText('メールアドレスまたはパスワードが違います。');
      await expect(page.locator('#password-message')).toHaveText('メールアドレスまたはパスワードが違います。');
      await expect(page).toHaveURL(/login\.html/);
    });
  });

  // TC3: 宿泊予約ページにアクセスするとおすすめプランが表示される
  test('TC3: shows the recommended plan on the plans page', async ({ page }) => {
    await test.step('宿泊予約ページにアクセスする', async () => {
      await page.goto('/ja/plans.html');
    });

    await test.step('おすすめプランが表示されることを確認する', async () => {
      await expect(page.getByText('⭐おすすめプラン⭐')).toBeVisible();
      await expect(page.getByText('お得な特典付きプラン')).toBeVisible();
    });
  });
});
