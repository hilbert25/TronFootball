pragma solidity >=0.4.21;

contract Football {

    address public admin;
    uint256 public userMap_cnt;
    uint256 public common_count;
    uint256 public vip_count;
    uint256 public rankMap_cnt;
    uint256 public cardMap_cnt;
    uint256 public power_count;
    uint256 public matchMap_cnt;
    uint256 public saleCardMap_cnt ;
    uint256 public common_card_price ;
    uint256 public vip_card_price;
    uint256 public power_price;
    mapping(uint256=>Card) public card_map;
    mapping(address=>User) public user_map;
    struct Card {
        uint256  card_id;
        address  owner;
        uint256  player_id;
        uint256  level;
        bool  on_market;
    }

    struct User {
        address user_address;
        bool user_free;
        uint256 user_card_cnt;
        uint256[] card_list;
        uint256 last_time;
        uint256 power;
        uint256 user_contest_cnt;
        Contest[] contest_list;
        uint256[5] team;
    }

    struct Contest {
        address my_address;
        address challenger_address;
        uint256 my_score;
        uint256 challenger_score;
        uint256 team_point;
    }
    constructor() public{
        admin = msg.sender;
        userMap_cnt = 1;
        common_count = 1;
        vip_count = 1;
        rankMap_cnt = 1;
        cardMap_cnt = 1;
        power_count = 1;
        matchMap_cnt = 1;
        saleCardMap_cnt = 1;
        common_card_price = 3;
        vip_card_price = 1;
        power_price = 1;
    }
     
    function random(uint256 begin,uint256 end) public view returns(uint256) {//[)
        uint256 number = uint256(keccak256(abi.encodePacked(abi.encodePacked(now),msg.sender,block.difficulty))) % (end-begin);
        return number+begin;
    }

    function get_matchMap_cnt() public view returns(uint256) {
        return matchMap_cnt;
    }

    function get_address() public view returns(address) {
        return msg.sender;
    }

    function get_userMap_cnt() public view returns(uint256) {
        return userMap_cnt;
    }

    function get_cardMap_cnt() public view returns(uint256) {
        return cardMap_cnt;
    }
    
    function get_vip_count() public view returns(uint256) {
        return vip_count;
    }

    function get_common_count() public view returns(uint256) {
        return common_count;
    }

    function get_power_count() public view returns(uint256) {
        return power_count;
    }

    function get_saleCardMap_cnt() public view returns(uint256) {
        return saleCardMap_cnt;
    }
    
    function random_all_card() public view returns(uint256) {
        return uint256(random(1,301));
    }

    function random_goalkeeper_card() public view returns(uint256) {
        uint16[61] memory goalKeeperList = [62 , 63 , 64 , 65 , 66 , 67 , 68 , 69 , 70 , 71 , 72 , 73 , 74 , 75 , 76 , 77 , 78 , 79 , 80 , 81 , 171 , 178 , 179 , 180 , 185 , 186 , 187 , 188 , 189 , 190 , 191 , 192 , 193 , 197 , 198 , 199 , 202 , 203 , 204 , 208 , 214 , 215 , 218 , 221 , 222 , 223 , 226 , 227 , 229 , 251 , 252 , 270 , 277 , 280 , 283 , 287 , 290 , 291 , 292 , 295 , 299];
        return goalKeeperList[random(0, goalKeeperList.length)];
    }

    function random_not_goalkeeper_card() public view returns(uint256) {
        uint16[239] memory notGoalKeeperList =[1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 , 20 , 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29 , 30 , 31 , 32 , 33 , 34 , 35 , 36 , 37 , 38 , 39 , 40 , 41 , 42 , 43 , 44 , 45 , 46 , 47 , 48 , 49 , 50 , 51 , 52 , 53 , 54 , 55 , 56 , 57 , 58 , 59 , 60 , 61 , 82 , 83 , 84 , 85 , 86 , 87 , 88 , 89 , 90 , 91 , 92 , 93 , 94 , 95 , 96 , 97 , 98 , 99 , 100 , 101 , 102 , 103 , 104 , 105 , 106 , 107 , 108 , 109 , 110 , 111 , 112 , 113 , 114 , 115 , 116 , 117 , 118 , 119 , 120 , 121 , 122 , 123 , 124 , 125 , 126 , 127 , 128 , 129 , 130 , 131 , 132 , 133 , 134 , 135 , 136 , 137 , 138 , 139 , 140 , 141 , 142 , 143 , 144 , 145 , 146 , 147 , 148 , 149 , 150 , 151 , 152 , 153 , 154 , 155 , 156 , 157 , 158 , 159 , 160 , 161 , 162 , 163 , 164 , 165 , 166 , 167 , 168 , 169 , 170 , 172 , 173 , 174 , 175 , 176 , 177 , 181 , 182 , 183 , 184 , 194 , 195 , 196 , 200 , 201 , 205 , 206 , 207 , 209 , 210 , 211 , 212 , 213 , 216 , 217 , 219 , 220 , 224 , 225 , 228 , 230 , 231 , 232 , 233 , 234 , 235 , 236 , 237 , 238 , 239 , 240 , 241 , 242 , 243 , 244 , 245 , 246 , 247 , 248 , 249 , 250 , 253 , 254 , 255 , 256 , 257 , 258 , 259 , 260 , 261 , 262 , 263 , 264 , 265 , 266 , 267 , 268 , 269 , 271 , 272 , 273 , 274 , 275 , 276 , 278 , 279 , 281 , 282 , 284 , 285 , 286 , 288 , 289 , 293 , 294 , 296 , 297 , 298 , 300];
        return notGoalKeeperList[random(0, notGoalKeeperList.length)];
    }

    function random_vip_card() public view returns(uint256) {
        return uint256(random(1,82));
    }
    function random_common_card() public view returns(uint256) {
        return uint256(random(1,219));
    }

    function get_admin() public returns(address) {
        return admin;
    }

    function get_card_id(uint256 card_id) public returns(uint256) {
        return card_map[card_id].card_id;
    }
    
    function get_common_card_price() public returns(uint256) {
        return common_card_price;
    }
    
    function get_vip_card_price() public returns(uint256) {
        return vip_card_price;
    }

    function get_power_price() public returns(uint256) {
        return power_price;
    }

    function set_common_card_price(uint256 price) public {
        require(msg.sender == admin);
        common_card_price = price;
    }

    function set_vip_card_price(uint256 price) public {
        require(msg.sender == admin);
        vip_card_price = price;
    }

    function set_power_price(uint256 price) public {
        require(msg.sender == admin);
        power_price = price;
    }

    function user_login() public view returns(address,bool,uint256,uint256,uint256,uint256){
        //address user_from = msg.sender;
        //User memory user = user_map[user_from];
        // if (user.user_address == address(0)){
        //     return (msg.sender,false,0,0,0,0);
        // }
        return (address(0),false,0,0,0,0);
   
        //return (user.user_address,user.user_free,user.user_card_cnt,user.last_time,user.power,user.user_contest_cnt);
    }
}
