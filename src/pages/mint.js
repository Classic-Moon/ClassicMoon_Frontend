import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Mintboard from '../components/Mintboard';

const Mint = () => {
  return (
    <>
      <div className="container-fluid mtb15 no-fluid">
        <div className="row sm-gutters">
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <Sidebar tabIndex={3} />
          </div>
          <div className="col-sm-12 col-lg-8 col-xl-9">
            <Mintboard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Mint;