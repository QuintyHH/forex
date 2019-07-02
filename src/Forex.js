import React , { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

export const Forex = () => {

  const [currencyList, setCurrencies] = useState(['']);
  const [rates, setRates] = useState([]);
  const [selectDate, setSelectDate] = useState(new Date());
  const [baseCurrency, setBaseCurrency] = useState('CAD');
  const [targetCurrency, setTargetCurrency] = useState('CAD');
  const [input, setInput] = useState('1');
  const [output, setOutput] = useState(0);

  useEffect(() => {
    getAPIData()
  }, [baseCurrency, selectDate]);

  useEffect(() => {
    calculate()
  }, [baseCurrency, targetCurrency, input, selectDate]);

  const formatDate = (date) => {
    const formatType = new Date(date)
    return formatType.toISOString().split('T')[0]
  }

  const getAPIData = () => {
    let endDate = new Date(selectDate);
    let endDateFormat = formatDate(endDate)
    let startDate = endDate.setMonth(endDate.getMonth() - 12)
    let startDateFormat = formatDate(startDate)
    const URL = `https://api.exchangeratesapi.io/history?start_at=${startDateFormat}&end_at=${endDateFormat}&base=${baseCurrency}`;
    axios
      .get(URL)
      .then(({ data }) => {
        setRates(data.rates)
        if (currencyList == ""){
          setCurrencies(Object.keys(Object.values(data.rates)[0]))
        }
      })
  }

  const calculate = () => {
    let result = ""
    if (baseCurrency === targetCurrency) result="Same currency."
    else {
      let testTime = formatDate(selectDate).toString()
      let timeCheck = Object.keys(rates)
                      .map((key) => key)
                      .filter((time) => time === testTime )
                      .length
      if (timeCheck >= 1) result = (Number(rates[testTime][targetCurrency]) * Number(input)).toFixed(2)
      else if ( timeCheck === 0 || timeCheck >= 2) result = "No data available."
      else result = "Something is wrong.."
    }
    setOutput(result)
  }

  const currencySwap = e => {
    e.preventDefault()
    //deCompletat
  }

  return (
    <div className = "Forex-body" >
      <div className = "Header" >
        <h2 className = "Title" > FOREX </h2>
        <img src = "../favicon.ico" alt="Logo" />
      </div> 
      <form>
        <DatePicker
          className = "PickDate"
          selected = {selectDate}
          onChange = {(date) => setSelectDate(date) }
          maxDate = {new Date()}
        />
        <label htmlFor = "baseCurrencySelect" 
          className = "Label"> From </label>
        <select
          onChange = {e => setBaseCurrency(e.target.value)}
          name = "baseCurrencySelect"
          id = "baseCurrencySelect">
          {currencyList && currencyList.map(currency => {
            return <option 
                    value = {currency} 
                    key = {currency} 
                    id = {currency}>
                    {currency}
                    </option>
          })}
        </select>
        <button onClick = {currencySwap}> Swap </button>
        <label htmlFor = "baseCurrency" 
          className = "Label"> To </label>
        <select
          onChange = {e => setTargetCurrency(e.target.value)}
          name = "targetCurrencySelect" 
          id = "targetCurrencySelect">
          {currencyList && currencyList.map(currency => {
            return <option value={currency} 
                    key = {currency} 
                    id = {currency}>
                    {currency}
                    </option>
          })}
        </select>
        <label htmlFor = "input" 
          className = "Label"> Amount </label>
        <input 
          type = "text"
          id = "input"
          onChange = {e => setInput(e.target.value)} 
          value = {input}/>
        <label htmlFor = "result" 
          className = "Label"> Result </label>
        <input 
          type = "text"
          id = "result"
          readOnly = "readOnly"
          value = {output}/>
      </form>
    </div>
  )
}
