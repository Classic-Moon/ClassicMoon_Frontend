import React, { useState, useEffect } from 'react';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';
import { numberWithCommas } from '../utils/utils';
import Chart from 'chart.js/auto'

import TradingChartDark from '../components/TradingChartDark';

const Dashboard = () => {

  const decimals = 6;

  const [timer, setTimer] = useState(0);

  const [totalSupply, setTotalSupply] = useState(0);
  const [circulationSupply, setCirculationSupply] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [pooledCLSM, setPooledCLSM] = useState(0);
  const [pooledLUNC, setPooledLUNC] = useState(0);
  const [burnt, setBurnt] = useState(0);
  const [luncBurnt, setLuncBurnt] = useState(0);
  const [ustcBurnt, setUstcBurnt] = useState(0);
  const [clsmMinted, setCLSMMinted] = useState(0);

  // Web3
  const constants = getConstants();
  const {
    getTokenInfo,
    getTokenBalance,
    getNativeBalance,
    getDynamicMint
  } = useContract();

  useEffect(() => {
    (async () => {
      try {
        const data = await getTokenInfo(constants.TOKEN_CONTRACT_ADDRESS);
        setTotalSupply(data.total_supply);
        console.log(data);
        setSymbol(data.symbol);

        let balance = await getTokenBalance(constants.TOKEN_CONTRACT_ADDRESS, constants.POOL_CONTRACT_ADDRESS);
        setPooledCLSM(balance);
        let arr = await getNativeBalance(constants.POOL_CONTRACT_ADDRESS);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].denom == 'uluna') {
            setPooledLUNC(arr[i].amount);
            break;
          }
        }

        balance = await getTokenBalance(constants.TOKEN_CONTRACT_ADDRESS, constants.BURN_ADDRESS);
        setBurnt(balance);


        let treasury = await getTokenBalance(constants.TOKEN_CONTRACT_ADDRESS, constants.TREASURY_WALLET_ADDRESS);
        console.log(treasury);
        setCirculationSupply(6800000000000000000 - treasury - balance);

        const dynamicInfo = await getDynamicMint(constants.DYNAMIC_CONTRACT_ADDRESS);
        setLuncBurnt(dynamicInfo.total_lunc_burn_amount);
        setUstcBurnt(dynamicInfo.total_ustc_burn_amount);
        setCLSMMinted(dynamicInfo.total_minted_clsm_amount);
      } catch (e) {
        console.log(e);
      }
    })()

    // reload chart graph
    setTimeout(() => {

      setTimer((timer + 1) % 3);

      // Reload graph
    }, 60000); // every 1 minute
  }, [timer]);

  useEffect(() => {
    const intervalId = setInterval(() => {

      const ctx = document.getElementById('myChart');
      if (ctx == null || ctx == undefined) {
        return;
      }

      clearInterval(intervalId);

      try {
        new Chart(ctx, {
          type: 'line',
          data: {
            datasets: [{
              label: 'CLSM Price',
              // stepped: true,
              data: [{
                x: '2023-11-06 23:39:30',
                y: 50
              }, {
                x: '2023-11-07 01:00:28',
                y: 60
              }, {
                x: '2023-11-07 01:05:28',
                y: 30
              }, {
                x: '2023-11-07 02:00:28',
                y: 60
              }, {
                x: '2023-11-07 02:05:28',
                y: 30
              }, {
                x: '2023-11-07 09:00:28',
                y: 20
              }]
            }],
          },
          options: {
            responsive: true,
            interaction: {
              intersect: false,
              axis: 'x'
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  return (
    <>
      <div className="tw-border-solid tw-border-[1px] tw-rounded-lg tw-p-3 tw-mb-5"
        style={{ background: 'linear-gradient(135deg, #806e996b, #8535bf6b, #794b9b8c)' }}>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Total Supply:</div>
          <div className="col-6">{numberWithCommas(totalSupply / (10 ** decimals))}&nbsp;{symbol}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Circulation Supply:</div>
          <div className="col-6">{numberWithCommas(circulationSupply / (10 ** decimals))}&nbsp;{symbol}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Price:</div>
          <div className="col-6">{numberWithCommas(price.toFixed(3))}$</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">Pooled CLSM:</div>
          <div className="col-6">{numberWithCommas(pooledCLSM / (10 ** decimals))} {symbol}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">Pooled LUNC:</div>
          <div className="col-6">{numberWithCommas(pooledLUNC / (10 ** decimals))} LUNC</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Burnt:</div>
          <div className="col-6">{numberWithCommas(burnt / (10 ** decimals))} {symbol}</div>
        </div>
        <div className="row tw-text-white tw-text-[18px] tw-mb-1">
          <div className="col-6 tw-text-right tw-pr-3">LUNC Burnt (Dynamic Mint):</div>
          <div className="col-6">{numberWithCommas(luncBurnt / (10 ** decimals))} LUNC</div>
        </div>
        <div className="row tw-text-white tw-text-[18px]">
          <div className="col-6 tw-text-right tw-pr-3">USTC Burnt (Dynamic Mint):</div>
          <div className="col-6">{numberWithCommas(ustcBurnt / (10 ** decimals))} USTC</div>
        </div>
        <div className="row tw-text-white tw-text-[18px]">
          <div className="col-6 tw-text-right tw-pr-3">CLSM Minted (Dynamic Mint):</div>
          <div className="col-6">{numberWithCommas(clsmMinted / (10 ** decimals))} {symbol}</div>
        </div>
      </div>

      <div style={{ display: 'none' }}>
        <canvas id="myChart"></canvas>
      </div>

      <TradingChartDark />
    </>
  )
}

export default Dashboard;