const bcrypt = require("bcrypt");

async function generateHash() {
  const password = "123456"; // Change this if you want
  const hash = await bcrypt.hash(password, 10);

  console.log("Hashed Password:");
  console.log(hash);
}

generateHash();