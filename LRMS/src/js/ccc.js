module.exports = {
  rpc: {
    host: 'localhost',
    port: '7545'
 },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x4CD56F5C749eF48116958581AFdf68A083391F06", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    },
 ropsten:  {
     network_id: 3,
     host: "localhost",
     port:  8545,
     gas:   4612388
  }
},
};