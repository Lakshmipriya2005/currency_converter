import React, { useEffect, useState } from 'react';
import currency from './assets/currency.png';
import axios from "axios";

const Currency = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const getExchangeRate = async () => {
            try {
                let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
                const res = await axios.get(url);
                
                setExchangeRate(res.data.rates[toCurrency]);
            } catch (e) {
                console.error(e);
            }
        };

        getExchangeRate();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        if (exchangeRate !== null) {
            setConvertedAmount((amount * exchangeRate).toFixed(2));
        }
    }, [amount, exchangeRate]);

    const amountChange = (e) => {
        const value = parseFloat(e.target.value); 
        setAmount(isNaN(value) ? 0 : value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value); 
    };

    return (
        <div className='whole'>
            <div className='box'></div>
            <h2>CURRENCY CONVERTER</h2>
            <div>
                <label>Amount:</label>
                <input
                    type='number'
                    name='amount'
                    className='inp'
                    value={amount}
                    onChange={amountChange}
                />
                <div /> {/* Make sure this is properly closed */}
                <div className='countries'>
                    <label>From Currency:</label>
                    <select className='inp' value={fromCurrency} onChange={handleFromCurrencyChange}>
                        <option value='USD'>USD - United States Dollar</option>
                        <option value='EUR'>EUR - Euro</option>
                        <option value='GBP'>GBP - British Pound Sterling</option>
                        <option value='JPY'>JPY - Japanese Yen</option>
                        <option value='AUD'>AUD - Australian Dollar</option>
                        <option value='CAD'>CAD - Canadian Dollar</option>
                        <option value='CNY'>CNY - Chinese Yuan</option>
                        <option value='INR'>INR - Indian Rupee</option>
                        <option value='BRL'>BRL - Brazilian Real</option>
                        <option value='ZAR'>ZAR - South African Rand</option>
                    </select>
                </div>
                <div className='countries'>
                    <label>To Currency:</label>
                    <select className='inp' value={toCurrency} onChange={handleToCurrencyChange}>
                        <option value='USD'>USD - United States Dollar</option>
                        <option value='EUR'>EUR - Euro</option>
                        <option value='GBP'>GBP - British Pound Sterling</option>
                        <option value='JPY'>JPY - Japanese Yen</option>
                        <option value='AUD'>AUD - Australian Dollar</option>
                        <option value='CAD'>CAD - Canadian Dollar</option>
                        <option value='CNY'>CNY - Chinese Yuan</option>
                        <option value='INR'>INR - Indian Rupee</option>
                        <option value='BRL'>BRL - Brazilian Real</option>
                        <option value='ZAR'>ZAR - South African Rand</option>
                    </select>
                </div>
            </div>
            <div className='result'>
                <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
            </div>
        </div>
    );
};

export default Currency;
