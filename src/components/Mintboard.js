import react, { useEffect, useState } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import ConnectWallet from './ConnectWallet';
import TokenModal from './TokenModal';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';

import './Mintboard.css';

const Mintboard = () => {

  const decimals = 6;

  // Web3
  const constants = getConstants();
  const walletAddress = useAddress();
  const { getTokenBalance, getNativeBalance, getNFTList } = useContract();


  const { status } = useWallet();

  const MAX_TOTAL_SUPPLY = 200000000000; // 200B

  const [luncEnabled, setLuncEnabled] = useState(false);
  const [ustcEnabled, setUstcEnabled] = useState(false);
  const [totalSupply, setTotalSupply] = useState(15000000000);

  const [token1Count, setToken1Count] = useState(0);
  const [token2Count, setToken2Count] = useState(0);

  const handleChange1 = (e) => {
    setToken1Count(e.target.value);
  }
  const handleChange2 = (e) => {
    setToken2Count(e.target.value);
  }

  const mintLUNC = () => {
    console.log(token1Count);
  }
  const mintUSTC = () => {
    console.log(token2Count);
  }

  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [fromImg, setFromImg] = useState("img/icon/lunc.png");
  const [toImg, setToImg] = useState("img/icon/clsm.png");
  const [from, setFrom] = useState("LUNC");

  useEffect(() => {
    if (typeof value1 !== 'number') {
      setValue2('');
      return;
    }

    setValue2(value1 * 100);
  }, [value1]);

  const handleAmount = (e) => {
    setValue1(e.target.value);
  };

  const setMaximize = () => {
    // balance -> maximize
  };

  const handleSubmit = () => {
    const feeSymbol = "uluna"; // LUNC
    const gasPrice = loadGasPrice();

    if (from == "LUNC") {
      console.log("LUNC");
    } else {
      console.log("USTC");
    }
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

  const selectToken = (val) => {
    if (val == 1) {
      setFrom("LUNC");
      setFromImg("img/icon/lunc.png");

      if (walletAddress) {
        (async () => {
          // LUNC tokens balance
          let balance = await getNativeBalance(walletAddress);
          if (balance.length > 0) {
            setBalance1(balance[0].amount / (10 ** decimals));
          }
        })();
      } else {
        setBalance1(0);
        setBalance2(0);
      }
    } else {
      setFrom("USTC");
      setFromImg("img/icon/ustc.png");

      if (walletAddress) {
        (async () => {
          // USTC tokens balance
          let balance = await getTokenBalance(constants.USTC_Contract_Address, walletAddress);
          setBalance1(parseFloat(balance / (10 ** decimals)));
        })();
      } else {
        setBalance1(0);
        setBalance2(0);
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (walletAddress) {
        // CLSM tokens balance
        let balance = await getTokenBalance(constants.TCLSM_Contract_Address, walletAddress);
        setBalance2(parseFloat(balance / (10 ** decimals)));
      } else {
        setBalance1(0);
        setBalance2(0);
      }
    })()
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      (async () => {
        // LUNC tokens balance
        let balance = await getNativeBalance(walletAddress);
        if (balance.length > 0) {
          setBalance1(balance[0].amount / (10 ** decimals));
        }
      })();

      let result = getNFTList(constants.CLASSICMOON_NFT_Contract_Address, walletAddress);
      console.log(result);
    }
  }, []);

  // :: after 60, 90 days, LUNC, USTC enabled
  // :: less than 200B

  /*
    NFT Contract address 1: terra1g7we2dvzgyfyh39zg44n0rlyh9xh4ym9z0wut7
    NFT Contract address 2: terra15tuwx3r2peluez6sh4yauk4ztry5dg5els4rye534v9n8su5gacs259p77
    Dynamic Mint is enabled only after above said duration of contract deployment
    Dynamic Mint is enabled only if the Total Supply of CLSM is less than 200 B CLSM
  */

  return (
    <>
      <TokenModal selectToken={selectToken} isOpen={isOpen} open={openModal} close={closeModal} />

      <div className="tw-flex tw-justify-center">
        <div className="tw-w-full tw-max-w-[434px] tw-border-solid tw-border-[1px] tw-rounded-lg">
          <div className="tw-text-white tw-flex tw-justify-between tw-items-center tw-px-[16px] tw-pt-[16px]">
            <div className="tw-text-[24px] tw-px-[12px] tw-border-[1px] tw-border-solid tw-border-[#13214d] tw-rounded-[5px]">Mint</div>
          </div>

          <div className="tw-text-white tw-items-center tw-m-[16px] tw-p-[12px] tw-border-solid tw-border-[1px] tw-rounded-lg">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>You Burn</div>
              <div>
                Balance: {balance1}
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
              <div className="tw-flex tw-items-center tw-cursor-pointer" onClick={openModal}>
                <img src={fromImg} className="tw-w-[24px]"></img>
                <div className="tw-pl-[6px] tw-pr-[14px]">{from}</div>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-justify-center tw-mb-[16px]">
            <button className="tw-text-white tw-bg-[#00000000] tw-border-[1px] tw-border-solid tw-border-[#13214d] tw-rounded-[3px] tw-p-1">
              <img src="img/reverse.svg" className="tw-rotate-180 tw-w-[24px]"></img>
            </button>
          </div>

          <div className="tw-text-white tw-items-center tw-m-[16px] tw-p-[12px] tw-border-solid tw-border-[1px] tw-rounded-lg">
            <div className="tw-flex tw-justify-between tw-items-center">
              <div>You Get</div>
              <div>
                Balance: {balance2}
              </div>
            </div>
            <div className="tw-flex tw-justify-between">
              <input
                type="number"
                className="tw-bg-[#00000000] tw-text-white tw-border-none tw-w-full tw-outline-transparent"
                placeholder="0.000000"
                value={value2}
                onChange={(e) => { }}
              ></input>
              <div className="tw-flex tw-items-center">
                <img src={toImg} className="tw-w-[24px]"></img>
                <div className="tw-pl-[6px] tw-pr-[14px]">CLSM</div>
              </div>
            </div>
          </div>

          <div className="tw-flex tw-justify-center tw-mb-[16px]">
            {status === WalletStatus.WALLET_CONNECTED ? (
              <button className="tw-text-[18px] tw-text-white  tw-bg-[#6812b7cc] hover:tw-bg-[#6812b780] tw-border-[#6812b7] tw-border-solid tw-border-[1px] tw-rounded-lg tw-px-[12px] tw-py-[6px]" onClick={handleSubmit}>Mint</button>
            ) : (
              <ConnectWallet />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Mintboard;
