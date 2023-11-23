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
                {
                    name:'Underground 3',
                    path:'tracks/morgenshtern-entype-104-underground-3-polnaya-versiya.mp3',
                    artist:'Entype, 104, MORGENSTERN',
                    cover:'img/5.jpg',
                },
                {
                    name:'Teни Хиросимы',
                    path:'tracks/GONEFludd_-_TENI_KHIROSIMY_73145423.mp3',
                    artist:'GONE.Fludd',
                    cover:'img/6.jpg',
                },
            ],
            current:{},
            index: 0,
            audio: new Audio(),
            showMenu: false,
            seekBarMax:'--:--',
            likedSongs: [],
            firstTimeLoad: 0,
        }
    },
    created(){
        for (let i=0; i<this.songs.length; i++){
            this.songs[i].liked=false;
        }
        if (localStorage.getItem('myList')!=null){
            this.loadLikeBtn();
        }
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
        handleClick(song){
            let index;
            for (let i=0; i<this.songs.length; i++){
                if (song.name === this.songs[i].name){
                    index = i;
                    break;
                }
            }
            this.current = this.songs[index];
            this.audio.src =  this.songs[index].path;
            this.audio.pause();
            this.isPlaying = false;
            this.playBtnIcon = "fas fa-play";
        },
        showMenuFunction(){
            this.showMenu = this.showMenu === false;
            this.loadList();
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
        },
        like(){
            if (this.current.liked === false) {
                this.current.liked = true;
                this.likedSongs.push(this.current)
            } else {
                this.current.liked = false;
                let pos = this.likedSongs.indexOf(this.current);
                this.likedSongs.splice(pos, 1);
            }
            this.saveList();
        },
        saveList() {
            const list = this.likedSongs;
            const listString = JSON.stringify(list);
            localStorage.setItem('myList', listString);
        },
        loadList() {
            const savedListString = localStorage.getItem('myList');
            const savedList = JSON.parse(savedListString);
            this.likedSongs = savedList;
        },
        loadLikeBtn(){
            const savedListString = localStorage.getItem('myList');
            const savedList = JSON.parse(savedListString);
            for (let i=0; i<this.songs.length; i++){
                for (let j=0; j<savedList.length; j++){
                    if (this.songs[i].name===savedList[j].name){
                        this.songs[i].liked=true;
                        console.log('sefsfesfsefesfsefs')
                    }
                }
                console.log(
                    this.songs[i], this.songs[i].liked
                )
            }
            console.log(savedList)
        }
    },
}
Vue.createApp(App).mount('#app')