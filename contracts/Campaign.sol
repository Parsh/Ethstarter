pragma solidity ^0.4.17;

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public backers;
    uint public backersCount;
    Request[] public requests;

    modifier managerOnly(){
        require(msg.sender == manager);
        _;
    }

    modifier isBacker(){
        require(backers[msg.sender]);
        _;
    }

    function Campaign(uint _minimumContribution) public {
        manager = msg.sender;
        minimumContribution = _minimumContribution;
    }   

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        backers[msg.sender] = true;
        backersCount++;
    }

    function createRequest(string _description, uint _value, address _recipient) 
        public managerOnly {
            
            Request memory newRequest = Request({
               description: _description,
               value: _value,
               recipient: _recipient,
               complete: false,
               approvalCount: 0
            });
            
            requests.push(newRequest);
        
    }
        
    function approveRequest(uint requestIndex) public isBacker {

        Request storage request = requests[requestIndex];
        
        //checks whether the backer has already voted/approved this particular request
        require(!request.approvals[msg.sender]); 
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    
    }

    function finalizeRequest(uint requestIndex) public managerOnly {
        
        Request storage request = requests[requestIndex];
        
        require(request.approvalCount > (backersCount/2)); //more than 50% of backers must approve
        require(!request.complete); //check whether the request is already finalized
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

}