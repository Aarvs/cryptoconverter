import { useState } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import './App.css';

function App() {
  const [crypto, selectCrypto] = useState('solana');
  const [currency, selectCurrency] = useState('usd');
  const [result, setResult] = useState();
  const [error, setError] = useState(null);

  const currencyInfo = useCurrencyInfo(crypto, currency);

  const finalResult = (event) => {
    event.preventDefault();

    try {
      // Reset error state
      setError(null);

      const data = currencyInfo;
      setResult(data[currency] || 'Data not available');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/5435844/pexels-photo-5435844.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={finalResult}>
            <div className="w-full mb-1">
              <div className='m-2'>
                Name of Crypto:
                <input type="text" value={crypto} onChange={({ target }) => selectCrypto(target.value)} />
              </div>

              <div className='m-2'>
                Change Cryto to Currency:
                <input type="text" value={currency} onChange={({ target }) => selectCurrency(target.value)} />
              </div>
            </div>
            <button className='backgroundClour: bg-purple-500 rounded-2xl m-2' type="submit"> {`Change ${crypto} to ${currency}`}</button>
          </form>

          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

          <div className='m-2'>Result: {result}</div>
        </div>
      </div>
    </div>
  );
}

export default App;




