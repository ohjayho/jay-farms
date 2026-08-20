import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Type filter limits results', async ({ page }) => {
  await page.getByLabel('Type').selectOption('Implement')
  await expect(page.getByRole('article')).toHaveCount(1)
  await expect(page.getByRole('article', { name: 'Orchard Sprayer' })).toBeVisible()
})

test('Category filter limits results', async ({ page }) => {
  await page.getByLabel('Category').selectOption('Harvester')
  await expect(page.getByRole('article')).toHaveCount(2)
  await expect(page.getByRole('article', { name: 'Grape Harvester' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Combine Harvester' })).toBeVisible()
})

test('Status filter limits results', async ({ page }) => {
  await page.getByLabel('Status').selectOption('Operational')
  await expect(page.getByRole('article')).toHaveCount(5)
  await expect(page.getByRole('article', { name: 'Green Tractor' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Grape Harvester' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Kubota Tractor 50 HP' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Utility Vehicle' })).toBeVisible()
  await expect(page.getByRole('article', { name: 'Track Excavator' })).toBeVisible()
})

test('multiple filters use AND logic', async ({ page }) => {
  await page.getByLabel('Type').selectOption('Vehicle')
  await page.getByLabel('Category').selectOption('Harvester')
  await page.getByLabel('Status').selectOption('Operational')
  await expect(page.getByRole('article')).toHaveCount(1)
  await expect(page.getByRole('article', { name: 'Grape Harvester' })).toBeVisible()
})

test('search and filters work together', async ({ page }) => {
  await page.getByLabel('Type').selectOption('Vehicle')
  await page.getByLabel('Category').selectOption('Tractor')
  await page.getByRole('searchbox', { name: 'Search equipment' }).fill('compact')
  await expect(page.getByRole('article')).toHaveCount(1)
  await expect(page.getByRole('article', { name: 'Compact Vineyard Tractor' })).toBeVisible()
})
