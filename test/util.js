const data = require('./data.js');
const team_vs =  function(team_a,team_b){
    var temp_team_a = [];
    var temp_team_b = [];
    for(var i=0;i<5;i++){
        var player_a = data.get_player(team_a[i][2]);
        var player_b = data.get_player(team_b[i][2]);
        
        temp_team_a.push(
            {
                card_id:team_a[i][0],
                player_id:team_a[i][2],
                player_attack:team_a[i][3]*0.01+player_a.playerAttackValue,
                player_defend:team_a[i][3]*0.01+player_a.playerDefendValue,
                player_speed:team_a[i][3]*0.01+player_a.playerSpeedValue
            });
        temp_team_b.push(
            {
                card_id:team_b[i][0],
                player_id:team_b[i][2],
                player_attack:team_b[i][3]*0.01+player_b.playerAttackValue,
                player_defend:team_b[i][3]*0.01+player_b.playerDefendValue,
                player_speed:team_b[i][3]*0.01+player_b.playerSpeedValue
            });
    }
    var team = create_contest_team(temp_team_a,temp_team_b);
    team_a = team[0];
    team_b = team[1];
    var round_a = 0;
    var round_b = 1;
    for(var i=0;i<5;i++){
        round_a += team_a[i].player_speed;
        round_b += team_b[i].player_speed;
    }
    round_a = 10*(round_a/(round_a+round_b))
    round_b = 10*(round_a/(round_a+round_b))
    var mark_a = 0;
    var mark_b = 0;
    var attack_a = team_a[1].player_attack+team_a[2].player_attack;
    var attack_b = team_b[1].player_attack+team_b[2].player_attack;
    var defend_a = team_a[0].player_defend+team_a[3].player_defend+team_a[4].player_defend;
    var defend_b = team_b[0].player_defend+team_b[3].player_defend+team_b[4].player_defend;
    for(var i=0;i<round_a;i++) {
       mark_a=Math.floor(Math.random()*attack_a)>Math.floor(Math.random()*defend_b)?mark_a+1:mark_a;
    }

    for(var i=0;i<round_a;i++) {
        mark_b=Math.floor(Math.random()*attack_b)>Math.floor(Math.random()*defend_a)?mark_b+1:mark_b;
    }
    var level_a = mark_a>mark_b?(mark_a-mark_b)*(attack_a+attack_b+defend_a+defend_b)/(attack_a+defend_a):0;
    var level_b = mark_b>mark_a?(mark_b-mark_a)*(attack_a+attack_b+defend_a+defend_b)/(attack_b+defend_b):0;
    return [mark_a,mark_b,parseInt(level_a),parseInt(level_b)];
}
const create_contest_team =  function(team_a,team_b) {
    var res_a = [];
    var res_b = [];
    //get goal keeper
    var cur_a = 0;
    var cur_b = 0;
    for(var i=0;i<5;i++){
        if(team_a[i].player_attack < team_a[cur_a].player_attack){
            cur_a = i;
        }
        if(team_b[i].player_attack < team_b[cur_b].player_attack){
            cur_b = i;
        }
    }
    res_a.push(team_a[cur_a]);
    team_a.splice(cur_a,1)
    res_b.push(team_b[cur_b]);
    team_b.splice(cur_b,1)
    //get first attacker
    cur_a = 0;
    cur_b = 0;
    for(var i=0;i<4;i++){
        if(team_a[i].player_attack > team_a[cur_a].player_attack){
            cur_a = i;
        }
        if(team_b[i].player_attack > team_b[cur_b].player_attack){
            cur_b = i;
        }
    }
    res_a.push(team_a[cur_a]);
    team_a.splice(cur_a,1)
    res_b.push(team_b[cur_b]);
    team_b.splice(cur_b,1)
    //get second attacker
    cur_a = 0;
    cur_b = 0;
    for(var i=0;i<3;i++){
        if(team_a[i].player_attack > team_a[cur_a].player_attack){
            cur_a = i;
        }
        if(team_b[i].player_attack > team_b[cur_b].player_attack){
            cur_b = i;
        }
    }
    res_a.push(team_a[cur_a]);
    team_a.splice(cur_a,1)
    res_b.push(team_b[cur_b]);
    team_b.splice(cur_b,1)
    //get first defender
    cur_a = 0;
    cur_b = 0;
    for(var i=0;i<2;i++){
        if(team_a[i].player_defend > team_a[cur_a].player_defend){
            cur_a = i;
        }
        if(team_b[i].player_defend > team_b[cur_b].player_defend){
            cur_b = i;
        }
    }
    res_a.push(team_a[cur_a]);
    team_a.splice(cur_a,1)
    res_b.push(team_b[cur_b]);
    team_b.splice(cur_b,1)
    //get second defender
    res_a.push(team_a[0]);
    res_b.push(team_b[0]);
    return [res_a,res_b];
 }
module.exports = {
    team_vs
}
