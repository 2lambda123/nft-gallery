import { expect, test } from './fixtures'

const chain = 'ahk'
//desired collection name
const collectionName = ''

test('Create NFT Transaction', async ({ page, Commands }) => {
  await Commands.e2elogin()
  await page.goto(`/${chain}/create/nft`)
  await Commands.acceptCookies()
  await page
    .getByTestId('create-nft-input-name')
    .fill('NFT Created trough automated test')
  await page.setInputFiles('input[type="file"]', 'tests/e2e/unsplash-image.jpg')
  const collectionSelect = page.getByTestId(
    'create-nft-select-collection-dropdown',
  )
  await collectionSelect.click()
  await collectionSelect.getByText(collectionName).click()
  await expect(page.getByTestId('chain')).toHaveText(`${chain}`)
  await page.getByTestId('create-nft-button-new').click()
  await page.getByTestId('mint-modal-confirm-button').click()
  await expect(page.getByTestId('loader-container')).toBeVisible()
  //find a way to sign transaction
})

//list, change price
