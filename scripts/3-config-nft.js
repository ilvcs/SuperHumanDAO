import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
//0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2

const bundleDrop = sdk.getBundleDropModule(
  '0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2'
)

const configNft = async() => {
  try {
    
    await bundleDrop.createBatch([
      {
        name:'Membership Token NFT',
        description: 'This NFT will give access to SuperDAO',
        image: readFileSync('scripts/assets/membership.jpeg'),
      }
    ]);
    console.log('Suceesfully created a new NFT membership drop!')

  } catch (error) {
    console.error('Failed to create the new NFT:', error)
  }
}

configNft()