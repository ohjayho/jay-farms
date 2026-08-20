import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('selecting one item shows the singular count and print action', async ({ page }) => {
  await page.getByRole('checkbox', { name: 'Select Helicopter', exact: true }).check()
  await expect(page.getByText('1 item selected')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Print QR Code' })).toBeVisible()
})

test('selecting, deselecting, and cancelling keep the count accurate', async ({ page }) => {
  const helicopter = page.getByRole('checkbox', { name: 'Select Helicopter', exact: true })
  const utilityVehicle = page.getByRole('checkbox', { name: 'Select Utility Vehicle', exact: true })
  await helicopter.check()
  await utilityVehicle.check()
  await expect(page.getByText('2 items selected')).toBeVisible()
  await helicopter.uncheck()
  await expect(page.getByText('1 item selected')).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(page.getByText(/items? selected/)).toHaveCount(0)
  await expect(helicopter).not.toBeChecked()
})

test('Print QR Code opens a deterministic accessible dialog', async ({ page }) => {
  await page.getByRole('checkbox', { name: 'Select Helicopter', exact: true }).check()
  await page.getByRole('button', { name: 'Print QR Code' }).click()
  const diaglog = page.getByRole('dialog')
  await expect(diaglog).toBeVisible()
  await expect(diaglog.getByRole('heading', { name: 'QR codes prepared for 1 item' })).toBeVisible()
  await diaglog.getByRole('button', { name: 'Close' }).click()
  await expect(diaglog).toHaveCount(0)
})

test('Select all affects only the three currently visible records', async ({ page }) => {
  await page.getByLabel('Category').selectOption('Tractor')
  await expect(page.getByRole('article')).toHaveCount(3)
  await page.getByRole('checkbox', { name: 'Select all visible equipment', exact: true }).check()
  await expect(page.getByText('3 items selected')).toBeVisible()
  await page.getByLabel('Category').selectOption('All')
  await expect(page.getByRole('article')).toHaveCount(9)
  await expect(page.getByRole('checkbox', { name: /^Select (?!all)/ })).toHaveCount(9)
  await expect(page.getByRole('checkbox', { name: 'Select Grape Harvester' })).not.toBeChecked()
  await expect(page.getByRole('checkbox', { name: 'Select Helicopter' })).not.toBeChecked()
  await expect(page.getByRole('checkbox', { name: 'Select Utility Vehicle' })).not.toBeChecked()
  await expect(page.getByText('3 items selected')).toBeVisible()
})
