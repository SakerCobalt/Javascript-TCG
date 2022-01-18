const defaultResult =0;
let currentResult = defaultResult;
let logEntries =[];

function getUserNumberInput(){
  return parseInt(userInput.value)
}
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber){
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}
function writeToLog (operationIdentifier, 
  prevResult,operationNumber,newResult) {
    cont logEntry = {
      operation: operationIdentifier,
      prevResult: prevResult,
      number: operationNumber,
      result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
  }

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
 
  if(
    calculationType !== 'ADD' &&
    calculationType !== 'SUBTRACT' &&
    calculationType !== 'MULTIPLY' &&
    calculationType !== 'DIVIDE' ||
    !enteredNumber
  ) {
    return;
  }

   if (calculationType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculationType ==='MULTIPLY'){
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else if (calculationType === 'DIVIDE'){
    currentResult /= enteredNumber;
    mathOperator='/';
  }
  
  createAndWriteOutput(mathOperator,initialResult,enteredNumber);
  writeToLog(calculationType,initialResult,enteredNumber,currentResult);
}

function add (){
  calculateResult('ADD');

  // const enteredNumber = getUserNumberInput();
  // const initialResult = currentResult;
  // currentResult += enteredNumber;
  // createAndWriteOutput('+',initialResult,enteredNumber);
  // writeToLog('ADD',initialResult,enteredNumber,currentResult);
 
  //console.log(logEntry.prevResult);
  //console.log(logEntries[0])
}

function subtract(){
  calculationType('SUBTRACT');
  // const enteredNumber = getUserNumberInput();
  // const initialResult = currentResult;
  // currentResult -= enteredNumber;
  // createAndWriteOutput('-',initialResult,enteredNumber)
  // writeToLog('SUBTRACT',initialResult,enteredNumber,currentResult);
}
function multiply(){
  calculationType('MULTIPLY');
  // const enteredNumber = getUserNumberInput();
  // const initialResult = currentResult;
  // currentResult *= enteredNumber;
  // createAndWriteOutput('*',initialResult,enteredNumber)
  // writeToLog('MULTIPLY',initialResult,enteredNumber,currentResult);
  // typeof 'currentResult'; //Returns type of variable
}
function divide(){
  calculationType('DIVIDE');
  // const enteredNumber = getUserNumberInput();
  // const initialResult = currentResult;
  // currentResult /= enteredNumber;
  // createAndWriteOutput('/',initialResult,enteredNumber)
  // writeToLog('DIVIDE',initialResult,enteredNumber,currentResult);
}

addBtn.addEventListener('click',add);
subtractBtn.addEventListener('click',subtract);
multiplyBtn.addEventListener('click',multiply);
divideBtn.addEventListener('click',divide);

