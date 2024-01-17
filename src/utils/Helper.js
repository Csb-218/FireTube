 export function generateRandomString(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
  
    let result = "";
    for (let i = 0; i < length; i++) {
      const index = randomValues[i] % charset.length;
      result += charset.charAt(index);
    }
  
    return result;
  }
