const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolved data');
  }, 5000);
});

console.log('before');

promise.then((data) => {
  console.log(data);
});

console.log('after');

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error message');
  }, 2000);
});

promise2.then((data) => {
  console.log('promise2 resolved!', data);
}).catch((error) => {
  console.log('promise2 rejected', error)
});
// equivalent syntax
promise2.then((data) => {
  console.log('promise2 resolved v2!', data);
}, (error) => {
  console.log('promise2 rejected v2', error)
});
