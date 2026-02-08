let trumpetSprite = "tpt";
const valveKeys = ["p", "o", "i"];
const partialKeys = ["z", "x", "c", "v", "b", "n", "m"];
let activeKey = null;
let previousKey = null;
const fingers = new Set();
let currentBb = null;

let position = 1
const trumpetImage = document.getElementById('trumpet');
function getPlaybackRate(key, position) {
    baseFactors = {
        z: 1 * 2,
        x: 1.498 * 2,
        c: 2 * 2,
        v: 2.52 * 2,
        b: 2.998 * 2,
        n: 3.567 * 2,
        m: 4 * 2
    }
    const factor = Math.pow(Math.pow(2, (-0.5)), (position - 1) / 6);
    return baseFactors[key] * factor;
}
function playBb(rate) {
   if (currentBb) {
    currentBb.pause();
    currentBb.currentTime = 0;
   } 
   currentBb = new Audio('audio/bbtrumpet.mp3')
   currentBb.preservesPitch = false;
   currentBb.playbackRate = rate;
   currentBb.play();
}
function checkFingers() {
    const fingering = [...fingers].sort().join("");
    switch (fingering) {
        case "p":
            trumpetImage.src = "images/tpt1.png";
            position = 3;
            break;
        case "o":
            trumpetImage.src = "images/tpt2.png";
            position = 2;
            break;
        case "i":
            trumpetImage.src = "images/tpt3.png";
            position = 4;
            break;
        case "op":
            trumpetImage.src = "images/tpt12.png";
            position = 4;
            break;
        case "ip":
            trumpetImage.src = "images/tpt13.png";
            position = 6;
            break;
        case "io":
            trumpetImage.src = "images/tpt23.png"
            position = 5;
            break;
        case "iop":
            trumpetImage.src = "images/tpt123.png"
            position = 7;
            break;
        default:
            trumpetImage.src = "images/tpt.png"
            position = 1;
        getPlaybackRate();
    }
}

document.addEventListener('keydown', (check) => {
    if(check.repeat) return;
    const key = check.key.toLowerCase();
    if(!valveKeys.includes(key) && !partialKeys.includes(key)) return;
    if(valveKeys.includes(key)) {
        fingers.add(key);
    }
    checkFingers();
    if(partialKeys.includes(key)) {
        activeKey = check.key;
        playBb(getPlaybackRate(activeKey, position));
    }
    if(activeKey !== null && activeKey !== key && partialKeys.includes(activeKey)) {
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
    }
    if(valveKeys.includes(key) && partialKeys.includes(activeKey)) {
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
        playBb(getPlaybackRate(activeKey, position));
    }
})
document.addEventListener('keyup', (check) => {
        const key = check.key.toLowerCase();
    if(partialKeys.includes(key)) {
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
    }

    if(valveKeys.includes(key) && !partialKeys.includes(key) && !activeKey == null) {
        checkFingers();
        if (currentBb) {
            currentBb.pause();
            currentBb.currentTime = 0;
            currentBb = null;
        }
    }
    fingers.delete(check.key.toLowerCase());
    checkFingers();


}) 