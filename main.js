const playlist = [
    {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        image: "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
        name: "Aage Chal",
        singer: "Raftaar",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
        name: "Damn",
        singer: "Raftaar x kr$na",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2020/05/04/c/b/3/a/1588565415259.jpg"
    },
    {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
]

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    currentIndex: 0,
    isPlaying: false,
    render() {
        let html = playlist.map((song, index) => {
            return `
                <div id="song-${index}" class="playlist__item ${index === this.currentIndex ? 'active-song' : ''}" data-index='${index}'>
                    <div class="item-thumbnail" style="background-image: url(${song.image})"></div>
                    <div class="item-body">
                        <div class="item-song-name">${song.name}</div>
                        <div class="item-song-singer">${song.singer}</div>
                    </div>
                    <div class="item-option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })

        $('.playlist').innerHTML = html.join('');
    },
    renderActiveSong() {
        const lastActiveSong = $('.active-song');
        // const lastActiveSongId = lastActiveSong.id.split('-')[1];
        lastActiveSong.classList.remove('active-song');
        $(`#song-${this.currentIndex}`).classList.add('active-song');
        setTimeout(() => {
            $('.active-song').scrollIntoView({
                behavior: "smooth",
                block: 'center'
                // block: `${((this.currentIndex==0 && lastActiveSongId>4) || this.currentIndex==1 && lastActiveSongId>4) ? 'center' : 'nearest'}`
            })
        }, 100);
    },
    handleEvents() {
        const audio = $('#audio');
        const progressPlayer= $('input[name=control-progress]');
        const cdThumbAnimate = $('.cd-thumb').animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity,
            easing: 'linear'

        });
        const cd = $('.dashboard__cd');
        const cdWidth = cd.offsetWidth;

        cdThumbAnimate.pause();
        window.addEventListener('scroll', (e) => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            let newWidth = cdWidth - scrollTop;
            cd.style.width = newWidth <= 0 || window.innerHeight + scrollTop == $('.music-layer').scrollHeight ? 0 : newWidth + 'px';
            cd.style.opacity = parseInt(cd.style.width) / cdWidth;
        })

        $('.control-btn-toggle-play').addEventListener('click', (e) => {
            this.isPlaying ? audio.pause() : audio.play();
        })

        audio.addEventListener('play', (e) => {
            this.isPlaying = true;
            cdThumbAnimate.play();
            $('.music-layer').classList.add('playing')
        })

        audio.addEventListener('pause', (e) => {
            this.isPlaying = false;
            cdThumbAnimate.pause();
            $('.music-layer').classList.remove('playing')
        })

        audio.addEventListener('timeupdate', (e) => {
            progressPlayer.value = audio.duration ? (audio.currentTime*100)/audio.duration : 0;
        })

        audio.addEventListener('ended', (e) => {
            this.nextSong();
            this.renderActiveSong();
            audio.play();
        })

        progressPlayer.addEventListener('input', (e) => {
            audio.currentTime = (e.target.value*audio.duration)/100;
        })

        
        $('.control-btn-prev').addEventListener('click', (e) => {
            this.prevSong();
            this.renderActiveSong();
            audio.play();
        })

        $('.control-btn-next').addEventListener('click', (e) => {
            this.nextSong();
            this.renderActiveSong();
            audio.play();
        })

        $$('.playlist__item').forEach(el => [
            el.addEventListener('click', (event) => {
                if(event.target.closest('.playlist__item:not(.active-song)') && !event.target.closest('.item-option')) {
                    // console.log(el.getAttribute('data-index'))
                    // console.log(el.dataset.index)
                  this.currentIndex = el.id.split('-')[1];
                    this.loadCurrentSong();
                    this.renderActiveSong();
                    audio.play();  
                }
            })
        ])

        $('.control-btn-repeat').addEventListener('click', (e) => {
            audio.currentTime = 0;
        })

        $('.control-btn-random').addEventListener('click', (e) => {
            this.randomSong();
            this.renderActiveSong();
            audio.play();
        })
    },
    getCurrentSong() {
        return playlist[this.currentIndex];
    },
    prevSong() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = playlist.length - 1;
        }
        this.loadCurrentSong();
    },
    nextSong() {
        this.currentIndex++;
        if(this.currentIndex > playlist.length-1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    randomSong() {
        let randomIndex = Math.floor(Math.random()*(playlist.length-1));
        while(randomIndex == this.currentIndex) {
            randomIndex = Math.floor(Math.random()*(playlist.length-1));
        }
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },
    loadCurrentSong() {
        $('.header-song-name').innerText = this.getCurrentSong().name;
        $('.cd-thumb').style.backgroundImage = `url(${this.getCurrentSong().image})`
        $('#audio').src = this.getCurrentSong().audio;
    },
    start() {
        this.render();
        this.handleEvents();
        this.loadCurrentSong();
        console.log('Running...')
    }
}

app.start();

 