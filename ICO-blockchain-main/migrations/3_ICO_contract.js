const Mcube_Sale = artifacts.require("MFLIXSale");

const admin = "0xD6D6E6bFb7932e38f200206585682023B1319e2b";
const Mcube_token = "0xAEfF073E4974B8F56C7148C4eF23e54D0B7e58b7";
const token_add = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"; //DAI Token
const price = "100000000000000000";
const presaleAmount = "50000000000000000000000000000000000";
const icosaleAmount = "100000000000000000000000000000000000";

module.exports = function (deployer) {
  deployer.deploy(Mcube_Sale,admin,Mcube_token,token_add,price,presaleAmount,icosaleAmount);
};
