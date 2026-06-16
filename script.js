"use strict";

/*==================================================
            A GARDEN FOR HADIYA
==================================================*/

/*==================================================
                STORY DATA
==================================================*/

const STORIES = [

    {
        title: "Butter Yellow",
        subtitle: "Peony Bouquet",
        image: "images/butter.png",
        accent: "#FFD54A",
        message: "Like sunshine after the rain, you brighten every place you walk into."
    },

    {
        title: "Popes Yellow",
        subtitle: "Peony Bouquet",
        image: "images/popes.png",
        accent: "#FFC107",
        message: "A bouquet filled with warmth, happiness and every smile that reminds me of you."
    },

    {
        title: "Golden Harmony",
        subtitle: "Peony Bouquet",
        image: "images/combo.png",
        accent: "#FFD95A",
        message: "Two shades of sunshine woven together into one beautiful bouquet."
    },

    {
        title: "Light Pink",
        subtitle: "Peony Bouquet",
        image: "images/lightpink.png",
        accent: "#F8BBD0",
        message: "Gentle hearts leave the deepest impressions."
    },

    {
        title: "Dark Pink",
        subtitle: "Peony Bouquet",
        image: "images/darkpink.png",
        accent: "#EC407A",
        message: "Beautiful. Elegant. Unforgettable."
    },

    {
        title: "Royal Maroon",
        subtitle: "Peony Bouquet",
        image: "images/maroon.png",
        accent: "#8E244D",
        message: "Some flowers bloom quietly, yet leave the deepest impression."
    }

];

/*==================================================
                GARDEN APP
==================================================*/

class GardenApp {

    constructor(){

        this.stories = STORIES;

        this.config = {

            storyDuration:7000,

            typingSpeed:30,

            transition:800

        };

        this.state = {

            current:0,

            musicPlaying:false,

            paused:false,

            animating:false

        };

        this.timer = {

            story:null,

            typing:null,

            progress:null

        };

        this.dom = {};

    }
    /*==================================================
                    INITIALIZE
    ==================================================*/

    init() {

        this.cacheDOM();

        this.preloadImages();

        this.createProgressBars();

        this.bindEvents();

this.createPetals();

this.createFireflies();

this.enableSwipe();
this.bindSecretButton();
this.createCursorGlow();

this.enableRipple();

this.enableKeyboard();

this.watchVisibility();

this.startSecretPetals();

        console.log("🌸 Garden Ready");

    }

    /*==================================================
                    CACHE DOM
    ==================================================*/

    cacheDOM() {

        const ids = [

            "loader",

            "background",

            "gradient",

            "particles",

            "petals",

            "fireflies",

            "music",

            "musicButton",

            "progress",

            "introScreen",

            "storyScreen",

            "storyImage",

            "storyTitle",

            "storySubtitle",

            "storyMessage",

            "enterGarden",

            "endingScreen",

            "dontClick",

            "secretGarden",

            "secretTitle",

            "secretMessage",

            "hijabiGirl",

            "swipeHint"

        ];

        ids.forEach(id => {

            this.dom[id] = document.getElementById(id);

        });

    }

    /*==================================================
                PRELOAD IMAGES
    ==================================================*/

    preloadImages() {

        this.stories.forEach(story => {

            const img = new Image();

            img.src = story.image;

        });

    }

    /*==================================================
            CREATE PROGRESS BARS
    ==================================================*/

    createProgressBars() {

        if (!this.dom.progress) return;

        this.dom.progress.innerHTML = "";

        this.stories.forEach(() => {

            const bar = document.createElement("div");

            bar.className = "progressBar";

            const fill = document.createElement("div");

            fill.className = "progressFill";

            bar.appendChild(fill);

            this.dom.progress.appendChild(bar);

        });

    }
    /*==================================================
                BIND EVENTS
==================================================*/

bindEvents(){

    if(this.dom.enterGarden){

        this.dom.enterGarden.addEventListener(

            "click",

            ()=>this.enterGarden()

        );

    }

    const next=document.getElementById("nextBtn");

    if(next){

        next.addEventListener(

            "click",

            ()=>this.nextStory()

        );

    }

    const prev=document.getElementById("prevBtn");

    if(prev){

        prev.addEventListener(

            "click",

            ()=>this.previousStory()

        );

    }

    if(this.dom.musicButton){

        this.dom.musicButton.addEventListener(

            "click",

            ()=>this.toggleMusic()

        );

    }

}
/*==================================================
                ENTER GARDEN
==================================================*/

enterGarden() {

    if (this.dom.introScreen) {

        this.dom.introScreen.classList.remove("active");
        this.dom.introScreen.classList.add("hide");

    }

    if (this.dom.storyScreen) {

        this.dom.storyScreen.classList.add("active");
        this.dom.storyScreen.classList.remove("hide");

    }

    this.loadStory(0);

}

/*==================================================
                TOGGLE MUSIC
==================================================*/

toggleMusic() {

    if (!this.dom.music) return;

    if (this.state.musicPlaying) {

        this.dom.music.pause();

        this.state.musicPlaying = false;

        this.dom.musicButton.textContent = "♫";

    } else {

        this.dom.music.volume = 0.35;

        this.dom.music.play().catch(() => {});

        this.state.musicPlaying = true;

        this.dom.musicButton.textContent = "❚❚";

    }

}

/*==================================================
                LOAD STORY
==================================================*/

loadStory(index) {

    if (index < 0 || index >= this.stories.length) return;

    this.state.current = index;

    const story = this.stories[index];

    this.dom.storyImage.classList.remove("imageBloom");

    void this.dom.storyImage.offsetWidth;

    this.dom.storyImage.classList.add("imageBloom");

    this.dom.storyTitle.textContent = story.title;

    this.dom.storySubtitle.textContent = story.subtitle;

    this.dom.storyImage.src = story.image;

   this.typeWriter(story.message);

this.animateStory();

this.fadeStory();

this.updateAccent();

this.updateProgress();

this.startStoryTimer();
}

/*==================================================
                TYPEWRITER
==================================================*/

typeWriter(text) {

    clearInterval(this.timer.typing);

    this.dom.storyMessage.textContent = "";

    let i = 0;

    this.timer.typing = setInterval(() => {

        this.dom.storyMessage.textContent += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(this.timer.typing);

        }

    }, this.config.typingSpeed);

}

