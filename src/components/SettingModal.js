import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { MdClose } from 'react-icons/md';

import './SettingModal.css';

const SettingModal = (props) => {

  const handleSlippage = (val) => {
    document.getElementById('tolerance1').classList.remove('active');
    document.getElementById('tolerance2').classList.remove('active');
    document.getElementById('tolerance3').classList.remove('active');

    if (val == 0.1) {
      document.getElementById('tolerance1').classList.add('active');
    } else if (val == 0.5) {
      document.getElementById('tolerance2').classList.add('active');
    } else if (val == 1) {
      document.getElementById('tolerance3').classList.add('active');
    }
    props.setSlippage(val);
  }

  const handleSlippageChange = (e) => {
    document.getElementById('tolerance1').classList.remove('active');
    document.getElementById('tolerance2').classList.remove('active');
    document.getElementById('tolerance3').classList.remove('active');

    let val = e.target.value;
    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    e.target.value = val;

    props.setSlippage(val);
  }

  const handleTxChange = (e) => {
    let val = e.target.value;
    if (val < 0) {
      val = 0;
    } else if (e.target.value > 10000) {
      val = 10000;
    }
    e.target.value = val;

    props.setTxDeadline(val);
  }

  return (
    <>
      <Modal show={props.isOpen} onHide={props.close} centered variant="dark" className="tw-rounded-lg" id="setting">
        <Modal.Body>
          <div className='tw-text-[18px] tw-text-white tw-font-bold tw-mb-2 tw-flex tw-justify-between'>
            Slippage Tolerance
            <MdClose color="#fff" className="tw-ml-[6px] tw-cursor-pointer" onClick={props.close} />
          </div>
          <div className='tw-text-[18px] tw-mb-3' style={{ marginBottom: '25px' }}>
            <button onClick={(e) => handleSlippage(0.1)} id='tolerance1' className="tw-text-center tw-border-solid tw-rounded-lg tw-border-[1px] tw-border-white tw-w-[60px] tw-bg-transparent tw-text-white hover:tw-bg-[#ffffffc0] hover:tw-text-black">0.1%</button>
            <button onClick={(e) => handleSlippage(0.5)} id='tolerance2' className="tw-text-center tw-border-solid tw-rounded-lg tw-border-[1px] tw-border-white tw-w-[60px] tw-bg-transparent tw-text-white hover:tw-bg-[#ffffffc0] hover:tw-text-black tw-ml-[20px]">0.5%</button>
            <button onClick={(e) => handleSlippage(1)} id='tolerance3' className="tw-text-center tw-border-solid tw-rounded-lg tw-border-[1px] tw-border-white tw-w-[60px] tw-bg-transparent tw-text-white hover:tw-bg-[#ffffffc0] hover:tw-text-black tw-ml-[20px]">1%</button>

            <input onChange={handleSlippageChange} type="number" className="tw-text-right tw-pr-[27px] tw-border-solid tw-rounded-lg tw-border-[1px] tw-border-white tw-w-[100px] tw-ml-[20px] tw-bg-transparent tw-text-white"></input>
            <span className='tw-text-white tw-ml-[-23px]'>%</span>
          </div>
          <div className='tw-flex tw-justify-between tw-items-center'>
            <div className='tw-text-[18px] tw-text-white tw-font-bold'>
              Transaction Deadline
            </div>
            <div className="tw-flex tw-border-solid tw-rounded-lg tw-border-[1px] tw-flex tw-justify-end tw-pr-[10px] tw-items-center tw-text-white tw-h-[31px]">
              <input onChange={handleTxChange} value={props.txDeadline} type="number" className="tw-w-[63px] tw-border-0 tw-text-right tw-pr-[3px] tw-bg-transparent tw-text-white"></input>
              min
            </div>
          </div>
        </Modal.Body>
      </Modal >
    </>
  )
}

export default SettingModal;
