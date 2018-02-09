# EtherCarClub
A toy DApp. Add your cars to a club.

## Getting Started

### Requirements

* Truffle dev tools
* Ganache
* MetaMask Browser Plugin

### Run the DApp

* Start Ganache
* `truffle migrate`
* `npm run dev`
* Open `localhost:3000` in a browser in Chrome with MetaMask extension.




## Setting up a test environment w/ geth

```
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```

...

`geth account new --datadir ~/datadir // create new keypair`

copy account into genesis.json

`geth --identity "MyTestNetNode" --nodiscover --networkid 1999 --datadir ~/datadir init genesis.json // create new chain`

`geth --identity "MyTestNetNode" --datadir ~/datadir --nodiscover --networkid 1999 console // js console for chain`

should see something like:
```
Welcome to the Geth JavaScript console!

instance: Geth/MyTestNetNode/v1.7.3-stable-4bb3c89d/linux-amd64/go1.9
coinbase: 0x84ac06209651a8e6cf423466483ededd9f6aeb92
at block: 0 (Thu, 01 Jan 1970 10:00:00 STD)
 datadir: /home/rian/datadir
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0
 ```