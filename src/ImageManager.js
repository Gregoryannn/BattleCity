var ImageManager = (function () {
    var images = {

        tank_player1_down_c0_t1: null,
        tank_player1_down_c0_t2: null,
        tank_player1_left_c0_t1: null,
        tank_player1_left_c0_t2: null,
        tank_player1_right_c0_t1: null,
        tank_player1_right_c0_t2: null,
        tank_player1_up_c0_t1: null,
        tank_player1_up_c0_t2: null,

        tank_player1_down_c0_t1_s1: null,
        tank_player1_down_c0_t2_s1: null,
        tank_player1_left_c0_t1_s1: null,
        tank_player1_left_c0_t2_s1: null,
        tank_player1_right_c0_t1_s1: null,
        tank_player1_right_c0_t2_s1: null,
        tank_player1_up_c0_t1_s1: null,
        tank_player1_up_c0_t2_s1: null,

        tank_player1_down_c0_t1_s2: null,
        tank_player1_down_c0_t2_s2: null,
        tank_player1_left_c0_t1_s2: null,
        tank_player1_left_c0_t2_s2: null,
        tank_player1_right_c0_t1_s2: null,
        tank_player1_right_c0_t2_s2: null,
        tank_player1_up_c0_t1_s2: null,
        tank_player1_up_c0_t2_s2: null,

        tank_player1_down_c0_t1_s3: null,
        tank_player1_down_c0_t2_s3: null,
        tank_player1_left_c0_t1_s3: null,
        tank_player1_left_c0_t2_s3: null,
        tank_player1_right_c0_t1_s3: null,
        tank_player1_right_c0_t2_s3: null,
        tank_player1_up_c0_t1_s3: null,
        tank_player1_up_c0_t2_s3: null,

        tank_basic_down_c0_t1: null,
        tank_basic_down_c0_t2: null,
        tank_basic_left_c0_t1: null,
        tank_basic_left_c0_t2: null,
        tank_basic_right_c0_t1: null,
        tank_basic_right_c0_t2: null,
        tank_basic_up_c0_t1: null,
        tank_basic_up_c0_t2: null,

        tank_basic_down_c0_t1_f: null,
        tank_basic_down_c0_t2_f: null,
        tank_basic_left_c0_t1_f: null,
        tank_basic_left_c0_t2_f: null,
        tank_basic_right_c0_t1_f: null,
        tank_basic_right_c0_t2_f: null,
        tank_basic_up_c0_t1_f: null,
        tank_basic_up_c0_t2_f: null,

        tank_fast_down_c0_t1: null,
        tank_fast_down_c0_t2: null,
        tank_fast_left_c0_t1: null,
        tank_fast_left_c0_t2: null,
        tank_fast_right_c0_t1: null,
        tank_fast_right_c0_t2: null,
        tank_fast_up_c0_t1: null,
        tank_fast_up_c0_t2: null,

        appear_1: null,
        appear_2: null,
        appear_3: null,
        appear_4: null,

        big_explosion_1: null,
        big_explosion_2: null,
        big_explosion_3: null,
        big_explosion_4: null,
        big_explosion_5: null,

        shield_1: null,
        shield_2: null,

        bullet_up: null,
        bullet_down: null,
        bullet_left: null,
        bullet_right: null,

        bullet_explosion_1: null,
        bullet_explosion_2: null,
        bullet_explosion_3: null,

        wall_brick: null,
        wall_steel: null,

        base: null,
        base_destroyed: null,

        enemy: null,
        lives: null,
        roman_one: null,

        points_100: null,
        points_500: null,

        powerup_grenade: null,
        powerup_helmet: null,
        powerup_shovel: null,
        powerup_star: null,
        powerup_tank: null,
        powerup_timer: null,
    };

    for (var i in images) {
        var img = new Image();
        img.src = 'images/' + i + '.png';
        images[i] = img;
    }

    return {
        getImage: function (name) {
            return images[name];
        }
    };
})();