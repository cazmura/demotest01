import { test, expect } from '@playwright/test';

const VALID_EMAIL = 'ichiro@example.com';
const VALID_PASSWORD = 'password';

test.describe('HOTEL PLANISPHERE login and plans', () => {
  // TC1: 正しい認証情報でログインできる
  test('TC1: logs in successfully with valid credentials', async ({ page }) => {
    await page.goto('/ja/login.html');

    await page.locator('#email').fill(VALID_EMAIL);
    await page.locator('#password').fill(VALID_PASSWORD);
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/mypage\.html/);
    await expect(page.getByText(VALID_EMAIL)).toBeVisible();
    await expect(page.getByText('山田一郎')).toBeVisible();
  });

  // TC2: 誤った認証情報でログインするとエラーが表示される
  test('TC2: shows an error with invalid credentials', async ({ page }) => {
    await page.goto('/ja/login.html');

    await page.locator('#email').fill('wrong@example.com');
    await page.locator('#password').fill('wrongpass');
    await page.locator('#login-button').click();

    await expect(page.locator('#email-message')).toHaveText('メールアドレスまたはパスワードが違います。');
    await expect(page.locator('#password-message')).toHaveText('メールアドレスまたはパスワードが違います。');
    await expect(page).toHaveURL(/login\.html/);
  });

  // TC3: 宿泊予約ページにアクセスするとおすすめプランが表示される
  test('TC3: shows the recommended plan on the plans page', async ({ page }) => {
    await page.goto('/ja/plans.html');

    await expect(page.getByText('⭐おすすめプラン⭐')).toBeVisible();
    await expect(page.getByText('お得な特典付きプラン')).toBeVisible();
  });
});
