pragma solidity ^0.4.17;

contract Campaign{
    
    address public manager;
    uint public minimumContribution;
    
    function Campaign(uint _minimum) public {
        manager = msg.sender;
        minimumContribution = _minimum;
    }   
}