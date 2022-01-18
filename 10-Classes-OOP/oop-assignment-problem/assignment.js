class Course {
  #price

  set price (val) {
    if (val < 0){
      this.#price = -val
    } else {
      this.#price = val
    }
  }

  get price (){
    return `$${this.#price}`
  }

  constructor (title,length,price){
    this.title = title
    this.length=length
    this.price=price
  }

  value () {
    const value = this.length/this.price
    return value
  }

  summary () {
    const summary = `The ${this.title} course is ${this.length} minutes long and costs ${this.price}.`
    return summary
  }

}

class PracticalCourse extends Course {
  constructor (title,length,price,numOfExercises){
    super(title,length,price)
    this.numOfExercises = numOfExercises
  }
}

class TheoreticalCourse extends Course {
  publish () {
    console.log(this.title,this.length,this.price)
  }
}


const javascript = new Course ("Know It All",45,9.99)
const javascriptExtra = new Course ("Knew it all",15,8.99)

console.log(javascript,javascriptExtra)

console.log(javascript.value(),javascript.summary())
console.log(javascriptExtra.value(),javascriptExtra.summary())

const peppy = new PracticalCourse ('Uh huh',30,10,47)
const preppy = new TheoreticalCourse ('Be boo',31,11)

console.log(peppy,preppy)
console.log(peppy.value(),peppy.summary())
console.log(preppy.value(),preppy.summary())
preppy.publish()