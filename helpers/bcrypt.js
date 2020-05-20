const bcrypt = require('bcrypt'),
    crypto = require('crypto');

exports.hash = async pwd => {
  const hash = await bcrypt.hash(pwd, 12);
  return hash;
};

exports.generateRandomHash = async () => {
    const hash = await crypto.randomBytes(256);
    const hashedVal = await crypto.createHmac("sha256", hash).digest("hex")
    //console.log(hash,"==== hashedVal: ",hashedVal)
    return hashedVal;
}

exports.compare = async (pwd, hash) => {
  const match = await bcrypt.compare(pwd, hash);
  return match;
};