pragma solidity ^0.4.17;

contract CampaignFactory{
    
    address[] public deployedCampaigns;
    address public recentCampaign;
    
    function createCampaign(uint _minimumContribution) public {
        address newCampaign = new Campaign(_minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
        recentCampaign = newCampaign;
    }
    
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
    
}

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

    function Campaign(uint _minimumContribution, address _manager) public {
        manager = _manager;
        minimumContribution = _minimumContribution;
    }   

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        backers[msg.sender] = true;
        backersCount++;
    }

    function createRequest(string _description, uint _value, address _recipient) 
        public managerOnly {
            
            require(_value <= this.balance);

            Request memory newRequest = Request({
               description: _description,
               value: _value,
               recipient: _recipient,
               complete: false,
               approvalCount: 0
            });
            
            requests.push(newRequest);
        
    }
        
    function approveRequest(uint _requestIndex) public isBacker {

        Request storage request = requests[_requestIndex];
        
        //checks whether the backer has already voted/approved this particular request
        require(!request.approvals[msg.sender]); 
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    
    }

    function finalizeRequest(uint _requestIndex) public managerOnly {
        
        Request storage request = requests[_requestIndex];
        
        require(request.approvalCount > (backersCount/2)); //more than 50% of backers must approve
        require(!request.complete); //check whether the request is already finalized
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

    function getSummary() public view returns(
        uint, uint, uint, uint, address
    ){
        return (
            minimumContribution,
            this.balance,
            requests.length,
            backersCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}