import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Dropboard from '../components/Dropboard';

const Airdrop = () => {
  return (
    <>
      <div className="container-fluid mtb15 no-fluid">
        <div className="row sm-gutters">
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <Sidebar tabIndex={4} />
          </div>
          <div className="col-sm-12 col-lg-8 col-xl-9">
            <Dropboard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Airdrop;