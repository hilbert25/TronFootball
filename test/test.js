const util = require('./util.js');
const data = require('./data.js');
var football = artifacts.require("Football");
contract("football", function(accounts) {
    async function deployContract() {
        football = await football.new();
    }
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    describe("test admin", function() {
        before(deployContract);
        it("test admin" ,async function(){
            var admin = await football.get_admin();
            console.log("admin",admin);
        })
    })

    describe("test login and register", function() {
        it("test login" ,async function(){
            var user = await football.user_login();
            console.log("login",user);
        })
        it("test register" ,async function(){
            await football.user_register();
        })

        it("test login again" ,async function(){
            var user = await football.user_login();
            console.log("login",user);
        })
        
    })


    describe("test transfer", function() {
        it("buy power" ,async function(){
            await football.buy_power(5);
            var user = await football.user_login();
            console.log("login",user);
        })
    })

    describe("test get team", function() {
        it("get team" ,async function(){
            var team = await football.get_user_team(accounts[0]);
            console.log("login",team);
        })
    })

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