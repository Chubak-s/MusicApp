const App={
    data(){
        return{
            isPlaying: false,
            playBtnIcon: "fas fa-play",
            currentTimer: '00:00',
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
            seekBarMax:'--:--',
        }
    },
    beforeCreate(){

    },
    mounted() {
        this.audio.src = this.songs[this.index].path;
        this.current = this.songs[this.index];

        let preventUpdate = false;

        const updateTime = (e) => {
            if (!preventUpdate) {
                const { duration, currentTime } = e.srcElement;
                this.currentTime = (currentTime / duration) * 100;
            }
        }
        this.audio.addEventListener('ended', () => {
            this.nextMusic();
        });
        this.audio.addEventListener('timeupdate', updateTime);
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
        },
        onLoadedMetadata() {
            const audioElement = this.audio;
            let timeAudio =  Math.round(audioElement.duration);
            let min =  Math.floor(timeAudio/60);
            let sec = Math.round(timeAudio%60);
            if (isNaN(timeAudio)){
                return this.seekBarMax;
            }
            else if (min<10 && sec>9) {
                return `0${min}:${sec}`
            }
            else if (min<10 && sec<10) {
                return `0${min}:0${sec}`
            }
            return `${min}:${sec}`
        },
        currentTimeData(){
            const audioElement = this.audio;
            let timeAudio =  Math.round(audioElement.currentTime);
            let min = Math.floor(timeAudio/60);
            let sec = Math.round(timeAudio%60);
            if (timeAudio===0){
                return this.currentTimer;
            }
            else if (min<10 && sec>9) {
                return `0${min}:${sec}`
            }
            else if (min<10 && sec<10) {
                return `0${min}:0${sec}`
            }
            return `${min}:${sec}`
        },
        change(e){
            const area = document.getElementById('area');
            const rect = area.getBoundingClientRect();
            const x = e.clientX- rect.left;
            const result = Math.round((x/rect.width)*this.audio.duration);
            this.audio.currentTime = result;
            console.log(result);
        }
    },
}
Vue.createApp(App).mount('#app')