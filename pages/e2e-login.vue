<template>
  <div>
    <p data-testid="mockAddress">{{ mockAddress }}</p>
  </div>
</template>

<script lang="ts">
//import { mnemonicGenerate } from '@polkadot/util-crypto'
import { stringToU8a, u8aToHex } from '@polkadot/util'
import keyring from '@polkadot/ui-keyring'
import { ss58Of } from '@/utils/config/chain.config'
import { useIdentityStore } from '@/stores/identity'

export default {
  name: 'MockAddressPage',
  setup() {
    const identityStore = useIdentityStore()
    const { urlPrefix } = usePrefix()
    const mockAddress = ref(false)

    onMounted(() => {
      //Dev Seed
      /*const mnemonic =
        'bottom drive obey lake curtain smoke basket hold race lonely fit walk//KodaDev'*/
      //Real Seed
      //i've used the testing acc seed only locally for testing purposes:
      const mnemonic = ''
      const { pair } = keyring.addUri(mnemonic, '1234', {
        name: 'mnemonic acc',
      })

      // TODO: check 'loadAll' error, approx 1 in 10 tests fail without this
      keyring.setSS58Format(ss58Of(urlPrefix.value))
      keyring.addPair(pair, '1234')
      keyring.saveAccount(pair, '1234')
      const isLocked = pair.isLocked
      console.log('Locking Status:', isLocked)
      const account = pair.address
      const message = stringToU8a('this is our message')
      const signature = pair.sign(message)
      const isValid = pair.verify(message, signature, pair.publicKey)

      console.log(
        `The signature ${u8aToHex(signature)}, is ${isValid ? '' : 'in'}valid`,
      )

      localStorage.setItem('kodaauth', account)
      identityStore
        .setAuth({
          address: account,
          tokens: {},
        })
        .then(() => {
          mockAddress.value = true
        })
        .catch((error) => {
          console.error('Error setting auth:', error)
        })
    })

    useHead({
      title: 'Mock Address Generator',
      meta: [
        {
          name: 'description',
          content:
            'This is a mock address generator used for testing and development purposes on the KodaDot platform.',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    })

    return {
      mockAddress,
    }
  },
}
</script>
