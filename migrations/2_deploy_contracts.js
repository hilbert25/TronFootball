var football = artifacts.require("./Football.sol");

module.exports = function(deployer) {
    deployer.deploy(football);
};