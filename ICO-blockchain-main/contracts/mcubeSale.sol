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
    uint256 private pricePerToken;
    uint256 private pricePerBNB;
    uint256 private presaleAmount;
    uint256 private icosaleAmount;

    mapping(address => bool) whitelistedAddresses;
    mapping(address => bool) adminAddresses;

    uint256 public presaleStartTimestamp;
    uint256 public presaleEndTimestamp;
    uint256 public presalePriceDAI;
    uint256 public presalePriceBNB;


    constructor(address _admin,address _MFLIXAddress,address _stableTokenAddress,uint256 _pricePerToken,uint256 _pricePerBNB, uint256 _presaleAmount, uint256 _icosaleAmount) {
        admin = _admin;
        mcubeAddress = _MFLIXAddress;
        tokenAddress = _stableTokenAddress;
        pricePerToken = _pricePerToken;
        pricePerBNB = _pricePerBNB;
        presaleAmount = _presaleAmount;
        icosaleAmount = _icosaleAmount;
    }
  function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function setPriceToken(uint256 _price) public onlyOwner{
    pricePerToken = _price;
    }

    function getPriceToken() public view virtual returns (uint256){
        return pricePerToken;
    }

    function getPriceBNB() public view virtual returns (uint256){
        return pricePerBNB;
    }

    function setPriceBNB(uint256 _price) public onlyOwner{
    pricePerBNB = _price;
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

    function setPreSaleToken (uint256 _presaleStartTimestamp, uint256 _presaleEndTimestamp,uint256 _presalePriceDAI,uint256 _presalePriceBNB) public onlyOwner{  
      presaleStartTimestamp = _presaleStartTimestamp;
      presaleEndTimestamp = _presaleEndTimestamp;
      presalePriceDAI = _presalePriceDAI;
      presalePriceBNB = _presalePriceBNB;
    }

    function presaleBuyTokenWithDAI(uint256 amount) public onlyWhitelisted{  
      require(presaleStartTimestamp <= block.timestamp, "Presale starttime is over");
      require(presaleEndTimestamp >= block.timestamp, "Presale endtime is over");
      require(amount >= presalePriceDAI,"Amount should be greater than Price.");
      IERC20(tokenAddress).transferFrom(msg.sender, admin, amount);
      uint256 tokenAmount = amount / presalePriceDAI;
      require(presaleAmount >= tokenAmount,"Presale amount token is over."); 
      _totalSold += tokenAmount;
      _preTotalSold += tokenAmount;
      IERC20(mcubeAddress).transfer(msg.sender, tokenAmount * 10**uint(18));
    }

    function preSaleBuyTokenWithBNB() external payable onlyWhitelisted returns(uint256 amount){
      return preSaleTransferBNB(msg.value,msg.sender);
    } 
    function preSaleTransferBNB(uint256 _amount, address _sender) internal returns(uint256 _txAmount){
      require(presaleStartTimestamp <= block.timestamp, "Presale starttime is over");
      require(presaleEndTimestamp >= block.timestamp, "Presale endtime is over");
      require(_amount >0,"Amount should be greater than Zero.");
      require(_amount >= presalePriceBNB,"Amount should be greater than minimum Amount.");
      uint256 tokenBuyAmount = _amount / presalePriceBNB;

        // checking the net balance
      uint256 netBalance = IERC20(mcubeAddress).balanceOf(address(this));
      require(netBalance > tokenBuyAmount * 10**uint(18),"Insufficient token balance.");
      require(presaleAmount >= tokenBuyAmount * 10**uint(18),"Pre Sale amount token is over."); 

      _totalSold += tokenBuyAmount;
        //transferring the required amount to sender
      bool transactionStatus = IERC20(mcubeAddress).transfer(_sender, tokenBuyAmount * 10**uint(18));

      require(transactionStatus,"Transaction failed.");

        // //transferring bnb to admin
      require(address(this).balance >= _amount,"Transaction balace has not replicated yet.");        
      payable(admin).transfer(_amount);
      return tokenBuyAmount;
    }

    function buyTokenWithDAI (uint256 amount) public onlyWhitelisted{  
      require(amount>=pricePerToken,"Amount should be greater than Price.");  
      IERC20(tokenAddress).transferFrom(msg.sender,admin,amount);
      uint256 tokenAmount = amount / pricePerToken;
      require(icosaleAmount >= tokenAmount,"ICO sale amount token is over."); 
      _totalSold += tokenAmount;
      _icoTotalSold += tokenAmount;
      IERC20(mcubeAddress).transfer(msg.sender,tokenAmount * 10**uint(18));
    }
    
    function buyTokenWithBNB() external payable onlyWhitelisted returns(uint256 amount){
      return transferBNB(msg.value,msg.sender);
    }

    function transferBNB(uint256 _amount, address _sender) internal returns(uint256 _txAmount){
      require(_amount >0,"Amount should be greater than Zero.");
      require(_amount >= pricePerBNB,"Amount should be greater than minimum Amount.");
      uint tokenBuyAmount = _amount / pricePerBNB;

        // checking the net balance
      uint netBalance = IERC20(mcubeAddress).balanceOf(address(this));
      require(netBalance > tokenBuyAmount,"Insufficient token balance.");
      require(icosaleAmount >= tokenBuyAmount * 10**18,"ICO sale amount token is over."); 

      _totalSold += tokenBuyAmount;
        //transferring the required amount to sender
      bool transactionStatus = IERC20(mcubeAddress).transfer(_sender, tokenBuyAmount * 10**uint(18));

      require(transactionStatus,"Transaction failed.");

        // //transferring bnb to masterAccountAddess
      require(address(this).balance >= _amount,"Transaction balace has not replicated yet.");        
      payable(admin).transfer(_amount);

       // emit BuyGftUsingBNB(_sender, tokenBuyAmount, _amount);
      return tokenBuyAmount;
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
