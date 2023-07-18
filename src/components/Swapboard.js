import react, { useEffect, useState } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import ConnectWallet from './ConnectWallet';
import SettingModal from './SettingModal';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';

import './Swapboard.css'

const Swapboard = () => {

  const { status } = useWallet();

  const [decimals, setDecimals] = useState(6);

  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);
  const [value1, setValue1] = useState(undefined);
  const [value2, setValue2] = useState(undefined);
  const [fromImg, setFromImg] = useState("img/icon/clsm.png");
  const [toImg, setToImg] = useState("img/icon/lunc.png");
  const [from, setFrom] = useState("CLSM");
  const [to, setTo] = useState("LUNC");

  const [isReversed, setIsReversed] = useState(false);

  // TxOptions
  const [slippage, setSlippage] = useState(0.1);
  const [custom, setCustom] = useState(undefined);
  const [txDeadline, setTxDeadline] = useState(20);


  // Web3
  const constants = getConstants();
  const walletAddress = useAddress();
  const { getTokenBalance, getNativeBalance } = useContract();

  useEffect(() => {
    (async() => {
      if (walletAddress) {

        let balance;

        // CLSM tokens balance
        balance = await getTokenBalance(constants.TCLSM_Contract_Address, walletAddress);
        setBalance1(parseFloat(balance / (10 ** decimals)));

        // LUNC tokens balance
        balance = await getNativeBalance(walletAddress);
        if (balance.length > 0) {
          setBalance2(balance[0].amount / (10 ** decimals));
        }
      }
    })()
  }, [walletAddress]);

  useEffect(() => {
    setFrom(!isReversed ? "CLSM" : "LUNC");
    setTo(!isReversed ? "LUNC" : "CLSM");
    setFromImg(!isReversed ? "img/icon/clsm.png" : "img/icon/lunc.png");
    setToImg(!isReversed ? "img/icon/lunc.png" : "img/icon/clsm.png");
  }, [isReversed]);

  useEffect(() => {
    if (value1 === undefined) {
      return;
    }
    let data = parseFloat(value1).toFixed(decimals);

    if (isReversed == false) {
      setValue2(data * 10);
    } else {
      setValue2(data * 100);
    }
  }, [value1]);

  const handleAmount = (e) => {
    setValue1(e.target.value);
  };

  const handleSwitchToken = () => {
    setValue1('');
    setValue2('');

    setIsReversed(!isReversed);
  };

  const setMaximize = () => {
    // balance -> maximize
    setValue1(!isReversed ? balance1 : balance2);
  };

  const handleSetting = () => {
    openModal();
  };

  const handleReload = () => {
    setValue1('');
    setValue2('');

    setIsReversed(false);
  };

  const handleSubmit = () => {
    const feeSymbol = "uluna"; // LUNC
    const gasPrice = loadGasPrice();
    const slippageTolerance = (parseFloat(slippage === custom ? custom : slippage) / 100).toFixed(3);
    const txDeadlineMinute = txDeadline ? txDeadline : 20; // Default is 20 mins.
  };

  const loadGasPrice = () => {
    // load gasPrice
    return 10;
  };

  const [isOpen, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const setSlippageFunc = (val) => {
    setSlippage(val);
  };

  const setTxDeadlineFunc = (val) => {
    setTxDeadline(val);
  };

  return (
    <>
      <SettingModal setSlippage={setSlippageFunc} setTxDeadline={setTxDeadlineFunc} txDeadline={txDeadline} isOpen={isOpen} open={openModal} close={closeModal} />

      <div className="tw-flex tw-justify-center">
        <div className="tw-w-full tw-max-w-[434px] tw-border-solid tw-border-[1px] tw-rounded-lg">
          <div className="tw-text-white tw-flex tw-justify-between tw-items-center tw-px-[16px] tw-pt-[16px]">
            <div className="tw-text-[24px] tw-px-[12px] tw-border-[1px] tw-border-solid tw-border-[#13214d] tw-rounded-[5px]">Swap</div>
            <div>
              <button style={{ background: 'transparent' }} className="tw-border-0" onClick={handleSetting}><img id="img-setting" src="img/icon-settings.svg"></img></button>
              <button style={{ background: 'transparent' }} className="tw-border-0 tw-ml-3" onClick={handleReload}><img id="img-reload" src="img/icon-reload.svg"></img></button>
            </div>
          </div>

          <div className="tw-text-white tw-items-center tw-m-[16px] tw-p-[12px] tw-border-solid tw-border-[1px] tw-rounded-lg">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>You Sell</div>
              <div>
                Balance: {!isReversed ? balance1 : balance2}
                <button
                  className="tw-h-[28px] tw-text-white tw-p-[5px] tw-ml-[5px] tw-border-[1px] tw-border-solid tw-border-[#13214d] tw-rounded-[3px] hover:tw-bg-[#ffffff80]"
                  style={{ background: 'transparent', alignItems: 'center' }}
                  onClick={setMaximize}
                >MAX</button>
              </div>
            </div>
            <div className="tw-flex tw-justify-between">
              <input
                type="number"
                className="tw-bg-[#00000000] tw-text-white tw-border-none tw-w-full"
                placeholder="0.000000"
                value={value1}
                onChange={handleAmount}
              ></input>
              <div className="tw-flex tw-items-center">
                <img src={fromImg} className="tw-w-[24px]"></img>
                <div className="tw-pl-[6px] tw-pr-[14px]">{from}</div>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-justify-center tw-mb-[16px]">
            <button className="tw-text-white tw-bg-[#00000000]  tw-border-[1px] tw-border-solid tw-border-[#13214d] tw-rounded-[3px] tw-p-1" onClick={handleSwitchToken}>
              <img src="img/exchange.svg" className="tw-rotate-90 tw-w-[24px]"></img>
            </button>
          </div>

          <div className="tw-text-white tw-items-center tw-m-[16px] tw-p-[12px] tw-border-solid tw-border-[1px] tw-rounded-lg">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>You Get</div>
              <div>
                Balance: {!isReversed ? balance2 : balance1}
              </div>
            </div>
            <div className="tw-flex tw-justify-between">
              <input
                type="number"
                className="tw-bg-[#00000000] tw-text-white tw-border-none tw-w-full tw-outline-transparent"
                placeholder="0.000000"
                value={value2}
                readOnly
              ></input>
              <div className="tw-flex tw-items-center">
                <img src={toImg} className="tw-w-[24px]"></img>
                <div className="tw-pl-[6px] tw-pr-[14px]">{to}</div>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-justify-center tw-mb-[16px]">
            {status === WalletStatus.WALLET_CONNECTED ? (
              <button className="tw-text-[18px] tw-text-white tw-bg-[#6812b7cc] hover:tw-bg-[#6812b780] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-px-[12px] tw-py-[6px]" onClick={handleSubmit}>Swap</button>
            ) : (
              <ConnectWallet />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Swapboard;