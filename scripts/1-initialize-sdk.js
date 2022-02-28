// 0x7C03876081633F7201b0d4895346029416939cA2
import {ThirdwebSDK} from "@3rdweb/sdk";
import ethers from 'ethers'

import dotenv from 'dotenv'
dotenv.config();

if(!process.env.PRIVATE_KEY || process.eventNames.PRIVATE_KEY === ''){
  console.log('Private Key not found')
}

if(!process.env.ALCHEMY_API_URL || process.eventNames.ALCHEMY_API_URL === ''){
  console.log('ALCHEMY_API_URL not found')
}

if(!process.env.WALLET_ADDRESS || process.eventNames.WALLET_ADDRESS === ''){
  console.log('WALLET_ADDRESS not found')
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
)

const initialize = async () => {
  try {
    const apps = await sdk.getApps();
    console.log('Your app address is :', apps[0].address)
  } catch (error) {
    console.log('Failed to get apps from the sdk', error)
    process.exit(1)
  }

}
initialize()
export default sdk;