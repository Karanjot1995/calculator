import React, { Component } from 'react';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

class Calculator extends Component {
	state = {
		value: null,
		displayValue: '0',
		operator: null,
		waitingForOperand: false
	}
  
	inputDigit (digit) {
		const { displayValue, waitingForOperand } = this.state
		if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
	}

	clearDisplay () {
		const {displayValue}= this.state
		this.setState({
			displayValue: '0',
			value: null
		})
	}

	inputPercent () {
		const { displayValue } = this.state
		this.setState({
			displayValue: displayValue / 100,
		})
	}

	inputDot() {
		const { displayValue, waitingForOperand } = this.state
		if(!(/\./).test(displayValue)){
			this.setState({
			  displayValue : displayValue + '.' ,
			  waitingForOperand: false
			})
		}
	}

	performOperation (nextOperator) {
		const { displayValue, value , operator } = this.state
    if(value== null){
    	this.setState({
    		value: parseFloat(displayValue)
    	})
    } else if (operator) {
    		const currentValue= value || 0
    		const newValue= CalculatorOperations[operator](currentValue,parseFloat(displayValue))
    	  this.setState({
    	  	value: newValue,
    	  	displayValue: String(newValue)
    	  })
    	}  
    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    }) 
	}

	render() {
		return(
      <div className="calculator-app">
        <div className="display">{this.state.displayValue}</div>

        <div className="button-group">
	        <button onClick={() => this.clearDisplay()}>C</button>
	        <button></button>
	        <button onClick={()=> this.inputPercent()}>%</button>
	        <button onClick={() => this.performOperation('/')}>÷</button>
	      </div>
        
        <div className="button-group"> 
          <button onClick={() => this.inputDigit(7)}>7</button>
          <button onClick={() => this.inputDigit(8)}>8</button>
          <button onClick={() => this.inputDigit(9)}>9</button>
          <button onClick={() => this.performOperation('*')}>x</button>
        </div>
         
        <div className="button-group">
          <button onClick={() => this.inputDigit(4)}>4</button>
          <button onClick={() => this.inputDigit(5)}>5</button>
          <button onClick={() => this.inputDigit(6)}>6</button>
          <button onClick={() => this.performOperation('-')}>-</button>
        </div>

        <div className="button-group">
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.inputDigit(3)}>3</button>
          <button onClick={() => this.performOperation('+')}>+</button>
        </div>
          
        <div className="button-group">
          <button onClick={() => this.inputDigit(0)}>0</button>
          <button></button>
          <button onClick={() => this.inputDot()}>●</button>
          <button onClick={() => this.performOperation('=')}>=</button>
        </div>

       </div> 
	  )
	}
}
export default Calculator