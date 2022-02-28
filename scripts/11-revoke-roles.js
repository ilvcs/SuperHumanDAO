import sdk from "./1-initialize-sdk.js";
// ERC-20 token contract
const tokenModule = sdk.getTokenModule('0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa')

/**
 * Roles that exist right now: {
  admin: [ '0x8F7232C4F2791F50CEF034D5355883f7d22173A8' ],
  minter: [
    '0x8F7232C4F2791F50CEF034D5355883f7d22173A8',
    '0x9a5509F76d4486D257F43F4964348fe91997cCbf'
  ],
  pauser: [ '0x8F7232C4F2791F50CEF034D5355883f7d22173A8' ],
  transfer: [ '0x8F7232C4F2791F50CEF034D5355883f7d22173A8' ]
}
🎉 Roles after revoking ourselves {
  admin: [],
  minter: [ '0x9a5509F76d4486D257F43F4964348fe91997cCbf' ],
  pauser: [],
  transfer: []
}
Successfully revoked our superpowers from the ERC-20 contract
 */
const revokeRoles = async()=>{

  try {
    // Log the current roles.
    console.log(
      "Roles that exist right now:",
      await tokenModule.getAllRoleMembers()
    );

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      "🎉 Roles after revoking ourselves",
      await tokenModule.getAllRoleMembers()
    );
    console.log("Successfully revoked our superpowers from the ERC-20 contract");

  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
}
revokeRoles()