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

    describe("test user", function() {
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
        
        it("buy power" ,async function(){
            await football.buy_power(5);
            var user = await football.user_login();
            console.log("last time",user[2]);
            console.log("power",user[3]);
        })

    })

    describe("test card", function() {

        it("get team" ,async function(){
            var team = await football.get_user_team(accounts[0]);
            for(var i=0;i<5;i++){
                var card = await football.get_card_info(team[i]);
                var player = data.get_player(card[2]);
                var vip = await football.judge_card_vip(card[0]);
                console.log("第",i,"个卡牌");
                console.log("card:",card);
                console.log("player: ",player);
                console.log("vip:",vip);
            }
        })
        it("buy card " ,async function(){
            await football.buy_common_card(10);
            await football.buy_vip_card(1);
        })
        it("get_user_all_card" ,async function(){
            var card = await football.get_user_all_card();
            var card_list = card[0];
            var card_count = card[1]
            for(var i=0;i<card_count;i++){
                console.log(card_list[i]);
            }
        })

    })
   
})