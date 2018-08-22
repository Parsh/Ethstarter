pragma solidity ^0.4.17;

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    Request[] public requests;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint _minimum) public {
        manager = msg.sender;
        minimumContribution = _minimum;
    }   

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }
        
}