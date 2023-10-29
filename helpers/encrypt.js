const CryptoJS = require('crypto-js');

const encrypt = (secret) => {

  const encryptedString = CryptoJS.AES.encrypt(secret.password, process.env.vault_secret, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  console.log("secret", encryptedString.toString(), "before", secret); // Convert the result to a string

  return {...secret,password:encryptedString.toString()}; // Return the encrypted string
};

module.exports = encrypt;
