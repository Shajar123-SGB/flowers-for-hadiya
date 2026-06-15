const bouquets = [

{
img:"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800",
msg:"💛 Butter Yellow Peonies — Like sunshine on a quiet morning, you make ordinary days brighter."
},

{
img:"https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800",
msg:"🌼 Poppy Yellow Peonies — Some people leave footprints. You leave entire gardens."
},

{
img:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
msg:"💛🌼 Yellow Mix — The happiest colors reminded me of the happiest person."
},

{
img:"https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800",
msg:"🌸 Light Pink Peonies — Soft, gentle, and beautiful in ways words struggle to describe."
},

{
img:"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800",
msg:"🌷 Dark Pink Peonies — For all the laughter and memories we've shared."
},

{
img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
msg:"❤️ Maroon Red Peonies — Some friendships become family."
},

{
img:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
msg:"🌸💛❤️ Every flower here was chosen for a reason, but none are as wonderful as you, Hadiya. — Shajar"
}

];

let index = 0;

function nextBouquet(){
    document.getElementById("bouquet").src = bouquets[index].img;
    document.getElementById("message").innerText = bouquets[index].msg;

    index++;

    if(index >= bouquets.length){
        index = 0;
    }
}
