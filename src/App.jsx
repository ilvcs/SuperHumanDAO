import {useEffect, useMemo, useState} from 'react';
import { ethers } from "ethers";

import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import {shortenAddress} from './helpers';
// We instantiate the sdk on Rinkeby.
const sdk = new ThirdwebSDK("rinkeby");

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0xa2300dBc5608aaF1A2FCace7bd09e68f822230a2",
);

const tokenModule = sdk.getTokenModule(
  "0x7Eb4Cf9fcA3722C59a0934F35384C478AE254dBa"
);

const App = () => {

  const {connectWallet, address, error, provider} = useWeb3()

  const signer = provider ? provider.getSigner() : undefined
  const [userClaimedNFT, setUserClaimedNFT] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  // To hold members token amount
  const [memberTokenAmount, setMemberTokenAmount] = useState({})
  const [memberAddresses, setMemberAddresses] = useState([])


  console.log(`Address is ${address}`);

  useEffect(()=>{
    sdk.setProviderOrSigner(signer)
  },[signer])

  useEffect( ()=>{

   runsetup()

  },[address])


  useEffect(()=>{
    getMembersAddresess()
  },[userClaimedNFT])


  useEffect(()=>{
    getHoldersBalance()
  },[userClaimedNFT])

  const runsetup = async() => {

    if(!address){
      return
    }
    // Check if the user having the NFT balance to veryfiy the membership
    const balance = await bundleDropModule.balanceOf(address, '0');

    try {
      //Check if the balance is more then 0
      if(balance.gt(0)){
        setUserClaimedNFT(true)
        console.log('User has membership NFT');
      }else{
        setUserClaimedNFT(false)
        console.log("User doesn't have Membership NFT");
      }
    } catch (error) {
      setUserClaimedNFT(false)
      console.log('Faild Get Nft Balance', error);
    }
  }

  const getMembersAddresess = async()=> {
    if(!userClaimedNFT){
      return
    }
    // Grab token address who holds token id '0'
    try {
      const memberAddresses = await bundleDropModule.getAllClaimerAddresses('0')
      setMemberAddresses(memberAddresses)
      console.log('Member addresss,', memberAddresses);


    } catch (error) {
     console.log('Failed to get members address', error); 
    }
  }

  const getHoldersBalance = async() => {
    if(!userClaimedNFT){
      return
    }
     // Get all holders balances
    try {
    
      const amounts = await tokenModule.getAllHolderBalances()
      setMemberTokenAmount(amounts)
      console.log('Amounts', amounts);

    } catch (error) {
     console.log('Failed to get Token amounts', error); 
    }
  }

  const memberList = useMemo(() => {
    console.log('Member list called');
      return memberAddresses.map((address) => {
        return {
          address, 
          tokenAmount: ethers.utils.formatUnits(
            memberTokenAmount[address] || 0, 18
          )
        }
      })
  },[memberAddresses, memberTokenAmount])

  const mintMembershipNFT = async() => {
    setIsClaiming(true);
    try {
      // For minting nft token to id 0  nd number of tokens 1
      await bundleDropModule.claim('0',1)
      setUserClaimedNFT(true)
      // show the users nft
      console.log( `Suceessfully minted! check out in open sea https://testnets.opensea.io/assets/${bundleDropModule.address}/0` );
    } catch (error) {
      console.log('Failed to claim', error);
    }finally{
      // Stop loading state
      setIsClaiming(false)
    }
  }


  if(!address){
    return(
      <div className="landing">
      <h1>Welcome to SUPER DAO</h1>
      <button className='btn-hero' onClick={() => connectWallet('injected')}>
        Connect your wallet
      </button>
    </div>
    )
  }

  if (userClaimedNFT) {
    return (
    <div className="member-page">
      <h1>🚀 Super Human DAO Member Page</h1>
      <p>Congratulations on being a member</p>
      <div>
        <div>
          <h2>Member List</h2>
          <table className="card">
            <thead>
              <tr>
                <th>Address</th>
                <th>Token Amount</th>
              </tr>
            </thead>
            <tbody>
              {memberList.map((member) => {
                return (
                  <tr key={member.address}>
                    <td>{shortenAddress(member.address)}</td>
                    <td>{member.tokenAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  };
  
 return(
  <div className="mint-nft">
      <h1>Mint your free Super Humans DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintMembershipNFT()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
 )
};

export default App;
