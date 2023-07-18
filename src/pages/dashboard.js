import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TradingChart from '../components/TradingChart';
import TradingChartDark from '../components/TradingChartDark';
import { ThemeConsumer } from '../context/ThemeContext';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import useAddress from '../context/useAddress';

const Dashboard = () => {

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
  const { getTokenInfo } = useContract();

  useEffect(() => {
    (async () => {
      const data = await getTokenInfo(constants.TCLSM_Contract_Address);
      setTotalSupply(data.total_supply);
    })()
  }, [walletAddress]);

  return (
    <>
      <div className="container-fluid mtb15 no-fluid">
        <div className="row sm-gutters">
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <Sidebar tabIndex={1} />
          </div>
          <div className="col-sm-12 col-lg-8 col-xl-9">
            <div className="tw-border-solid tw-border-[1px] tw-rounded-[16px] tw-p-3 tw-mb-5">
              <div className="row tw-text-white tw-text-[18px] tw-mb-1">
                <div className="col-6 tw-text-right tw-pr-3">CLSM Total Supply:</div>
                <div className="col-6">{totalSupply}</div>
              </div>
              <div className="row tw-text-white tw-text-[18px] tw-mb-1">
                <div className="col-6 tw-text-right tw-pr-3">CLSM Price:</div>
                <div className="col-6">{price}$</div>
              </div>
              <div className="row tw-text-white tw-text-[18px] tw-mb-1">
                <div className="col-6 tw-text-right tw-pr-3">Pooled CLSM:</div>
                <div className="col-6">{pooledCLSM}</div>
              </div>
              <div className="row tw-text-white tw-text-[18px] tw-mb-1">
                <div className="col-6 tw-text-right tw-pr-3">Pooled LUNC:</div>
                <div className="col-6">{pooledLUNC}</div>
              </div>
              <div className="row tw-text-white tw-text-[18px] tw-mb-1">
                <div className="col-6 tw-text-right tw-pr-3">CLSM Burnt:</div>
                <div className="col-6">{burnt}</div>
              </div>
              <div className="row tw-text-white tw-text-[18px] tw-mb-1">
                <div className="col-6 tw-text-right tw-pr-3">LUNC Burnt (Dynamic Mint):</div>
                <div className="col-6">{luncBurnt}</div>
              </div>
              <div className="row tw-text-white tw-text-[18px]">
                <div className="col-6 tw-text-right tw-pr-3">USTC Burnt (Dynamic Mint):</div>
                <div className="col-6">{ustcBurnt}</div>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;