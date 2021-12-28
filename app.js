new Vue({
    el: '#app',
    data:{
        isRunning: false,
        playerLife :  100,
        monsterLife : 100,
        logs: []
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods:{
        startGame(){
            this.resetLifes();
            this.clearLog();
            this.isRunning = true;
        },
        quitGame(){
            this.resetLifes();
            this.clearLog();
            this.isRunning = false;
        },
        attack(special){
            this.hurt("monsterLife",5, 10, special, "Player", "Monster", "player")
            if(this.monsterLife > 0){
                this.hurt("playerLife",5, 15, false, "Monster", "Player", "monster")
            }            
        },
        healAndHurt(){
            this.heal(7, 14);
            this.hurt("playerLife", 5, 15, false, "Monster", "Player", "monster");
        },
        heal(min, max){
            const heal = this.getRandom(min, max);
            this.playerLife = Math.min(this.playerLife + heal, 100);
            this.registerLog(`${heal} Health recovery player`, "healLog")
        },
        hurt(attribute, min, max, special, source, target, cls){
            const plus = special ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[attribute] = Math.max(this[attribute] - hurt, 0);
            this.registerLog(`${source} hit ${target} with ${hurt}.`, cls);
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value);
        },
        registerLog(text, cls){
            this.logs.unshift({text, cls});
        },

        //Métodos para aprimoramento pessoais sobre o projeto.
        resetLifes(){
            this.playerLife = 100;
            this.monsterLife = 100;
        },
        clearLog(){
            this.logs = [];
        }
    },
    watch:{
        hasResult(value){
            if (value) this.isRunning = false
        }
    }
})