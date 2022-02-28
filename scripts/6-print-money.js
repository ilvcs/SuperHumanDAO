import {ethers} from 'ethers'
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule('0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa')

const printMoney = async() => {

  try {
    const amount = 1_000_000;
  const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18)
  await tokenModule.mint(amountWith18Decimals)
  const totalSupply = await tokenModule.totalSupply()

  console.log(` √ Now there are ${ethers.utils.formatUnits(totalSupply, 18)} $SUPER coins in circulation`)
  } catch (error) {
    console.error('Failed to print money', error);
  }
}

printMoney()