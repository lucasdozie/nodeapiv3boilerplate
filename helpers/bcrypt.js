const bcrypt = require('bcrypt');

exports.hash = async pwd => {
  const hash = await bcrypt.hash(pwd, 12);
  return hash;
};

// const hash2 = async pwd => {
//     await crypto.randomBytes(256);
//     const hashedVal = await crypto.createHmac("sha256", pwd).digest("hex");
//     return hashedVal;
// }

exports.compare = async (pwd, hash) => {
  const match = await bcrypt.compare(pwd, hash);
  return match;
};