import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
//0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2
//Suceesfully set cliem conditon on bundle drop 0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2
const bundleDrop = sdk.getBundleDropModule(
  '0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2'
)

const createClaimConditionFactory = async() => {

  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory()
    // Specify conditions
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 99_999,
      maxQuantityPerTransaction: 1,
    })
    await bundleDrop.setClaimCondition(0, claimConditionFactory)
    console.log('Suceesfully set cliem conditon on bundle drop', bundleDrop.address)
    
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
}

createClaimConditionFactory()