import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is Governence contract
const voteModule = sdk.getVoteModule('0x9a5509F76d4486D257F43F4964348fe91997cCbf')

// ERC-20 token contract
const tokenModule = sdk.getTokenModule('0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa')

const setVoting = async()=>{
  try {
    await tokenModule.grantRole('minter', voteModule.address)
    console.log('Sucessfully gave vote module permission to act on token module')
  } catch (error) {
    console.error('Faild to grant vote modle permission on token module ', error);
    process.exit(1)
    
  }

  try {
    
    // Grab our wallet's token balance
    const ownedTokenBalance = await tokenModule.balanceOf(process.env.WALLET_ADDRESS)
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value)
    // grab 90% of the supply to our voting contract
    const percent90 = ownedAmount.div(100).mul(90)

    // trasfer to voting contract
    await tokenModule.transfer(voteModule.address, percent90)
    console.log('√ Successfully transferred tokens to voting module')


  } catch (error) {
    console.error('Failed to transfer tokens to vote module', error);
  }
}

setVoting()