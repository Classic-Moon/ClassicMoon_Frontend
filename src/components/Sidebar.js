import React, { useState } from 'react';
import { Link } from '@reach/router';

import './Sidebar.css';

const Sidebar = () => {

  function handleClick(tab) {
    for (let i = 1; i <= 5; i++) {
      document.getElementById('menu-' + i).classList.remove('active1');
    }
    document.getElementById('menu-' + tab).classList.add('active1');
  }

  return (
    <div className="row tw-m-[3px] tw-border-solid tw-border-[1px] tw-border-[#2030f0c0] tw-rounded-lg">
      <div className="col-sm-3 col-md-3 col-lg-12 tw-p-[10px] tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-transparent" onClick={() => handleClick(1)}>
        <Link id="menu-1" className="tw-text-[24px] tw-text-white tw-flex tw-justify-center active1" to="/">
          Dashboard
        </Link>
      </div>

      <div className="col-sm-3 col-md-3 col-lg-12 tw-p-[10px] tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-transparent" onClick={() => handleClick(2)}>
        <Link id="menu-2" className="tw-text-[24px] tw-text-white tw-flex tw-justify-center" to="/swap">
          Swap
        </Link>
      </div>

      <div className="col-sm-3 col-md-3 col-lg-12 tw-p-[10px] tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-transparent" onClick={() => handleClick(3)}>
        <Link id="menu-3" className="tw-text-[24px] tw-text-white tw-flex tw-justify-center" to="/mint">
          Mint
        </Link>
      </div>

      <div className="col-sm-3 col-md-3 col-lg-12 tw-p-[10px] tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-transparent" onClick={() => handleClick(4)}>
        <Link id="menu-4" className="tw-text-[24px] tw-text-white tw-flex tw-justify-center" to="/airdrop">
          Airdrop
        </Link>
      </div>

      <div className="col-sm-3 col-md-3 col-lg-12 tw-p-[10px] tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-transparent" onClick={() => handleClick(5)}>
        <Link id="menu-5" className="tw-text-[24px] tw-text-white tw-flex tw-justify-center" to="/nfts">
          My NFTs
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;