/*==================================================
                NEXT STORY
==================================================*/
nextStory() {

    if (this.state.current >= this.stories.length - 1) {

        this.showEnding();

        return;

    }

    this.loadStory(this.state.current + 1);

}



/*==================================================
                PREVIOUS STORY
==================================================*/

previousStory() {

    let previous = this.state.current - 1;

    if (previous < 0) {

        previous = this.stories.length - 1;

    }

    this.loadStory(previous);

}
/*==================================================
                START STORY TIMER
==================================================*/

startStoryTimer() {

    this.stopStoryTimer();

    let progress = 0;

    const fills = document.querySelectorAll(".progressFill");

    fills.forEach((fill, index) => {

        if (index < this.state.current) {

            fill.style.width = "100%";

        } else {

            fill.style.width = "0%";

        }

    });

    const currentFill = fills[this.state.current];

    this.timer.progress = setInterval(() => {

        progress += 100 / (this.config.storyDuration / 50);

        if (currentFill) {

            currentFill.style.width = progress + "%";

        }

    }, 50);

    this.timer.story = setTimeout(() => {

        this.nextStory();

    }, this.config.storyDuration);

}

/*==================================================
                STOP STORY TIMER
==================================================*/

stopStoryTimer() {

    clearTimeout(this.timer.story);

    clearInterval(this.timer.progress);

}

/*==================================================
                UPDATE PROGRESS
==================================================*/

resetProgressBars() {

    const fills = document.querySelectorAll(".progressFill");

    fills.forEach(fill => {

        fill.style.width = "0%";

    });

}
/*==================================================
                CREATE PETALS
==================================================*/

createPetals() {

    if (!this.dom.petals) return;

    setInterval(() => {

        const petal = document.createElement("div");

        petal.className = "petal";

        petal.innerHTML = "🌸";

        petal.style.left = Math.random() * window.innerWidth + "px";

        petal.style.animationDuration =
            (5 + Math.random() * 6) + "s";

        petal.style.fontSize =
            (12 + Math.random() * 20) + "px";

        this.dom.petals.appendChild(petal);

        setTimeout(() => {

            petal.remove();

        },11000);

    },450);

}

/*==================================================
                CREATE FIREFLIES
==================================================*/

createFireflies(){

    if(!this.dom.fireflies) return;

    for(let i=0;i<35;i++){

        const firefly=document.createElement("div");

        firefly.className="firefly";

        firefly.style.left=Math.random()*100+"%";

        firefly.style.top=Math.random()*100+"%";

        firefly.style.animationDelay=
        Math.random()*6+"s";

        this.dom.fireflies.appendChild(firefly);

    }

}

/*==================================================
                CHANGE BACKGROUND
==================================================*/

changeBackground(){

    const color=this.stories[this.state.current].accent;

    document.documentElement
    .style
    .setProperty("--gold",color);

}

/*==================================================
                ENABLE SWIPE
==================================================*/

enableSwipe(){

    let startX=0;

    document.addEventListener(

        "touchstart",

        e=>{

            startX=e.changedTouches[0].clientX;

        }

    );

    document.addEventListener(

        "touchend",

        e=>{

            const endX=e.changedTouches[0].clientX;

            const diff=endX-startX;

            if(diff>80){

                this.previousStory();

            }

            if(diff<-80){

                this.nextStory();

            }

        }

    );

}

/*==================================================
                STORY ANIMATION
==================================================*/

