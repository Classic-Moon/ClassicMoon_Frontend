import react, { useEffect, useState } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Coin, Fee, MsgExecuteContract } from '@terra-money/terra.js';
import ConnectWallet from './ConnectWallet';
import { calcTax, toAmount, numberWithCommas } from '../utils/utils';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';
import { useClient } from '../context/useClient';
import useTax from '../context/useTax';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Dropboard.css'

const Dropboard = () => {

  const releaseDate = 1690072000 * 1000;
  const DAY = 1000 * 60 * 60 * 24;
  // const MONTH = DAY * 30;
  const MONTH = 1000 * 60 * 30;

  // Web3
  const wallet = useWallet();
  const constants = getConstants();
  const walletAddress = useAddress();
  const { terraClient } = useClient();
  const { getNFTList, AirdropUserInfo } = useContract();

  const { loadTaxInfo, loadTaxRate, loadGasPrice } = useTax();

  const [CLASSICMOON, setClassicMoon] = useState([]);

  const [last_drop_time, set_last_drop_time] = useState(0);
  const [next_drop_time, set_next_drop_time] = useState(0);
  const [pending_amount, set_pending_amount] = useState(0);
  const [dropped_amount, set_dropped_amount] = useState(0);
  const [vesting, setVesting] = useState(0);

  const [blocked, setBlocked] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const convDate = (val) => {
    if (val == 0) return '';

    var date = new Date(val);
    return date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() +
      "-" + date.getDate().toString() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  const getAirdrop = () => {

    if (disabled == true) {
      toast.error("You don't have any CLASSICMOON NFTs.");
      return;
    }

    if (blocked == true) {
      return;
    }

    (async () => {

      try {
        if (CLASSICMOON.length == 0) {
          toast.error("You don't have any CLASSICMOON NFTs.");
          return;
        }

        if (Date.now() + 1000 * 60 < next_drop_time) {
          toast.error('Airdrop will be available after ' + (parseInt((next_drop_time - Date.now()) / DAY) + 1).toString() + ' days later.');
          return;
        }

        setBlocked(true);

        let msg = new MsgExecuteContract(
          walletAddress,
          constants.AIRDROP_CONTRACT_ADDRESS,
          {
            airdrop: {}
          }
        );

        let gasPrice = await loadGasPrice('uluna');

        let txOptions = {
          msgs: [msg],
          memo: undefined,
          gasPrices: `${gasPrice}uluna`
        };

        // Signing
        const signMsg = await terraClient?.tx.create(
          [{ address: walletAddress }],
          txOptions
        );

        const taxRate = await loadTaxRate()
        const taxCap = await loadTaxInfo('uluna');
        let tax = calcTax(0, taxCap, taxRate)

        let fee = signMsg.auth_info.fee.amount.add(new Coin('uluna', tax));
        txOptions.fee = new Fee(signMsg.auth_info.fee.gas_limit, fee)

        // Broadcast SignResult
        const txResult = await wallet.post(
          {
            ...txOptions,
          },
          walletAddress
        );

        console.log(txResult);

        setBlocked(false);
      } catch (e) {
        console.log(e);

        setBlocked(false);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        if (walletAddress) {
          const userInfo = await AirdropUserInfo(constants.AIRDROP_CONTRACT_ADDRESS, walletAddress);
          set_last_drop_time(parseInt(userInfo.last_drop_time) * 1000);
          set_next_drop_time(parseInt(userInfo.next_drop_time) * 1000);
          set_pending_amount(userInfo.pending_amount);
          set_dropped_amount(userInfo.dropped_amount);

          if (parseInt(userInfo.pending_amount) == 0) {
            setDisabled(true);
          }

          // Get ClassicMoon NFT Information
          let result = await getNFTList(constants.CLASSICMOON_NFT_Contract_Address, walletAddress);
          setClassicMoon(result.tokens);

          const now = Date.now();

          if (releaseDate + MONTH * 20 > now) {
            setVesting(parseInt((releaseDate + MONTH * 20 - now) / MONTH) * CLASSICMOON.length * 5100000 * (10 ** 6));
          }
        } else {
          setClassicMoon([]);
        }
      } catch (e) {
        if (e.response.data && e.response.data.message && e.response.data.message.startsWith("No NFT:")) {
          toast.error("You don't have any CLASSICMOON NFTs.");
          setDisabled(true);
        } else {
          console.log(e);
        }
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
            {convDate(last_drop_time)}
          </div>
        </div>
      </div>
      <div className="tw-pl-[20px] tw-py-[12px] tw-text-left tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-b-[#ffffff80]">
        <div className='row'>
          <div className='col-6'>
            Next Airdrop is available from:
          </div>
          <div className='col-6'>
            {convDate(next_drop_time)}
          </div>
        </div>
      </div>
      <div className="tw-pl-[20px] tw-py-[12px] tw-text-left tw-border-solid tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b-[1px] tw-border-b-[#ffffff80] tw-mb-[16px]">
        <div className='row'>
          <div className='col-6'>
            CLSM in Vesting Period:
          </div>
          <div className='col-6'>
            {numberWithCommas(parseInt(vesting / (10 ** 6)))}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Available for Airdrop:
          </div>
          <div className='col-6'>
            {numberWithCommas(parseInt(pending_amount / (10 ** 6)))}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Airdrop Collected:
          </div>
          <div className='col-6'>
            {numberWithCommas(parseInt(dropped_amount / (10 ** 6)))}
          </div>
        </div>
      </div>

      {walletAddress ? (
        <button className="tw-text-[18px] tw-bg-[#6812b7cc] hover:tw-bg-[#6812b780] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-text-white tw-px-[12px] tw-py-[3px]" onClick={() => getAirdrop()} disabled={disabled || blocked}>Airdrop</button>
      ) : (
        <ConnectWallet />
      )}
    </div>
  )
}
/*
CLSM in Vesting Period = Number of CLSM NFT held * 5.1M CLSM * Number of months remaining from vesting period
Available for Airdrop = Number of CLSM tokens that is released from Vesting and is accumulated for airdrop (the amount of CLSM tokens not withdrawn yet)
Airdrop Collected = Number of CLSM tokens withdrawn by the user
*/
export default Dropboard;