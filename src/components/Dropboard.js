import react, { useState } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import ConnectWallet from './ConnectWallet';

const Dropboard = () => {

  const CLSM_REWARD = 51000000; // 5.1M

  const { status } = useWallet();

  const [CLASSICMOON, setClassicMoon] = useState(0);

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
            {CLASSICMOON}
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
            {CLSMInVestingPeriod}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Available for Airdrop:
          </div>
          <div className='col-6'>
            {AvaibleForAirdrop}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Airdrop Collected:
          </div>
          <div className='col-6'>
            {AirdropCollected}
          </div>
        </div>
      </div>

      {status === WalletStatus.WALLET_CONNECTED ? (
        <button className="tw-text-[18px] tw-bg-[#6812b7cc] hover:tw-bg-[#6812b780] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-text-white tw-px-[12px] tw-py-[3px]" onClick={() => getAirdrop()}>Airdrop</button>
      ) : (
        <ConnectWallet />
      )}
    </div>
  )
}

export default Dropboard;