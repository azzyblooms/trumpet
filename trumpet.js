let trumpetSprite = "tpt";
const valveKeys = ["p", "o", "i"];
const fingers = new Set();
const Bb = new Audio('audio/bbtrumpet.mp3')
const trumpetImage = document.getElementById('trumpet');

function checkFingers() {
    const fingering = [...fingers].sort().join("");
    switch (fingering) {
        case "p":
            trumpetImage.src = "images/tpt1.png";
            break;
        case "o":
            trumpetImage.src = "images/tpt2.png";
            break;
        case "i":
            trumpetImage.src = "images/tpt3.png";
            break;
        case "op":
            trumpetImage.src = "images/tpt12.png";
            break;
        case "ip":
            trumpetImage.src = "images/tpt13.png";
            break;
        case "io":
            trumpetImage.src = "images/tpt23.png"
            break;
        case "iop":
            trumpetImage.src = "images/tpt123.png"
            break;
        default:
            trumpetImage.src = "images/tpt.png"

    }
}

document.addEventListener('keydown', (check) => {
    const key = check.key.toLowerCase();
    if(!valveKeys.includes(key)) return;

    fingers.add(key);
    checkFingers();
})
document.addEventListener('keyup', (check) => {
    fingers.delete(check.key.toLowerCase());
    checkFingers();
})