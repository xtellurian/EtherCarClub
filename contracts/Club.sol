pragma solidity ^0.4.17;

contract Club {
    address owner;

    mapping(string => uint) latestRecordIds; // holds the number of tx for specific vin

    function Club() public {
        owner = msg.sender;
    }

    event Joined(
        string _vin,
        uint _id,
        string _hash,
        uint256 _timestamp,
        uint256 _eventTime
    );

    function joinClub(string _vin, string _recordHash, uint256 _timestamp) public {
        Joined(_vin, nextIdForVin(_vin), _recordHash, _timestamp, now);
    }


    function nextIdForVin(string _vin) private returns(uint) {
        var idToReturn = latestRecordIds[_vin];
        latestRecordIds[_vin] = latestRecordIds[_vin] + 1;
        return idToReturn;
    }
}