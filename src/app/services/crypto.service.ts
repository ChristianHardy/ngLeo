import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  public encrypt(text: string): string {
    let result = null;
    const encrypt = CryptoJS.AES.encrypt(text, environment.constants.secret);
    result = encrypt.toString();
    return result;
  }

  public encryptSHA256(text: string): string {
    let result = '';

    const hash = CryptoJS.HmacSHA256(text, environment.constants.secretSHA256);
    result = CryptoJS.enc.Hex.stringify(hash);

    return result;
  }

  public decrypt(hash: string): string {
    let result = null;
    const decrypt = CryptoJS.AES.decrypt(hash.toString(), environment.constants.secret);
    result = decrypt.toString(CryptoJS.enc.Utf8);
    return result;
  }

  public decryptEncoded(urlEncoded: string) {
    const objJson = JSON.parse(urlEncoded);

    const encrypted = objJson.ciphertext;
    const salt = CryptoJS.enc.Hex.parse(objJson.salt);
    const iv = CryptoJS.enc.Hex.parse(objJson.iv);

    const key = CryptoJS.PBKDF2(environment.constants.secret, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  public encryptEncoded(text: string) {
    const salt = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.lib.WordArray.random(16);

    const key = CryptoJS.PBKDF2(environment.constants.secret, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });

    const encrypted = CryptoJS.AES.encrypt(text, key, { iv });

    const data = {
      ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
      salt: CryptoJS.enc.Hex.stringify(salt),
      iv: CryptoJS.enc.Hex.stringify(iv)
    };

    return encodeURIComponent(JSON.stringify(data));
  }

  public encryptMD5(text: string): string {
    return CryptoJS.MD5(text).toString();
  }
}
