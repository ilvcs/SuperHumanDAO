import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0x9a5509F76d4486D257F43F4964348fe91997cCbf",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa",
);

const createVoteProposal = async() => {

  try {
    const amount = 500_000
    // We are creating to mint 500000 new token to the tresery
    await voteModule.propose(
      "Shuld the DAO mint an additional " + amount + " tokens into the treasury?",
      [ 
        {
          // Amount of ether/matic tokens to mint token
          nativeTokenValue: 0 ,
          transactionData: tokenModule.contract.interface.encodeFunctionData(

          // We are doing a mint for the voting contract
          'mint',
          [
            voteModule.address,
            ethers.utils.parseUnits(amount.toString())
          ]
        ),
          // Target contract that mints tokens
          toAddress: tokenModule.address
        }
      ]
    )

      console.log("√ Successfully created proposal to mint tokens");

  } catch (error) {
    console.log('Failed to crate first proposal', error)
    process.exit(1)
  }


  try {
    const amount = 9_000;
    // Create proposal to transfer ourselves 9000 tokens for being cool

    await voteModule.propose(
      "Should the DAO transfer " + amount + 'tokens from the treasury to' + process.env.WALLET_ADDRESS + " for being awesome",
      [
        {
          // Again, we're sending ourselves 0 ETH. Just sending our own token.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a transfer from the treasury to our wallet.
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    )
    console.log("Succesfully created the proposal to reward overselves from the treasury let's people vote for that")
  } catch (error) {
    console.log("Failed to create the second proposal", error)
  }
}
createVoteProposal()