import CryptoJS from 'crypto-js';

export const encryptor = (data: any) => {
  const encryptedData = CryptoJS.AES.encrypt(data, process.env.SECRET_KEY || '5ECR3Tk3Y').toString();

  return encryptedData.replace(/\//g, '-');
};


export const decryptor = (dataParams: any) => {
  const data = dataParams.split('-').join('/').split(' ').join('+')

  const decryptedData = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY || '5ECR3Tk3Y').toString(CryptoJS.enc.Utf8)

  return decryptedData
};
