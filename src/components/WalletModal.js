import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { WalletStatus } from '@terra-money/wallet-types';
import { ConnectType, useWallet } from '@terra-money/wallet-provider';
import { IoIosWarning } from 'react-icons/io';
import { getShortAddress, copyToClipboard } from '../utils/utils';
import { networks, NET_NAME } from '../utils/networks';
import Swal from 'sweetalert2';
import { MdClose } from 'react-icons/md';
import './WalletModal.css';

const WalletModal = (props) => {
  const { status, network, connect } = useWallet();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      return;
    }
    if (status !== WalletStatus.INITIALIZING && network.chainID !== networks[NET_NAME].chainID) {
      Swal.fire({
        title: '<strong class="tw-text-black>Sucess</strong>',
        icon: 'warning',
        html:
          `<p class="tw-text-black">Wrong network connection</p>
        <span class="tw-text-black tw-text-[16px]">Your wallet is connected to <b>${network.name}(${network.chainID})</b>.</span><br/>
        <span class="tw-text-black tw-text-[16px]">Please change the network to <b>Terra Classic(${networks[NET_NAME].chainID})</b>.</span>
        `,
        showCancelButton: false,
        confirmButtonColor: '#0d6efd',
      })
    }
  }, [status, network])

  const handleTerraConnect = () => {
    connect(ConnectType.EXTENSION);
    props.close();
  }

  const handleWalletConnect = () => {
    connect(ConnectType.WALLETCONNECT);
    props.close();
  }

  return (
    <>
      <Modal show={props.isOpen} onHide={props.close} centered variant="dark" id="wallets">
        <Modal.Body className='p-2'>
          <Modal.Header className='pt-1 pr-1 pb-1 border-0'>
            <div className='tw-w-full tw-text-[18px] tw-text-white tw-font-bold tw-mb-2 tw-flex tw-justify-between'>
              Connect Wallet
              <MdClose color="#fff" className="tw-ml-[6px] tw-cursor-pointer" onClick={props.close} />
            </div>
          </Modal.Header>
          <div className="tw-p-4 tw-cursor-pointer">
            <div className="tw-flex tw-items-center tw-gap-4" onClick={handleWalletConnect}>
              <img src="/img/icon/walletconnect.png" alt="" className="img-fluid" />
              <span className="tw-text-white tw-text-lg tw-opacity-80 hover:tw-opacity-100">
                WalletConnect
              </span>
            </div>
          </div>
          <div className="tw-p-4 tw-cursor-pointer">
            <div className="tw-flex tw-items-center tw-gap-4" onClick={handleTerraConnect}>
              <img src="/img/icon/TerraStation.png" alt="" className="img-fluid" />
              <span className="tw-text-white tw-text-lg tw-opacity-80 hover:tw-opacity-100">
                Terra Station
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal >
    </>
  )
}

export default WalletModal

/* modal */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }
}
