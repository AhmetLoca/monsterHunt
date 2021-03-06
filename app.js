new Vue({
    el: "#app",
    data:{
        player_heal:100,
        monster_heal:100,
        game_is_on:true,
        game_logs:[]
    },
    methods:{
        
        start_game:function(){
            this.game_is_on= false;
        },
        
        attack:function(){
            var point = Math.ceil(Math.random() * 10);
            //this.monster_heal = this.monster_heal -point;
              this.monster_heal -=point;
              this.monster_attack();
              this.add_to_log({turn : "player", text : "Player's Attack ("+ point +") "})


        },

        special_attack:function(){
            var point = Math.ceil(Math.random() * 25);
              this.monster_heal -=point;
              this.monster_attack();
              this.add_to_log({turn : "player", text : "Special Player's Attack ("+ point +") "})

        },
        
        first_aid:function(){
            var point = Math.ceil(Math.random() * 15);
            this.player_heal +=point;
            this.add_to_log({turn : "player", text : "First Aid("+ point +") "})

        },

        give_up:function(){
            this.player_heal = 0;
            this.add_to_log({turn : "player", text : "Player give up!"})

        },

        monster_attack:function(){
            var point = Math.ceil(Math.random() * 15);
              this.player_heal -=point;
              this.add_to_log({turn : "monster", text : "Attack of monster ("+ point +") "})

        },

        add_to_log: function(log){
            this.game_logs.push(log);
        }

    },

    /*watch,reactive property, bir değişkenin değerini okuyup
    ona göre aksiyon almamızı sağlayan bir instance property. */

    watch:{              
                //player_heal'ın değişen value'su.
        player_heal : function(value){
                if(value <= 0){
                    this.player_heal = 0;
                    if(confirm("You lost the game. Can you want to try it again?")){
                        this.player_heal=100;
                        this.monster_heal=100;
                        this.game_logs=[];
                    }
                }
                else if(value >=100){
                    this.player_heal=100;
                }
        },
        monster_heal : function(value){
            if(value <= 0){
                this.monster_heal = 0;
                if(confirm("You win the game. Can you want to try it again?")){
                    this.player_heal=100;
                    this.monster_heal=100;
                    this.game_logs=[];
                }
            }
        }
    }
})