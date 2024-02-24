const string = 'apple banana orange apple';

const obj = {};
let word = '';

for (let i = 0; i < string.length; i++) {
  if (string[i] !== ' ') {
    word += string[i];
  }
  if (string[i] === ' ') {
    obj[word] ? (obj[word] = obj[word] + 1) : (obj[word] = 1);
    word = '';
  }
}
obj[word] ? (obj[word] = obj[word] + 1) : (obj[word] = 1);

Object.keys(obj).map(key => console.log(`${key} - ${obj[key]}`));
