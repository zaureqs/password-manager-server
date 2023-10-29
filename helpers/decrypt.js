const CryptoJS = require('crypto-js');

const decrypt = (secrets) => {


    secrets.forEach((secret) => {
        const decryptedString = CryptoJS.AES.decrypt(secret.password, process.env.vault_secret, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          });

        console.log(decryptedString.toString(CryptoJS.enc.Utf8));
        secret.password = decryptedString.toString(CryptoJS.enc.Utf8);
    });

    return secrets;
}

module.exports = decrypt;