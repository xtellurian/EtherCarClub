
const Club = artifacts.require("./Club.sol");
const validVin = "2FWWJECA1XAB77019";
const assertExpectedError = async (promise) => {
    try {
        await promise;
        assert.fail(0, 0, 'expected test to throw an exception')();
    } catch (error) {
        assert(error.message.indexOf('invalid opcode') >= 0, `Expected throw, but got: ${error.message}`);
    }
}

contract('Club', function (accounts) {

    before(async () => { });

    it("should add a car with valid VIN (string) to club", async () => {
        let vin = validVin;
        let recordHash = "nothing for now";
        let timestamp = 0;
        var club = await Club.new(accounts[0]); // make a new club

        var event = await club.Joined();
        event.watch(function (error, result) {
            if (!error)
                console.log(result);
        });

        let result = await club.joinClub(vin, recordHash, timestamp);

        assert.isTrue(await club.isMember(vin));

    });

    it("should not add a car with invalid VIN (string) to club", async () => {
        let vin = "bad *&^%@(%";
        let recordHash = "nothing for now";
        let timestamp = 0;
        var club = await Club.new(accounts[0]); // make a new club

        var event = await club.Joined();
        event.watch(function (error, result) {
            if (!error)
                console.log(result);
        });

        assertExpectedError( club.joinClub(vin, recordHash, timestamp));

    });




});