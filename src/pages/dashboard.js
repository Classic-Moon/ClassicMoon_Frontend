import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TradingChart from '../components/TradingChart';
import TradingChartDark from '../components/TradingChartDark';
import { ThemeConsumer } from '../context/ThemeContext';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';
import { numberWithCommas } from '../utils/utils';

const Dashboard = () => {

  const decimals = 6;

  const [totalSupply, setTotalSupply] = useState(0);
  const [price, setPrice] = useState(0);
  const [pooledCLSM, setPooledCLSM] = useState(0);
  const [pooledLUNC, setPooledLUNC] = useState(0);
  const [burnt, setBurnt] = useState(0);
  const [luncBurnt, setLuncBurnt] = useState(0);
  const [ustcBurnt, setUstcBurnt] = useState(0);

  // Web3
  const constants = getConstants();
  const walletAddress = useAddress();
  const { loadTokenInfo } = useContract();

  useEffect(() => {
    (async () => {
      const data = await loadTokenInfo(constants.TCLSM_Contract_Address);
      setTotalSupply(data.total_supply);
    })()
  }, [walletAddress]);

  return (
    <>
      <div className="tw-border-solid tw-border-[1px] tw-rounded-lg tw-p-3 tw-mb-5"
        style={{ background: 'linear-gradient(135deg, #806e996b, #8535bf6b, #794b9b8c)' }}>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Total Supply:</div>
          <div className="col-6">{numberWithCommas(totalSupply / (10 ** decimals))}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Price:</div>
          <div className="col-6">{numberWithCommas(price.toFixed(3))}$</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">Pooled CLSM:</div>
          <div className="col-6">{numberWithCommas(pooledCLSM / (10 ** decimals))}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">Pooled LUNC:</div>
          <div className="col-6">{numberWithCommas(pooledLUNC / (10 ** decimals))}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Burnt:</div>
          <div className="col-6">{numberWithCommas(burnt / (10 ** decimals))}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">LUNC Burnt (Dynamic Mint):</div>
          <div className="col-6">{numberWithCommas(luncBurnt / (10 ** decimals))}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px]">
          <div className="col-6 tw-text-right tw-pr-3">USTC Burnt (Dynamic Mint):</div>
          <div className="col-6">{numberWithCommas(ustcBurnt / (10 ** decimals))}</div>
        </div>
      </div>

      <ThemeConsumer>
        {({ data }) => {
          return data.theme === 'light' ? (
            <TradingChart />
          ) : (
            <TradingChartDark />
          );
        }}
      </ThemeConsumer>
    </>
  )
}

export default Dashboard;