animateStory(){

    this.dom.storyImage.classList.remove(

        "imageBloom"

    );

    void this.dom.storyImage.offsetWidth;

    this.dom.storyImage.classList.add(

        "imageBloom"

    );

    this.dom.storyTitle.classList.remove(

        "storyFade"

    );

    void this.dom.storyTitle.offsetWidth;

    this.dom.storyTitle.classList.add(

        "storyFade"

    );

}
/*==================================================
                MODULE 5
            LUXURY STORY ENGINE
==================================================*/

/*==============================
        SHOW ENDING
==============================*/

showEnding() {

    this.stopStoryTimer();

    if (this.dom.storyScreen) {

        this.dom.storyScreen.classList.remove("active");
        this.dom.storyScreen.classList.add("hide");

    }

    if (this.dom.endingScreen) {

        this.dom.endingScreen.classList.remove("hide");
        this.dom.endingScreen.classList.add("active");

    }

}

/*==============================
        SHOW SECRET GARDEN
==============================*/

showSecretGarden() {

    if (this.dom.endingScreen) {

        this.dom.endingScreen.classList.remove("active");
        this.dom.endingScreen.classList.add("hide");

    }

    if (this.dom.secretGarden) {

        this.dom.secretGarden.classList.remove("hide");
        this.dom.secretGarden.classList.add("active");

    }

}

/*==============================
        UPDATE PROGRESS
==============================*/

updateProgress() {

    const fills = document.querySelectorAll(".progressFill");

    fills.forEach((fill, index) => {

        if (index < this.state.current) {

            fill.style.width = "100%";

        } else if (index > this.state.current) {

            fill.style.width = "0%";

        }

    });

}

/*==============================
        FADE STORY
==============================*/

fadeStory() {

    this.dom.storyImage.style.opacity = "0";

    this.dom.storyTitle.style.opacity = "0";

    this.dom.storySubtitle.style.opacity = "0";

    this.dom.storyMessage.style.opacity = "0";

    setTimeout(() => {

        this.dom.storyImage.style.opacity = "1";

        this.dom.storyTitle.style.opacity = "1";

        this.dom.storySubtitle.style.opacity = "1";

        this.dom.storyMessage.style.opacity = "1";

    },300);

}

/*==============================
        ACCENT COLOR
==============================*/

updateAccent() {

    const accent = this.stories[this.state.current].accent;

    document.documentElement.style
        .setProperty("--gold", accent);

}

/*==============================
        SECRET BUTTON
==============================*/

bindSecretButton() {

    if (!this.dom.dontClick) return;

    this.dom.dontClick.addEventListener("click", () => {

        this.showSecretGarden();

    });

}
/*==================================================
                MODULE 6
            FINAL POLISH
==================================================*/

/*==============================
        CURSOR GLOW
==============================*/

createCursorGlow() {

    const glow = document.createElement("div");

    glow.id = "cursorGlow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove", e => {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

}

/*==============================
        RIPPLE EFFECT
==============================*/

enableRipple() {

    document.addEventListener("click", e => {

        const ripple = document.createElement("div");

        ripple.className = "ripple";

        ripple.style.left = e.clientX + "px";

        ripple.style.top = e.clientY + "px";

        document.body.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        },800);

    });

}

/*==============================
        KEYBOARD
==============================*/

enableKeyboard() {

    document.addEventListener("keydown", e => {

        if(e.key==="ArrowRight"){

            this.nextStory();

        }

        if(e.key==="ArrowLeft"){

            this.previousStory();

        }

    });

}

/*==============================
        TAB VISIBILITY
==============================*/

watchVisibility(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                this.stopStoryTimer();

            }

            else{

                this.startStoryTimer();

            }

        }

    );

}

/*==============================
        SECRET PETALS
==============================*/

startSecretPetals(){

    if(!this.dom.secretGarden) return;

    setInterval(()=>{

        if(!this.dom.secretGarden.classList.contains("active")) return;

        const petal=document.createElement("div");

        petal.className="petal";

        petal.innerHTML="🌸";

        petal.style.left=Math.random()*window.innerWidth+"px";

        petal.style.fontSize=

        (18+Math.random()*18)+"px";

        petal.style.animationDuration=

        (6+Math.random()*5)+"s";

        this.dom.secretGarden.appendChild(petal);

        setTimeout(()=>{

            petal.remove();

        },12000);

    },300);

}

/*==============================
        MUSIC FADE
==============================*/

fadeMusic(target){

    if(!this.dom.music) return;

    let volume=this.dom.music.volume;

    const step=.02;

    const interval=setInterval(()=>{

        if(volume<target){

            volume+=step;

        }

        else if(volume>target){

            volume-=step;

        }

        this.dom.music.volume=Math.max(0,

        Math.min(1,volume));

        if(Math.abs(volume-target)<.03){

            clearInterval(interval);

        }

    },80);

}
}
    /*==================================================
                START APPLICATION
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const app = new GardenApp();

    window.Garden = app;

    app.init();

});
