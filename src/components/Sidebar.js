import React, { useState } from 'react';

const Sidebar = (props) => {

  function handleClick(tab) {
    switch (tab) {
      case 1:
        window.location = '/';
        break;
      case 2:
        window.location = '/swap';
        break;
      case 3:
        window.location = '/mint';
        break;
      case 4:
        window.location = '/airdrop';
        break;
      case 5:
        window.location = '/nfts';
        break;
    }
  }

  return (
    <div className="row tw-m-[3px]">
      {props.tabIndex == 1 ?
        (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-indigo-600" onClick={() => handleClick(1)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Dashboard
            </a>
          </div>
        ) : (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md  tw-text-center tw-p-1 tw-cursor-pointer hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-indigo-600 tw-border-solid tw-border-[1px] tw-border-[#00000000]" onClick={() => handleClick(1)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Dashboard
            </a>
          </div>
        )}

      {props.tabIndex == 2 ?
        (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-indigo-600" onClick={() => handleClick(2)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Swap
            </a>
          </div>
        ) : (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-indigo-600 tw-border-solid tw-border-[1px] tw-border-[#00000000]" onClick={() => handleClick(2)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Swap
            </a>
          </div>
        )}

      {props.tabIndex == 3 ?
        (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-indigo-600" onClick={() => handleClick(3)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Mint
            </a>
          </div>
        ) : (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-indigo-600 tw-border-solid tw-border-[1px] tw-border-[#00000000]" onClick={() => handleClick(3)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Mint
            </a>
          </div>
        )}

      {props.tabIndex == 4 ?
        (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-indigo-600" onClick={() => handleClick(4)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Airdrop
            </a>
          </div>
        ) : (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-indigo-600 tw-border-solid tw-border-[1px] tw-border-[#00000000]" onClick={() => handleClick(4)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              Airdrop
            </a>
          </div>
        )}

      {props.tabIndex == 5 ?
        (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer tw-border-solid tw-border-[1px] tw-border-indigo-600" onClick={() => handleClick(5)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              My NFTs
            </a>
          </div>
        ) : (
          <div className="col-sm-3 col-md-3 col-lg-12 tw-mb-3 tw-rounded-md tw-text-center tw-p-1 tw-cursor-pointer hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-indigo-600 tw-border-solid tw-border-[1px] tw-border-[#00000000]" onClick={() => handleClick(5)}>
            <a className="tw-text-white tw-text-[24px] tw-no-underline hover:tw-text-white/70" style={{ textDecoration: 'none' }}>
              My NFTs
            </a>
          </div>
        )}
    </div>
  )
}

export default Sidebar;