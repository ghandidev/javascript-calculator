import './App.css';
import React, { useState } from 'react';
import { evaluate } from 'mathjs';


const Button = ({ id, pad, typeClass, handleClick }) => (
  <div id={id} className={typeClass} onClick={handleClick}>
    {pad}
  </div>
);

function Calculator() {
  const [state, setState] = useState("0");
  const [operator, setOperator] = useState("");

  const handleInput = (e) => {
    const value = e.target.textContent;
    if (value === "." && state.includes(".")) {
      return;
    }

    if (/[+\-*/]/.test(value)) {
      if (operator.endsWith('.') || operator.endsWith('Error') || operator.endsWith('-')) {
        return;
      }
      setOperator(operator + value);
      setState(value);
    } else {
      if (state === "0" || state === "Error") {
        setState(value);
      } else {
        setState(state + value);
      }
      setOperator(operator + value);
    }
  };

  const handleOperator = (value) => {
    const lastChar = operator.slice(-1);

    if (value === '-' && /[+*/]/.test(lastChar)) {
      setOperator(operator + value);
      setState(value);
    } else if (/[+\-*/]/.test(lastChar)) {
      if (!(lastChar === '-' && /[+*/]/.test(operator.slice(-2, -1)))) {
        setOperator(operator.slice(0, -1) + value);
      } else {
        setOperator(operator.slice(0, -2) + value);
      }
      setState(value);
    } else {
      setOperator(operator + value);
      setState(value);
    }
  };

  const handleEquals = () => {
    try {
      const result = evaluate(operator);
      setState(result.toString());
      setOperator(result.toString());
    } catch (error) {
      setState("Error");
    }
  };

  const handleClear = () => {
    setState("0");
    setOperator("");
  };

  return (
    <div className="container">
      <span id="operation" className="operation">
        {operator}
      </span>
      <span id="display" className="display">
        {state}
      </span>
      <Button id="clear" pad="AC" typeClass="clear" handleClick={handleClear} />
      <Button
        id="divide"
        pad="/"
        typeClass="divide"
        handleClick={() => handleOperator('/')}
      />
      <Button
        id="multiply"
        pad="X"
        typeClass="multiply"
        handleClick={() => handleOperator("*")}
      />
      <Button
        id="seven"
        pad="7"
        typeClass="seven"
        handleClick={handleInput}
      />
      <Button
        id="eight"
        pad="8"
        typeClass="eight"
        handleClick={handleInput}
      />
      <Button
        id="nine"
        pad="9"
        typeClass="nine"
        handleClick={handleInput}
      />
      <Button
        id="subtract"
        pad="-"
        typeClass="subtract"
        handleClick={() => handleOperator("-")}
      />
      <Button
        id="four"
        pad="4"
        typeClass="four"
        handleClick={handleInput}
      />
      <Button
        id="five"
        pad="5"
        typeClass="five"
        handleClick={handleInput}
      />
      <Button
        id="six"
        pad="6"
        typeClass="six"
        handleClick={handleInput}
      />
      <Button
        id="add"
        pad="+"
        typeClass="add"
        handleClick={() => handleOperator("+")}
      />
      <Button
        id="one"
        pad="1"
        typeClass="one"
        handleClick={handleInput}
      />
      <Button
        id="two"
        pad="2"
        typeClass="two"
        handleClick={handleInput}
      />
      <Button
        id="three"
        pad="3"
        typeClass="three"
        handleClick={handleInput}
      />
      <Button
        id="equals"
        pad="="
        typeClass="equals"
        handleClick={handleEquals}
      />
      <Button
        id="decimal"
        pad="."
        typeClass="decimal"
        handleClick={handleInput}
      />
      <Button
        id="zero"
        pad="0"
        typeClass="zero"
        handleClick={handleInput}
      />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
