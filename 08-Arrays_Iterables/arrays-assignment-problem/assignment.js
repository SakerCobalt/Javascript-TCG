const numbers = [1,2,3,4,5,6];

const numsGreater5 = numbers.filter((val)=> val > 5);
console.log(numsGreater5);

const mappedNumbers = numbers.map(val => ({num: val}));
console.log(mappedNumbers);

// const mutiplication = numbers.reduce((curResult, curValue)=> {
//   return curResult*curValue;
// },1);

const mutiplication = numbers.reduce((curRes, 
  curValue) => curRes*curValue,1);

console.log(mutiplication);

function findMax(...nums) {
  let curMax = nums[0];
  for (const num of nums) {
    if(num > curMax){
      curMax= num;
    }
  }
  return curMax;
}

console.log(findMax(...numbers)); //in this case we are
// splitting the array and then reforming in the findMax function
//with ...

function findMinMax(...nums) {
  let curMax = nums[0];
  let curMin = nums[0];
  for (const num of nums) {
    if(num > curMax){
      curMax= num;
    }
    if(num < curMin){
      curMin= num;
    }
  }
  return [curMax, curMin];
}

const [max, min] = findMinMax(...numbers);
console.log(max, min);

const userIds = new Set();
userIds.add(10);
userIds.add(-5);

console.log(userIds);