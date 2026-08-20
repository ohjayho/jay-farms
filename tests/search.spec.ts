import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('searching for tractor displays all matching tractors', async ({ page }) => {
  await page.getByRole('searchbox').fill('tractor')
  await expect(page.getByRole('article')).toHaveCount(3)
  await expect(page.getByRole('article', { name: 'Green Tractor' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Kubota Tractor 50 HP' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Compact Vineyard Tractor' })).toBeVisible()
})

test('search is case-insensitive', async ({ page }) => {
  await page.getByRole('searchbox').fill('HELICOPTER')
  await expect(page.getByRole('article')).toHaveCount(1)
  await expect(page.getByRole('article', { name: 'Helicopter' })).toBeVisible()
})

test('search supports partial equipment names', async ({ page }) => {
  await page.getByRole('searchbox').fill('har')
  await expect(page.getByRole('article')).toHaveCount(3)
  await expect(page.getByRole('article', { name: 'Grape Harvester' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Combine Harvester' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Orchard Sprayer' })).toBeVisible()
})

test('search trims leading and trailing whitespace', async ({ page }) => {
  await page.getByRole('searchbox').fill('           grape  ')
  await expect(page.getByRole('article')).toHaveCount(1)
  await expect(page.getByRole('article', { name: 'Grape Harvester' })).toBeVisible()
})

test('a nonexistent keyword produces a useful empty state', async ({ page }) => {
  await page.getByRole('searchbox').fill('Safe Ag Systems')
  await expect(page.getByRole('heading', { name: 'equipment found' })).toBeVisible()
  await expect(page.getByText('Try a different keyword or adjust your filters.')).toBeVisible()
})
