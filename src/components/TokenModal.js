import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import {MdClose} from 'react-icons/md';

import './TokenModal.css'

const TokenModal = (props) => {

  const handleSelect = (val) => {
    props.selectToken(val);
    props.close();
  }

  return (
    <>
      <Modal show={props.isOpen} onHide={props.close} centered variant="dark" id="tokens">
        <Modal.Body className='p-3'>
          <div className='tw-text-[18px] tw-text-white tw-font-bold tw-mb-2 tw-flex tw-justify-between'>
            Tokens
            <MdClose color="#fff" className="tw-ml-[6px] tw-cursor-pointer" onClick={props.close}/>
          </div>
          <div className="tw-p-2 tw-cursor-pointer">
            <div className="tw-flex tw-items-center tw-gap-4 tw-pl-7" onClick={()=>handleSelect(1)}>
              <img src="/img/icon/lunc.png" alt="" className="img-fluid tw-w-[32px]" />
              <span className="tw-text-white tw-text-lg tw-opacity-80 hover:tw-opacity-100">
                LUNC
              </span>
            </div>
          </div>
          <div className="tw-p-2 tw-cursor-pointer">
            <div className="tw-flex tw-items-center tw-gap-4 tw-pl-7" onClick={()=>handleSelect(2)}>
              <img src="/img/icon/ustc.png" alt="" className="img-fluid tw-w-[32px]" />
              <span className="tw-text-white tw-text-lg tw-opacity-80 hover:tw-opacity-100">
                USTC
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal >
    </>
  )
}

export default TokenModal;
