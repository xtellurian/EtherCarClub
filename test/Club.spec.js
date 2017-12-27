
const Club = artifacts.require("./Club.sol");

contract('Club', function (accounts) {

    before(async() => {});

    it("should add a car with VIN to club", async () => {
        let vin = "ABCDEFGHIJKLMNOP";
        let recordHash = "nothing for now";
        let timestamp = 0;
        var club = await Club.new(accounts[0]); // make a new club

        var event = await club.Joined();
        event.watch(function(error, result){
            if (!error)
                console.log(result);
        });

        let result = await club.joinClub(vin, recordHash, timestamp );

        
      });
});