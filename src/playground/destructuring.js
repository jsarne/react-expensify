// object destructuring
const person = {
  name: 'Bob',
  age: 99,
  location: {
    city: 'PDX',
    temp: 45
  }
};

// destructuring & default value
const {name = 'Anon', age} = person;
console.log(`${name} is ${age}`);

// nested access & renaming
const {temp: lol, city} = person.location;
console.log(`It's ${lol} in ${city}`);


const book = {
  title: 'Catherine the Great',
  author: 'Robert Massie',
  publisher: {
    name: 'Some Pub'
  }
};

const {name : publisherName = 'self-published'} = book.publisher;
console.log(publisherName);

// array destructuring
const address = ['17125 Olinda Trail North', 'Minneapolis', 'Oregon', '55047'];

// can skip items positionally. defaults work too.
const [, ciudad, state = 'confusion'] = address;

console.log(`You are in ${ciudad}, ${state}`);