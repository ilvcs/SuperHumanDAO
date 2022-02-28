import {ethers} from 'ethers'
import sdk from "./1-initialize-sdk.js";

// ERC1155 membership nft contract
const bundleDropModule = sdk.getBundleDropModule('0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2')
// ERC-20 token contract
const tokenModule = sdk.getTokenModule('0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa')

const airdropTokens = async() => {
  try {

    // Grab all addresses who owns our membership NFT, with token id '0' 
    const walletAddress = await bundleDropModule.getAllClaimerAddresses('0')
    // If no one claimed yet! thats too lonly
    if(walletAddress.length === 0){
      console.log('No NFTS have been claimed yet, get some friends to claim free nft')
      process.exit(0)
    }

    // Loop through nft owner addresses if the owners are >0
    const airdropTargets = walletAddress.map((address) => {
      
      // Pick a random number between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 +1) + 1000)
      console.log(`√ Going to airdrop ${randomAmount} tokens to ${address}`)

      // Setup the target address
      const airdropTarget = {
        address, 
        amount : ethers.utils.parseUnits(randomAmount.toString(), 18)
      }
      return airdropTarget;
    })

    // Call transfer batch on all of our targets
    console.log('=> Starting the Airdrop')
    await tokenModule.transferBatch(airdropTargets)
    console.log('Successfully airdroped tokens to all the holders of the NFT!')

  } catch (error) {
    console.error('Failed to airdrop tokens', error);
  }
}

airdropTokens()