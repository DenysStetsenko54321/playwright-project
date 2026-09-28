const letters = 'abcdefghijklmnopqrstuvwxyz';
let email = '';

for (let i = 0; i < 5; i++) {
  email += letters[Math.floor(Math.random() * letters.length)];
}

email += '@mail.com';

export const user = {
  name: 'test',
  secondName: 'test',
  email: email,
  password: '@!Welcome01!',
  postalCode: '1999',
  houseNumber: '19'
};