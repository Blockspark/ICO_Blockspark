// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MFLIXSale is Ownable {
    mapping(address => uint256) private _balances;

    address public admin;
    address private mcubeAddress;
    address private tokenAddress;
    uint256 private _totalSold;
    uint256 private _preTotalSold;
    uint256 private _icoTotalSold;
    uint256 private price;
    uint256 private presaleAmount;
    uint256 private icosaleAmount;

    mapping(address => bool) whitelistedAddresses;
    mapping(address => bool) adminAddresses;

    uint256 public presaleStartTimestamp;
    uint256 public presaleEndTimestamp;
    uint256 public presalePrice;

    constructor(address _admin,address _mcubeAddress,address _tokenAddress,uint256 _price, uint256 _presaleAmount, uint256 _icosaleAmount) {
        admin = _admin;
        mcubeAddress = _mcubeAddress;
        tokenAddress = _tokenAddress;
        price = _price;
        presaleAmount = _presaleAmount;
        icosaleAmount = _icosaleAmount;
    }
  function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function setPrice (uint256 _price) public onlyOwner{
    price = _price;
    }

    function getPrice () public view virtual returns (uint256){
        return price;
    }

    function getpresaleAmount () public view virtual returns (uint256){
        return presaleAmount;
    }

    function geticosaleAmount () public view virtual returns (uint256){
        return icosaleAmount;
    }

    function setpresaleAmount (uint256 _setpresaleAmount) public onlyOwner{
        presaleAmount = _setpresaleAmount;
    }

    function seticosaleAmount (uint256 _seticosaleAmount) public onlyOwner{
        icosaleAmount = _seticosaleAmount;
    }

    function totalSold () public view virtual returns (uint256){
        return _totalSold;
    }   

    function preTotalSold () public view virtual returns (uint256){
        return _preTotalSold;
    }

    function icoTotalSold () public view virtual returns (uint256){
        return _icoTotalSold;
    }

    function addAdminUser(address[] memory _addressAdmin) public onlyOwner {
        uint size = _addressAdmin.length;
        for(uint256 i=0; i< size; i++){
            address adminUser = _addressAdmin[i];
            adminAddresses[adminUser] = true;
        }
    }

    function verifyAdmin(address _addressAdmin) public view returns(bool) {
      bool adminIsWhitelisted = adminAddresses[_addressAdmin];
      return adminIsWhitelisted;
    }

    modifier onlyAdmin() {
      require(adminAddresses[msg.sender], "You are not a Admin.");
      _;
    }

    function setPreToken (uint256 _presaleStartTimestamp, uint256 _presaleEndTimestamp,uint256 _presalePrice) public onlyOwner{  
      presaleStartTimestamp = _presaleStartTimestamp;
      presaleEndTimestamp = _presaleEndTimestamp;
      presalePrice = _presalePrice;
    }

  function presaleBuyToken (uint256 amount) public onlyWhitelisted{  
      require(presaleStartTimestamp <= block.timestamp, "Presale starttime is over");
      require(presaleEndTimestamp >= block.timestamp, "Presale endtime is over");
      require(amount >= presalePrice,"Amount should be greater than Price.");
      IERC20(tokenAddress).transferFrom(msg.sender, admin, amount);
      uint256 tokenAmount = amount / presalePrice;
      require(presaleAmount >= tokenAmount * 10**uint(18),"Presale amount token is over."); 
      _totalSold += tokenAmount;
      _preTotalSold += tokenAmount;
      IERC20(mcubeAddress).transfer(msg.sender, tokenAmount * 10**uint(18));
    }

    function buyToken (uint256 amount) public onlyWhitelisted{  
      require(amount>=price,"Amount should be greater than Price.");  
      IERC20(tokenAddress).transferFrom(msg.sender,admin,amount);
      uint256 tokenAmount = amount / price;
      require(icosaleAmount >= tokenAmount * 10**uint(18),"icosale amount token is over."); 
      _totalSold += tokenAmount;
      _icoTotalSold += tokenAmount;
      IERC20(mcubeAddress).transfer(msg.sender,tokenAmount * 10**uint(18));
    }

    function withdrawToken (uint256 tokenAmount) external onlyOwner{   
    IERC20(mcubeAddress).transfer(msg.sender,tokenAmount);  
    }

    modifier isWhitelisted(address _address) {
      require(whitelistedAddresses[_address], "Whitelist: You need to be whitelisted");
      _;
    }

    modifier onlyWhitelisted() {
      require(whitelistedAddresses[msg.sender], "Whitelist: You need to be whitelisted");
      _;
    }

    function addWhitelistUser(address _addressToWhitelist) public onlyAdmin {
      whitelistedAddresses[_addressToWhitelist] = true;
    }

    function verifyUser(address _whitelistedAddress) public view returns(bool) {
      bool userIsWhitelisted = whitelistedAddresses[_whitelistedAddress];
      return userIsWhitelisted;
    }

    function batchWhitelist(address[] memory _addressToWhitelist) public onlyAdmin {
      uint size = _addressToWhitelist.length;
    
      for(uint256 i=0; i< size; i++){
          address user = _addressToWhitelist[i];
          whitelistedAddresses[user] = true;
      }
 }

}