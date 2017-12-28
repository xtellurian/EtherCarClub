pragma solidity ^0.4.4;

contract Club {
    address owner;
    string[] public members; // dynamic array of fixed size VIN, each 17 chars
    mapping(string => bool) memberMap;

    function Club() public {
        owner = msg.sender;
    }

    event Joined(
        string _vin,
        string _hash,
        uint256 _timestamp,
        uint256 _eventTime
    );

    function joinClub(string _vin, string _recordHash, uint256 _timestamp) public {
        var vinBytes = bytes(_vin);
        if (vinBytes.length != 17 ) 
            revert();
        
        memberMap[_vin] = true;
        members.push(_vin);
        Joined(_vin, _recordHash, _timestamp, now);
    }

    function isMember(string _vin) public view returns(bool) { 
        return memberMap[_vin]; 
    }
}