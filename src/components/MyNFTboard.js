import react, { useEffect, useState } from 'react';
import ConnectWallet from './ConnectWallet';
import useAddress from '../context/useAddress';
import { getConstants } from '../context/constants';
import { useContract } from '../context/useContract';

import './MyNFTboard.css';

const MyNFTboard = () => {

  // Web3
  const constants = getConstants();
  const walletAddress = useAddress();
  const { getNFTList } = useContract();

  const [NFT_MOON, setNFT_MOON] = useState([]);
  const [NFT_FURY, setNFT_FURY] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (walletAddress) {
          // Get NFT Information
          let result = await getNFTList(constants.CLASSICMOON_NFT_Contract_Address, walletAddress);
          setNFT_MOON(result.tokens);
          result = await getNFTList(constants.FURY_P1_NFT_Contract_Address, walletAddress);
          setNFT_FURY(result.tokens);
        } else {
          setNFT_MOON([]);
          setNFT_FURY([]);
        }
      } catch (e) {
        console.log(e);
      }
    })()
  }, [walletAddress]);

  return (
    <>
      <div className='tw-w-full tw-rounded-lg tw-border-[1px] tw-border-solid tw-p-[16px] tw-text-center'
        style={{ display: 'flex', flexWrap: 'wrap' }}>
        {walletAddress ? (
          (NFT_MOON.length == 0 && NFT_FURY.length == 0) ?
            (
              <div className='tw-w-full tw-text-center tw-text-white tw-text-[16px] tw-gap-[12px]'>No NFTs</div>
            ) :
            (
              <>
                {
                  NFT_MOON.length == 0 ?
                    <></> :
                    (
                      <><div className='tw-w-full tw-text-center tw-text-white tw-text-[24px] tw-py-[16px]'>CLASSICMOON NFTs</div>
                        {
                          NFT_MOON.map((val, index) => {
                            return (
                              <div key={index} className='col-sm-12 col-md-6 col-lg-4 tw-mb-2'>
                                <div className='tw-border-solid tw-border-[1px] tw-rounded-lg'>
                                  <img className='tw-w-80 tw-p-2' src={"https://ipfs.miata-ipfs.com/ipfs/QmeZkHyMVzKwWzoMq3BcDkoAK4Qvkp6zR3xnawD4tTjP91/" + val + ".jpg"}></img>
                                  <span className='tw-text-white'>CLASSICMOON #{val}</span>
                                </div>
                              </div>
                            )
                          })
                        }
                      </>
                    )
                }
                {
                  NFT_FURY.length == 0 ?
                    <></> :
                    (
                      <><div className='tw-w-full tw-text-center tw-text-white tw-text-[24px] tw-py-[16px]'>LUNC FURY P1 NFTs</div>
                        {
                          NFT_FURY.map((val, index) => {
                            return (
                              <div key={index} className='col-sm-12 col-md-6 col-lg-4 tw-mb-2'>
                                <div className='tw-border-solid tw-border-[1px] tw-rounded-lg'>
                                  <img className='tw-w-80 tw-p-2' src={"https://ipfs.miata-ipfs.com/ipfs/QmQNQrmieaHzf2Pn3rr7x5qkzTgKB9r62JPhJXLhvmZTiF/" + val + ".jpg"}></img>
                                  <span className='tw-text-white'>LUNC FURY #{val}</span>
                                </div>
                              </div>
                            )
                          })
                        }
                      </>
                    )
                }
              </>
            )
        ) : (
          <div style={{ width: '100%' }}>
            <ConnectWallet />
          </div>
        )
        }
      </div>
    </>
  )
}

export default MyNFTboard;
