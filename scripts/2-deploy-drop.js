import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
// ✅ Successfully deployed bundleDrop module, address: 0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2
// ✅ bundleDrop metadata: {
//   metadata: {
//     name: 'SuperDAO Membership',
//     description: 'A DAO for Super Humans.',
//     image: 'https://cloudflare-ipfs.com/ipfs/bafkreidb7qebxieukjbufcvcoischzj5sjv5w6brliguzfpfst7xzlkyiu',
//     primary_sale_recipient_address: '0x0000000000000000000000000000000000000000',
//     uri: 'ipfs://bafkreidubelzbitlvdxkcoegrls5mtxwynoadku6ortufgksb76acqzcvm'
//   },
//   address: '0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2',
//   type: 11
// }

const app = sdk.getAppModule('0x7C03876081633F7201b0d4895346029416939cA2')

const deployDrop = async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name
      name: "SuperDAO Membership",
      // A description for the collection.
      description: "A DAO for Super Humans.",
      // The image for the collection that will show up on OpenSea.
      image: readFileSync("scripts/assets/super-humans.jpeg"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
}
// Calling funciton 
deployDrop()
