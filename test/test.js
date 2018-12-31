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

    describe("test login and register", function() {
        before(deployContract);
        it("test logiin" ,async function(){
            var user = await football.user_login();
            console.log("login",user);
        })
        it("test register" ,async function(){
            await football.user_register();
            var user = await football.user_login();
            var user_count = await football.get_user_count();
            var user_id = await football.get_user_id();
            console.log("user_id",user_id);
            console.log("user count",user_count);
            console.log("register",user);
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