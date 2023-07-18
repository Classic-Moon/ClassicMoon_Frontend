import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from '@reach/router';
import clsx from 'clsx';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { MdOutlineAccountBalanceWallet, MdClose } from 'react-icons/md';
import { ThemeConsumer } from '../context/ThemeContext';
import ConnectWallet from './ConnectWallet';
import { getShortAddress } from '../utils/utils';
import './Header.css';

const Header = () => {
  const { status, wallets, disconnect } = useWallet();

  const handleDisconnect = () => {
    disconnect();
  }

  useEffect(() => {
    document.body.classList.remove('dark');
    document.body.classList.add('dark');
    let el = document.querySelector('#darkTheme');
    if (el) {
      el.addEventListener('click', function () {
        document.body.classList.toggle('dark');
      });
    }
  }, [])

  return (
    <>
      <header className="light-bb">
        <Navbar expand="lg">
          <Link className="navbar-brand" to="/">
            <ThemeConsumer>
              {({ data }) => {
                return (
                  <div className="tw-flex tw-items-center">
                    <img src={'/logo.png'} alt="logo" style={{width: '373px'}}/>
                  </div>
                )
              }}
            </ThemeConsumer>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav ml-auto">
              {status === WalletStatus.WALLET_CONNECTED ? (
                <div className="tw-flex tw-items-center tw-gap-1 tw-h-full tw-pl-2 tw-cursor-pointer">
                  <div className="tw-text-[18px]" onClick={handleDisconnect}>
                    <MdOutlineAccountBalanceWallet color="#fff" />
                    <span className="tw-text-white tw-pl-1">{wallets.length > 0 && getShortAddress(wallets[0].terraAddress)}</span>
                    <MdClose color="#fff" className="tw-ml-[6px]" />
                  </div>
                </div>
              ) : (
                <ConnectWallet />
              )}
              {status === WalletStatus.WALLET_CONNECTED && (
                <Dropdown.Menu>
                  <div className="dropdown-body">
                    <ul className="profile-nav">
                      <li className="nav-item">
                        <span className="nav-link tw-cursor-pointer" onClick={handleDisconnect}>
                          <i className="icon ion-md-power tw-text-white"></i>
                          <span className='tw-text-white'>Disconnect</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </Dropdown.Menu>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  )
}

export default Header;