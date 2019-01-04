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
            await football.user_register({from:accounts[1]});
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
        it("氪金 " ,async function(){
            await football.buy_common_card(10);
            await football.buy_vip_card(1);
        })
        it("get_user_all_card" ,async function(){
            var card = await football.get_user_all_card();
            for(var i=0;i<card[1];i++){
                console.log(card[0][i]);
            }
        })

        it("change_team" ,async function(){
            await football.change_team(1,11);
            var team = await football.get_user_team(accounts[0]);
            console.log("new team",team);
        })

        it("sale a card" ,async function(){
            await football.sale_card(1,6);
        })

        it("get_all_card_on_market" ,async function(){
            var card = await football.get_all_card_on_market();
            for(var i=0;i<card[1];i++){
                console.log("市场:",card[0][i]);
            }
        })

        it("buy card from market " ,async function(){
            var card_1 = await football.get_user_all_card({from:accounts[1]});
            for(var i=0;i<card_1[1];i++){
                console.log("card of user 1",card_1[0][i]);
            }
            await football.buy_card(1,7,{from:accounts[1]})
            var card = await football.get_all_card_on_market();
            console.log("市场上card数量为",card[1]);
            var card_0 = await football.get_user_all_card({from:accounts[0]});
            var card_1 = await football.get_user_all_card({from:accounts[1]});
            for(var i=0;i<card_0[1];i++){
                console.log("card of user 0",card_0[0][i]);
            }
            for(var i=0;i<card_1[1];i++){
                console.log("card of user 1",card_1[0][i]);
            }
        })  
    })
    describe("test contest", function() {
        it("test team_vs",async function(){
            var team_0 = await football.get_user_team(accounts[0]);
            var team_1 = await football.get_user_team(accounts[1]);
            //get card id
            var team_a = [];
            var team_b = [];
            for(var i=0;i<5;i++){
                team_a.push(await football.get_card_info(team_0[i]));
                team_b.push(await football.get_card_info(team_1[i]));
            }
            var res = util.team_vs(team_a,team_b);
            console.log(res[0],":",res[1]);
            console.log("level add:",res[2],res[3]);
            for(var i=0;i<5;i++){
                await football.add_level(team_0[i],res[2]);
                await football.add_level(team_1[i],res[2]);
            }
        })
    })

    describe("test supplement", function() {
        // it("test get all user",async function(){
        //     var data = await football.get_all_users();
        //     console.log(data[1]);
        //     for(var i=0;i<parseInt(data[1]);i++){
        //         console.log(data[0][i]);
        //     }
        // })

        it("test get all team",async function(){
            var datas = await football.get_all_users();
            var teams = [];
            for(var i=1;i<parseInt(datas[1]);i++){
                var user_team = await football.get_user_team(datas[0][i]);
                var team = [];
                for(var j=0;j<5;j++) {
                    var card_info = await football.get_card_info(user_team[i]);
                    var player = data.get_player(card_info[2]);
                    var card = {
                        card_id:card_info[0],
                        card_owner:card_info[1],
                        card_player_id:card_info[2],
                        card_level:card_info[3],
                        card_onmarket:card_info[4],
                        card_price:card_info[5],
                        player_name:player.playerName,
                        player_attack:player.playerAttackValue,
                        player_defend:player.playerDefendValue,
                        player_speed:player.playerSpeedValue,
                        player_position:player.playerPosition
                    }
                    team.push(card);
                }
                teams.push({
                    user_id:i,
                    user_address:datas[0][i],
                    user_team:team
                })
            }
            console.log(util.sort_team(teams));
        })
    })
})
  