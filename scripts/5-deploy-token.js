import sdk from "./1-initialize-sdk.js";
const app = sdk.getAppModule('0x7C03876081633F7201b0d4895346029416939cA2')
//√ Sucessfully deployed token module 0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa
const deployTokens = async() =>{

  try {
    const tokenModule = await app.deployTokenModule({
      name: 'Super Humans Governance Token ',
      symbol: "$SUPER"
    })

    console.log('√ Sucessfully deployed token module', tokenModule.address)
  } catch (error) {
    console.error('X Failed to deploy token module', error)
  }
}

deployTokens()