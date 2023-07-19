import react, { useEffect, useState } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import ConnectWallet from './ConnectWallet';
import { numberWithCommas } from '../utils/utils';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';

const Dropboard = () => {

  const CLSM_REWARD = 51000000; // 5.1M

  // Web3
  const { status } = useWallet();
  const constants = getConstants();
  const walletAddress = useAddress();
  // const walletAddress = 'terra1f6j6jcqjfk3gxg6kfd0v5ht782y625u349kqqz';
  const { getNFTList } = useContract();


  const [CLASSICMOON, setClassicMoon] = useState([]);

  const [lastAirdropped, setLastAirdropped] = useState('2023-07-07 15:15:15');
  const [nextAirdrop, setNextAirdrop] = useState('2023-08-06 15:00:00');

  const [CLSMInVestingPeriod, setCLSMInVestingPeriod] = useState(CLSM_REWARD * 10);
  const [AvaibleForAirdrop, setAvaibleForAirdrop] = useState(CLSM_REWARD * 3);
  const [AirdropCollected, setAirdropCollected] = useState(CLSM_REWARD * 9);

  const getAirdrop = () => {
  };

  /*
  1. CLSM in Vesting Period = Number of CLSM NFT held * 5.1M CLSM * Number of months 
      remaining from vesting period
  2. Available for Airdrop = Number of CLSM tokens that is released from Vesting and 
      is accumulated for airdrop (the amount of CLSM tokens not withdrawn yet)
  3. Airdrop Collected = Number of CLSM tokens withdrawn by the user
  */

  useEffect(() => {
    (async () => {
      if (walletAddress) {
        // Get ClassicMoon NFT Information
        let result = await getNFTList(constants.CLASSICMOON_NFT_Contract_Address, walletAddress);
        setClassicMoon(result.tokens);
      } else {
        setClassicMoon([]);
      }
    })()
  }, [walletAddress]);

  return (
    <div className="tw-text-white tw-text-center tw-text-[20px] tw-border-[1px] tw-border-solid tw-rounded-lg tw-p-[16px] tw-border-[#13214d]">
      <div className="tw-text-[24px] tw-pl-[20px] tw-py-[12px] tw-text-center tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-b-[#ffffff80]">
        Airdrop 5.1M/NFT every month for 20 months.
      </div>
      <div className="tw-pl-[20px] tw-py-[12px] tw-text-left tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-b-[#ffffff80]">
        <div className='row'>
          <div className='col-6'>
            ClassicMoon NFTs:
          </div>
          <div className='col-6'>
            {numberWithCommas(CLASSICMOON.length)}
          </div>
        </div>
      </div>
      <div className="tw-pl-[20px] tw-py-[12px] tw-text-left tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-b-[#ffffff80]">
        <div className='row'>
          <div className='col-6'>
            Last Airdropped:
          </div>
          <div className='col-6'>
            {lastAirdropped}
          </div>
        </div>
      </div>
      <div className="tw-pl-[20px] tw-py-[12px] tw-text-left tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-b-[#ffffff80]">
        <div className='row'>
          <div className='col-6'>
            Next Airdrop is avaible from:
          </div>
          <div className='col-6'>
            {nextAirdrop}
          </div>
        </div>
      </div>
      <div className="tw-pl-[20px] tw-py-[12px] tw-text-left tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-b-[#ffffff80] tw-mb-[16px]">
        <div className='row'>
          <div className='col-6'>
            CLSM in Vesting Period:
          </div>
          <div className='col-6'>
            {numberWithCommas(CLSMInVestingPeriod)}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Available for Airdrop:
          </div>
          <div className='col-6'>
            {numberWithCommas(AvaibleForAirdrop)}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Airdrop Collected:
          </div>
          <div className='col-6'>
            {numberWithCommas(AirdropCollected)}
          </div>
        </div>
      </div>

      {status === WalletStatus.WALLET_CONNECTED ? (
        CLASSICMOON.length > 0 ?
        <button className="tw-text-[18px] tw-bg-[#6812b7cc] hover:tw-bg-[#6812b780] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-text-white tw-px-[12px] tw-py-[3px]" onClick={() => getAirdrop()}>Airdrop</button> :
        <button className="tw-text-[18px] tw-bg-[#6812b700] hover:tw-bg-[#6812b700] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-text-white tw-px-[12px] tw-py-[3px]" onClick={() => {}} style={{cursor: 'not-allowed'}}>Airdrop</button>
      ) : (
        <ConnectWallet />
      )}
    </div>
  )
}

export default Dropboard;