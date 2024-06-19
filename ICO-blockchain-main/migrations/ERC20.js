const McubeTokens = artifacts.require("MFLIXToken");
// const totalsupply = "1000000000000000000"

module.exports = function (deployer) {
  deployer.deploy(McubeTokens,"MFLIX","MFLIX","0xD6D6E6bFb7932e38f200206585682023B1319e2b");
};
