import react, { useEffect, useState } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Coins, Coin, Fee, Numeric, SignerInfo, MsgSend, CreateTxOptions, MsgSwap, MsgExecuteContract } from '@terra-money/terra.js';
import ConnectWallet from './ConnectWallet';
import { calcTax, toAmount, numberWithCommas } from '../utils/utils';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';
import { useClient } from '../context/useClient';
import useTax from '../context/useTax';
import { DateTimePicker } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dropboard = () => {

  const releaseDate = Date.now();
  const DAY = 1000 * 60 * 60 * 24;
  const MONTH = 1000 * 60 * 60 * 24 * 30;

  // Web3
  const wallet = useWallet();
  const constants = getConstants();
  const walletAddress = useAddress();
  const { terraClient } = useClient();
  const { getNFTList, AirdropUserInfo } = useContract();

  const { loadTaxInfo, loadTaxRate, loadGasPrice } = useTax();

  const [CLASSICMOON, setClassicMoon] = useState([]);

  const [blocked, setBlocked] = useState(0);

  const [last_drop_time, set_last_drop_time] = useState(0);
  const [next_drop_time, set_next_drop_time] = useState(0);
  const [pending_amount, set_pending_amount] = useState(0);
  const [dropped_amount, set_dropped_amount] = useState(0);
  const [vesting, setVesting] = useState(0);

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

    if (blocked == 1) {
      return;
    }

    setBlocked(1);
    setTimeout(() => {
      setBlocked(0);
    }, 2000);

    (async () => {

      try {
        if (CLASSICMOON.length == 0) {
          toast.error("You don't have any CLASSICMOON NFTs.");
          return;
        }

        if (Date.now() < next_drop_time) {
          toast.error('Airdrop will be available after ' + ((next_drop_time - Date.now()) / DAY + 1).toString() + ' days later.');
          return;
        }

        let msg = new MsgExecuteContract(
          walletAddress,
          constants.AIRDROP_CONTRACT_ADDRESS,
          {
            airdrop: {}
          }
        );

        // Signing
        const result = await wallet.sign({ msgs: [msg] });

        // Broadcast SignResult
        const tx = result.result
        const txResult = await terraClient?.tx.broadcastSync(tx);

        console.log(txResult);
        //toast.info('Successfully airdropped.');
      } catch (e) {
        console.log(e);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        if (walletAddress) {
          const userInfo = await AirdropUserInfo(constants.AIRDROP_CONTRACT_ADDRESS, walletAddress);
          set_last_drop_time(userInfo.last_drop_time);
          set_next_drop_time(userInfo.next_drop_time);
          set_pending_amount(userInfo.pending_amount);
          set_dropped_amount(userInfo.dropped_amount);

          console.log(userInfo);

          // Get ClassicMoon NFT Information
          let result = await getNFTList(constants.CLASSICMOON_NFT_Contract_Address, walletAddress);
          setClassicMoon(result.tokens);

          setVesting(parseInt((Date.now() - releaseDate) / MONTH) * CLASSICMOON.length * 5100000);
        } else {
          setClassicMoon([]);
        }
      } catch (e) {
        if (e.response.data.message.startsWith("No NFT:")) {
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
            {numberWithCommas(vesting)}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Available for Airdrop:
          </div>
          <div className='col-6'>
            {numberWithCommas(pending_amount)}
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            Airdrop Collected:
          </div>
          <div className='col-6'>
            {numberWithCommas(dropped_amount)}
          </div>
        </div>
      </div>

      {walletAddress ? (
        <button className="tw-text-[18px] tw-bg-[#6812b7cc] hover:tw-bg-[#6812b780] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-text-white tw-px-[12px] tw-py-[3px]" onClick={() => getAirdrop()} disabled={disabled}>Airdrop</button>
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