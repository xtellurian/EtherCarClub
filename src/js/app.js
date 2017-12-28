App = {
  web3Provider: null,
  contracts: {},

  old_init: function () {
    // Load pets.
    $.getJSON('../pets.json', function (data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  init: function () {
    // Load cars.
    $.getJSON('../cars.json', function (data) {
      var carsRow = $('#carsRow');
      var carTemplate = $('#carTemplate');

      for (i = 0; i < data.length; i++) {
        carTemplate.find('.panel-title').text(data[i].vin);
        carTemplate.find('img').attr('src', data[i].picture);
        carTemplate.find('.car-make').text(data[i].make);
        carTemplate.find('.car-model').text(data[i].model);
        carTemplate.find('.car-year').text(data[i].year);
        carTemplate.find('.btn-join').attr('data-id', data[i].vin);

        carsRow.append(carTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Club.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ClubArtifact = data;
      App.contracts.Club = TruffleContract(ClubArtifact);

      // Set the provider for our contract
      App.contracts.Club.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the cars in the club
      //return App.markAdopted();
      return App.markClubMembers();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-join', App.handleJoin);
  },

  markClubMembers: function (members, account) {
    var clubInstance;
    
    App.contracts.Club.deployed().then(function(instance) {
      clubInstance = instance;

      $.getJSON('../cars.json', function (data) {
        for (i = 0; i < data.length; i++) {
          let vin = data[i].vin;
          let j = i; // closure
          clubInstance.isMember.call(vin).then( function (isMember){
            if(isMember){
              $('.panel-car').eq(j).find('button').text('Success').attr('disabled', true);
            }
          });
        }
      });
    
      //return clubInstance.getMembers.call();
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleJoin: function (event) {
    event.preventDefault();

    var carVin = $(event.target).data('id');
    // fix these later
    let recordHash = "nothing for now";
    let timestamp = 0;

    var clubInstance;
    
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Club.deployed().then(function(instance) {
        clubInstance = instance;
    
        // Execute join as a transaction by sending account
        return clubInstance.joinClub(carVin, recordHash, timestamp, {from: account});
      }).then(function(result) {
        return App.markClubMembers();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
