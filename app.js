const App={
    data(){
        return{
            isPlaying: false,
            playBtnIcon: "fas fa-play",
            currentTime: 0,
            songs:[
                {
                    name:'Haunted House',
                    path:'tracks/aarne-big-baby-tape-kizaru-haunted-house-mp3.mp3',
                    artist:'Aarne, Big Baby Tape',
                    cover:'img/1.jpg',
                },
                {
                    name:'Bitch',
                    path:'tracks/104, Скриптонит - Bitch.mp3',
                    artist:'104, Скриптонит',
                    cover:'img/2.jpg',
                },
                {
                    name:'OVERHEAVEN',
                    path:'tracks/gone-fludd-overheaven-mp3.mp3',
                    artist:'GONE.Fludd',
                    cover:'img/3.jpg',
                },
                {
                    name:'Sheikh',
                    path:'tracks/morgenshtern-sheikh-mp3.mp3',
                    artist:'MORGENSTERN',
                    cover:'img/4.jpg',
                },
            ],
            current:{},
            index: 0,
            audio: new Audio(),
            showMenu: false,
            seekBarMax: 0,
        }
    },
    mounted(){
      this.audio.src =  this.songs[this.index].path;
      this.current = this.songs[this.index];
      this.seekBarMax = this.audio.duration;
      console.log(this.seekBarMax);
    },
    methods:{
        playMusic(){
            if (this.isPlaying){
                this.audio.pause();
                this.isPlaying = false;
                this.playBtnIcon = "fas fa-play";
            } else {
                this.audio.play();
                this.isPlaying = true;
                this.playBtnIcon = "fas fa-pause";
            }
            setInterval(() => {
                this.currentTime = this.audio.currentTime;
            }, 0.001);
        },
        prevMusic(){
            this.index--;
            if (this.index < 0) {
                this.index = this.songs.length - 1;
            }
            this.current = this.songs[this.index];
            this.audio.src = this.current.path;
            if (this.isPlaying) {
                this.audio.play();
            }
        },
        nextMusic(){
            this.index++;
            if (this.index > this.songs.length-1) {
                this.index = 0;
            }
            this.current = this.songs[this.index];
            this.audio.src = this.current.path;
            if (this.isPlaying) {
                this.audio.play();
            }
        },
        handleClick(index){
            this.index=index;
            this.current = this.songs[index];
            this.audio.src =  this.songs[index].path;
            this.audio.pause();
            this.isPlaying = false;
            this.playBtnIcon = "fas fa-play";
        },
        showMenuFunction(){
            this.showMenu = this.showMenu === false;
        }
    },
}
Vue.createApp(App).mount('#app')