import react, { useEffect, useState } from 'react';
import { Coins, Coin, Fee, Numeric, SignerInfo, MsgSend, CreateTxOptions, MsgSwap, MsgExecuteContract } from '@terra-money/terra.js';
import { useWallet } from '@terra-money/wallet-provider';
import { useClient } from '../context/useClient';
import ConnectWallet from './ConnectWallet';
import SettingModal from './SettingModal';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';
import { calcTax, toAmount, numberWithCommas } from '../utils/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTax from '../context/useTax';

import './Swapboard.css'
import { LocalConvenienceStoreOutlined, SettingsInputAntenna } from '@mui/icons-material';
import { relativeTimeRounding } from 'moment/moment';

const Swapboard = () => {

  const decimals = 6;

  const [isDisabledSwap, setIsDisabledSwap] = useState(false);

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
  const wallet = useWallet();
  const { terraClient } = useClient();
  const constants = getConstants();
  const walletAddress = useAddress();
  const { getTokenBalance, getNativeBalance, getSimulation, getReverseSimulation } = useContract();
  const { loadTaxInfo, loadTaxRate, loadGasPrice } = useTax();

  useEffect(() => {
    (async () => {
      if (walletAddress) {

        let balance;

        // CLSM tokens balance
        balance = await getTokenBalance(constants.TOKEN_CONTRACT_ADDRESS, walletAddress);
        setBalance1(balance);

        // LUNC tokens balance
        balance = await getNativeBalance(walletAddress);
        if (balance.length > 0) {
          for (let i = 0; i < balance.length; i++) {
            if (balance[i].denom == 'uluna') {
              setBalance2(balance[i].amount);
              break;
            }
          }
        }
      } else {
        setValue1(undefined);
        setValue2(undefined);
      }
    })()
  }, [walletAddress]);

  const reload = async () => {
    try {
      let balance;

      // CLSM tokens balance
      balance = await getTokenBalance(constants.TOKEN_CONTRACT_ADDRESS, walletAddress);

      if (!isReversed) {
        setBalance1(balance);
      } else {
        setBalance2(balance);
      }

      // LUNC tokens balance
      balance = await getNativeBalance(walletAddress);
      if (balance.length > 0) {
        for (let i = 0; i < balance.length; i++) {
          if (balance[i].denom == 'uluna') {
            if (!isReversed) {
              setBalance2(balance[i].amount);
            } else {
              setBalance1(balance[i].amount);
            }
            break;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setFrom(!isReversed ? "CLSM" : "LUNC");
    setTo(!isReversed ? "LUNC" : "CLSM");
    setFromImg(!isReversed ? "img/icon/clsm.png" : "img/icon/lunc.png");
    setToImg(!isReversed ? "img/icon/lunc.png" : "img/icon/clsm.png");
  }, [isReversed]);

  const handleAmount1 = (e) => {
    procAmount1(e.target.value);
  }

  const handleAmount2 = (e) => {
    procAmount2(e.target.value);
  }

  const procAmount1 = (tvalue) => {
    if (tvalue == '' || tvalue == undefined) {
      // clear
      setValue1(undefined);
      setValue2(undefined);
    } else {
      let val = parseInt(parseFloat(tvalue) * (10 ** decimals));
      if (val > (!isReversed ? balance1 : balance2)) {
        val = (!isReversed ? balance1 : balance2);
      }

      setValue1(val);

      (async () => {
        try {
          let simulation;
          if (isReversed == false) {
            simulation = await getSimulation(
              constants.POOL_CONTRACT_ADDRESS,
              {
                token: {
                  contract_addr: constants.TOKEN_CONTRACT_ADDRESS
                }
              },
              val
            );

            console.log(simulation, balance2);

            let amount = parseInt(simulation.return_amount);
            if (amount > balance2) {
              setValue2(balance2);
            } else {
              setValue2(amount);
            }
          } else {
            simulation = await getSimulation(
              constants.POOL_CONTRACT_ADDRESS,
              {
                native_token: {
                  denom: 'uluna'
                }
              },
              val
            );

            console.log(simulation, balance1);

            let amount = parseInt(simulation.return_amount);
            if (amount > balance1) {
              setValue2(balance1);
            } else {
              setValue2(amount);
            }
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  };

  const procAmount2 = (tvalue) => {
    if (tvalue == '' || tvalue == undefined) {
      // clear
      setValue1(undefined);
      setValue2(undefined);
    } else {
      let val = parseInt(parseFloat(tvalue) * (10 ** decimals));
      if (val > (!isReversed ? balance2 : balance1)) {
        val = (!isReversed ? balance2 : balance1);
      }

      setValue2(val);

      (async () => {
        try {
          let simulation;
          if (isReversed == false) {
            simulation = await getReverseSimulation(
              constants.POOL_CONTRACT_ADDRESS,
              {
                native_token: {
                  denom: 'uluna'
                }
              },
              val
            );

            setValue1(simulation.offer_amount);
          } else {
            simulation = await getReverseSimulation(
              constants.POOL_CONTRACT_ADDRESS,
              {
                token: {
                  contract_addr: constants.TOKEN_CONTRACT_ADDRESS
                }
              },
              val
            );

            setValue1(simulation.offer_amount);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  };

  const handleSwitchToken = () => {
    setValue1(undefined);
    setValue2(undefined);

    setIsReversed(!isReversed);
  };

  const setMaximize = () => {
    // balance -> maximize
    procAmount1(!isReversed ? balance1 : balance2);
  };

  const handleSetting = () => {
    openModal();
  };

  const handleReload = () => {
    setValue1(undefined);
    setValue2(undefined);

    setIsReversed(false);
  };

  const handleSubmit = () => {
    const feeSymbol = "uluna"; // LUNC
    const slippageTolerance = (parseFloat(slippage === custom ? custom : slippage) / 100).toFixed(3);
    const txDeadlineMinute = txDeadline ? txDeadline : 20; // Default is 20 mins.

    console.log(slippageTolerance);

    (async () => {
      if (wallet.status == "WALLET_CONNECTED") {

        setIsDisabledSwap(true);

        let msg;
        if (isReversed == false) {
          const hookMsg = {
            swap: {}
          };
          msg = new MsgExecuteContract(
            walletAddress,
            constants.TOKEN_CONTRACT_ADDRESS,
            {
              send: {
                contract: constants.POOL_CONTRACT_ADDRESS,
                amount: value1,
                msg: btoa(JSON.stringify(hookMsg))
              }
            }
          );
        } else {
          msg = new MsgExecuteContract(
            walletAddress,
            constants.POOL_CONTRACT_ADDRESS,
            {
              swap: {
                offer_asset: {
                  info: {
                    native_token: {
                      denom: 'uluna'
                    }
                  },
                  amount: value1.toString()
                },
              }
            },
            [new Coin('uluna', value1)]
          );
        }

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
        let tax = calcTax(toAmount(value1), taxCap, taxRate)

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

        setIsDisabledSwap(false);

        reload();
      }
    })();
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
                Balance: {!isReversed ?
                  numberWithCommas((balance1 / (10 ** decimals)).toFixed(2)) :
                  numberWithCommas((balance2 / (10 ** decimals)).toFixed(2))
                }
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
                value={value1 == undefined ? '' : value1 / (10 ** decimals).toFixed(6)}
                onChange={handleAmount1}
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
                Balance: {
                  !isReversed ?
                    numberWithCommas((balance2 / (10 ** decimals)).toFixed(2)) :
                    numberWithCommas((balance1 / (10 ** decimals)).toFixed(2))
                }
              </div>
            </div>
            <div className="tw-flex tw-justify-between">
              <input
                type="number"
                className="tw-bg-[#00000000] tw-text-white tw-border-none tw-w-full tw-outline-transparent"
                placeholder="0.000000"
                value={value2 == undefined ? '' : value2 / (10 ** decimals).toFixed(6)}
                onChange={handleAmount2}
              ></input>
              <div className="tw-flex tw-items-center">
                <img src={toImg} className="tw-w-[24px]"></img>
                <div className="tw-pl-[6px] tw-pr-[14px]">{to}</div>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-justify-center tw-mb-[16px]">
            {walletAddress ? (
              <button className="tw-text-[18px] tw-text-white tw-bg-[#6812b7cc] hover:tw-bg-[#6812b780] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-px-[12px] tw-py-[6px]" onClick={handleSubmit} disabled={isDisabledSwap}>Swap</button>
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