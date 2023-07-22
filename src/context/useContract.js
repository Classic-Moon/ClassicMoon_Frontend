import { createContext, useCallback, useContext, useState } from 'react';
import { useWallet } from "@terra-money/wallet-provider"
import { Coins, Coin, Fee, MsgSend, CreateTxOptions, MsgSwap, MsgExecuteContract } from '@terra-money/terra.js';
import useAddress from './useAddress';
import { useClient } from './useClient';
import { networks, NET_NAME } from '../utils/networks';
import useURL from './useURL';
import axios from 'axios';

const ContractContext = createContext();
const useContract = () => useContext(ContractContext);

const ContractProvider = ({ children }) => {
  const { terraClient } = useClient();
  const getURL = useURL();
  const walletAddress = useAddress();
  const wallet = useWallet()
  const network = networks[NET_NAME];

  //--------------------------------------------//
  //                  QueryMsgs                 //
  //--------------------------------------------//

  /* Dashboard */
  const getTokenInfo = useCallback(async (contract) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        token_info: {}
      }
    );
    return res;
  }, [terraClient])

  const getDynamicMint = useCallback(async (contract) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        dynamic: {}
      }
    );
    return res;
  }, [terraClient])

  /* Swap */
  const getSimulation = useCallback(async (contract, tokenInfo, amount) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        simulation: {
          offer_asset: {
            info: tokenInfo,
            amount: amount.toString()
          }
        }
      }
    );
    return res;
  }, [terraClient])

  const getReverseSimulation = useCallback(async (contract, tokenInfo, amount) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        reverse_simulation: {
          ask_asset: {
            info: tokenInfo,
            amount: amount.toString()
          }
        }
      }
    );
    return res;
  }, [terraClient])

  /* Mint */
  const IsMintableByLunc = useCallback(async (contract, address) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        is_mintable_by_lunc: {
          account: address
        }
      }
    );
    return res;
  }, [terraClient])

  const IsMintableByUstc = useCallback(async (contract, address) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        is_mintable_by_ustc: {
          account: address
        }
      }
    );
    return res;
  }, [terraClient])

  const GetAmountMint = useCallback(async (contract, tokenInfo, amount) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        get_amount_mint: {
          offer_asset: {
            info: tokenInfo,
            amount: amount.toString()
          }
        }
      }
    );
    return res;
  }, [terraClient])

  const GetAmountLunc = useCallback(async (contract, amount) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        get_amount_lunc: {
          mint_amount: amount
        }
      }
    );
    return res;
  }, [terraClient])

  const GetAmountUstc = useCallback(async (contract, amount) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        get_amount_ustc: {
          mint_amount: amount
        }
      }
    );
    return res;
  }, [terraClient])

  /* Airdrop */
  const AirdropGlobalInfo = useCallback(async (contract) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        airdrop_global_info: {}
      }
    );
    return res;
  }, [terraClient])

  const AirdropNftInfo = useCallback(async (contract, tokenId) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        airdrop_nft_info: {
          token_id: tokenId
        }
      }
    );
    return res;
  }, [terraClient])

  const AirdropUserInfo = useCallback(async (contract, address) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        airdrop_user_info: {
          account: address
        }
      }
    );
    return res;
  }, [terraClient])

  /* Common */
  const getNFTList = useCallback(async (contract, address) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        tokens: {
          owner: address
        }
      }
    );
    return res;
  }, [terraClient])

  const getNativeBalance = useCallback(async (address) => {
    const [balance] = await terraClient?.bank.balance(address);
    return balance.toData();
  }, [terraClient])

  const getTokenBalance = useCallback(async (contract, address) => {
    const res = await terraClient?.wasm.contractQuery(
      contract,
      {
        balance: {
          address: address
        }
      }
    );
    return res.balance;
  }, [terraClient])

  //--------------------------------------------//
  //                 ExecuteMsgs                //
  //--------------------------------------------//

  const value = {
    // dashboard
    getTokenInfo,
    getDynamicMint,

    // swap
    getSimulation,
    getReverseSimulation,

    // mint
    IsMintableByLunc,
    IsMintableByUstc,
    GetAmountMint,
    GetAmountLunc,
    GetAmountUstc,

    // airdrop
    AirdropGlobalInfo,
    AirdropNftInfo,
    AirdropUserInfo,

    // common
    getNativeBalance,
    getTokenBalance,
    getNFTList,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

export { useContract, ContractProvider }
