/* ==========================================
   FOR HADIYA
   PART 1C-1
========================================== */

const particlesContainer = document.getElementById("particles");
const petalsContainer = document.getElementById("petals");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const enterButton = document.getElementById("enterGarden");
const magicPetal = document.getElementById("magicPetal");

/* Hide everything first */

[line1,line2,title,subtitle,enterButton].forEach(el=>{
    el.style.opacity="0";
});

enterButton.style.transform="translateY(40px)";

/* ==========================================
      GOLD PARTICLES
========================================== */

function createParticle(){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"vw";

    p.style.animationDuration=
        (10+Math.random()*12)+"s";

    p.style.animationDelay=
        Math.random()*5+"s";

    p.style.opacity=Math.random();

    particlesContainer.appendChild(p);

    setTimeout(()=>{

        p.remove();

    },22000);

}

setInterval(createParticle,180);

for(let i=0;i<35;i++){

    createParticle();

}

/* ==========================================
         FLOWER PETALS
========================================== */

const flowers=[
"🌸",
"🌺",
"💮"
];

function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.innerHTML=
        flowers[Math.floor(Math.random()*flowers.length)];

    petal.style.left=Math.random()*100+"vw";

    petal.style.animationDuration=
        (8+Math.random()*8)+"s";

    petal.style.animationDelay=
        Math.random()*2+"s";

    petal.style.fontSize=
        (18+Math.random()*20)+"px";

    petalsContainer.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },18000);

}

setInterval(createPetal,700);

for(let i=0;i<15;i++){

    createPetal();

}

/* ==========================================
      MAGIC OPENING PETAL
========================================== */

function startMagicPetal(){

magicPetal.style.opacity="1";

magicPetal.animate(

[
{
transform:"translate(-50%,-80px) scale(.5)"
},

{
transform:"translate(-50%,45vh) scale(1.5)"
}

],

{

duration:3500,

fill:"forwards",

easing:"ease-in-out"

}

);

setTimeout(()=>{

magicPetal.animate(

[
{
opacity:1,
transform:"translate(-50%,45vh) scale(1.5)"
},

{
opacity:0,
transform:"translate(-50%,45vh) scale(6)"
}

],

{

duration:1200,

fill:"forwards"

}

);

},3400);

}

startMagicPetal();

/* ==========================================
     FADE IN SEQUENCE
========================================== */

function showElement(el){

el.animate(

[
{
opacity:0,
transform:"translateY(30px)"
},

{
opacity:1,
transform:"translateY(0px)"
}

],

{

duration:1200,

fill:"forwards",

easing:"ease"

}

);

}

/* Start after petal */

setTimeout(()=>{

showElement(line1);

},4200);

setTimeout(()=>{

showElement(line2);

},6200);

setTimeout(()=>{

showElement(title);

},8500);

setTimeout(()=>{

showElement(subtitle);

},9800);

setTimeout(()=>{

showElement(enterButton);

enterButton.animate(

[
{
transform:"translateY(40px)"
},

{
transform:"translateY(0)"
}

],

{

duration:1200,

fill:"forwards"

}

);

},11100);
