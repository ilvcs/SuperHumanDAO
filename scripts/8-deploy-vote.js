
import sdk from "./1-initialize-sdk.js";
const appModule = sdk.getAppModule('0x7C03876081633F7201b0d4895346029416939cA2')
//√ Successfully deployed vote module Adress: 0x9a5509F76d4486D257F43F4964348fe91997cCbf
const deployVote = async() => {
  try {
    
    const voteModule = await appModule.deployVoteModule({
      name: "SuperHumonDAO's epic proposals",
      votingTokenAddress: '0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa',
       // Members can start voting immediatly
      proposalStartWaitTimeInSeconds: 0,
  
      // 24 hours to vote on a proposal
      proposalVotingTimeInSeconds: 24 * 60 * 60,
    
      votingQuorumFraction: 0,
      // No tokens are required for a user to create a proposal
      minimumNumberOfTokensNeededToPropose: '0',
  
    })
    console.log('√ Successfully deployed vote module Adress:', voteModule.address)
  } catch (error) {
    console.log('Failed to deploy vote module', error)
  }
}

deployVote()