import { useEffect, useState } from 'react';
import contract from './contract/contracts/pairConverter.sol/pairConverter.json';
import {ethers} from 'ethers'
import './App.css'

const contractAddress = '0x6a6Fbe775Efcb57b6e7F7888884A5bb26ABc73b2';
const abi = contract.abi;
 
function App() {
  const [selectedPair, setSelectedPair] = useState('btcUsd');
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState({
    btcUsd: null,
    ethUsd: null,
    linkUsd: null,
    btcEth: null,
  });

    useEffect(() => {
      const fetchPrices = async () => {
        if (typeof window.ethereum !== 'undefined') {
          setLoading(true);
  
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const result = await contract.getLatestPrices();
  
            setPrices({
              btcUsd: result[0].toString(),
              ethUsd: result[1].toString(),
              linkUsd: result[2].toString(),
              btcEth: result[3].toString(),
            });
          } catch (error) {
            console.error('Error fetching prices:', error);
          } finally {
            setLoading(false);
          }
        } else {
          console.error('MetaMask is not installed');
        }
      };
  
      fetchPrices();
  
    }, [selectedPair]);

    const formatPrice = (price) => {

      if(selectedPair==="btcEth"){
        const decimals = 18;
        const formattedPrice = ethers.utils.formatUnits(price, decimals);
        return formattedPrice;
      }
      else{
        const decimals = 8;
        const formattedPrice = ethers.utils.formatUnits(price, decimals);
        return formattedPrice;
      }
    };
 
    return (
      <div className='box'>
        <h1>Chainlink Price Fetcher</h1>
        <div className='radioButtons'>
          <label>
            <input
              type="radio"
              value="btcUsd"
              checked={selectedPair === 'btcUsd'}
              onChange={() => setSelectedPair('btcUsd')}
            />
            BTC/USD
          </label>
          <label>
            <input
              type="radio"
              value="ethUsd"
              checked={selectedPair === 'ethUsd'}
              onChange={() => setSelectedPair('ethUsd')}
            />
            ETH/USD
          </label>
          <label>
            <input
              type="radio"
              value="linkUsd"
              checked={selectedPair === 'linkUsd'}
              onChange={() => setSelectedPair('linkUsd')}
            />
            LINK/USD
          </label>
          <label>
            <input
              type="radio"
              value="btcEth"
              checked={selectedPair === 'btcEth'}
              onChange={() => setSelectedPair('btcEth')}
            />
            BTC/ETH
          </label>
        </div>
        <div className='result'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            prices[selectedPair] !== null ? (
              <>
                <p className='lable1'>{selectedPair.toUpperCase()} Conversion:</p>
                <p>
                  1 {selectedPair.toUpperCase().slice(0,-3)} = {" "}
                  {formatPrice(prices[selectedPair])} {" "}
                  {selectedPair.toUpperCase().substring(selectedPair.length - 3)}
                </p>
              </>
            ) : (
              <p>No data available.</p>
            )
          )}
        </div>
      </div>
    );
}
 
export default App;
