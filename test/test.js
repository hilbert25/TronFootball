const util = require('./util.js');
const data = require('./data.js');
var football = artifacts.require("Football");
contract("football", function(accounts) {
    let hello;
    async function deployContract() {
        football = await football.new();
    }
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    describe("user\n----------", function() {
        before(deployContract);
        it("test user_login",async function() {
            var res = await football.user_login();
            console.log(res);
        })
    });

    describe("random\n----------", function(){
       // before(deployContract);
        // it("test goalkeeper card",async function() {
        //     var num = parseInt(await football.random_goalkeeper_card());
        //     var goalkeeper = data.get_player(num);
        //     console.log(num+","+goalkeeper);
        // })
        // it("test not goalkeeper card",async function() {
        //     var num = parseInt(await football.random_not_goalkeeper_card());
        //     var not_goalkeeper_card = data.get_player(num);;
        //     console.log(num+","+not_goalkeeper_card);
        // })
        // it("test vip card",async function() {
        //     var num = parseInt(await football.random_vip_card());
        //     var vip_card = data.get_player(num);;
        //     console.log(num+","+vip_card);
        // })
        // it("test common card",async function() {
        //     var num = parseInt(await football.random_common_card());
        //     var vip_card = data.get_player(num);;
        //     console.log(num+","+vip_card);
        // })
    });
})