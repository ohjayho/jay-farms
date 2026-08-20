import { expect, test } from '@playwright/test'

test('maintenance states use the fixed 2026-08-17 reference date', async ({ page }) => {
  await page.goto('/')
  const overdue = page.getByRole('article', { name: 'Helicopter' })
  await expect(overdue.getByText('Maintenance overdue: 16 Aug 2026')).toBeVisible()
  const future = page.getByRole('article', { name: 'Green Tractor' })
  await expect(future.getByText('Next maintenance: 12 Sep 2026')).toBeVisible()
  await expect(future.getByText(/Maintenance overdue/)).toHaveCount(0)
  const unspecified = page.getByRole('article', { name: 'Grape Harvester' })
  await expect(unspecified.getByText('Next maintenance: Not specified')).toBeVisible()
})
