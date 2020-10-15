const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const result = document.getElementById('result');
const display = document.getElementById('display');
const sqrBtn = document.getElementById('sqr-btn');



let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);
sqrBtn.addEventListener('click', sqrtCount);



function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
        if (number === '-') {
          operationPress('-');
        } else {
          display.value += number;
        }
      
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=' ) {
    
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
     
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
     } else if (MemoryPendingOperation === '^'){
      MemoryCurrentNumber =  Math.pow(MemoryCurrentNumber,localOperationMemory);
    }
     else {
      MemoryCurrentNumber = +localOperationMemory;
    }

    if (MemoryCurrentNumber.toString().indexOf('.') !== -1) {
      MemoryCurrentNumber = +(MemoryCurrentNumber.toString().replace(/([0]{4,}[1-9])$/g, ""));
    }
    
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
    
    
  }
}

function sqrtCount(sqr) {
  let localSqr = display.value
  
  if ( localSqr > 0 ){
      MemoryCurrentNumber =  Math.sqrt(localSqr);
      MemoryNewNumber = false;
  }
  else{
    MemoryCurrentNumber = 'ERROR'
  }
  display.value = MemoryCurrentNumber;
  

}


function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}



function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}



