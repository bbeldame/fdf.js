const canvas = document.getElementById('fdf');
const ctx = canvas.getContext('2d');
let zoom = 30;
let map = [];

(function() {
    initparse("42", drawfdf);
})();

function drawline(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = 1;
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function rotX(angle) {
    let rangle = angle * (Math.PI / 180);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let tmp = map[y][x].y;
            map[y][x].y = Math.cos(rangle) * map[y][x].y - Math.sin(rangle) * map[y][x].z;
            map[y][x].z = Math.sin(rangle) * tmp - Math.cos(rangle) * map[y][x].z;
        }
    }
}

function rotY(angle) {
    let rangle = angle * (Math.PI / 180);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let tmp = map[y][x].x;
            map[y][x].x = Math.cos(rangle) * map[y][x].x + Math.sin(rangle) * map[y][x].z;
            map[y][x].y = Math.sin(rangle) * -tmp + Math.cos(rangle) * map[y][x].z;
        }
    }
}

function rotZ(angle) {
    let rangle = angle * (Math.PI / 180);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let tmp = map[y][x].x;
            map[y][x].x = Math.cos(rangle) * map[y][x].x - Math.sin(rangle) * map[y][x].y;
            map[y][x].y = Math.sin(rangle) * tmp + Math.cos(rangle) * map[y][x].y;
        }
    }
}

function drawfdf(arr) {
    map = arr;
    rotZ(10);
    rotX(5);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length - 1; x++) {
            drawline(
                zoom * map[y][x].x + ctx.canvas.width / 2,
                zoom * map[y][x].y + ctx.canvas.height / 2,
                zoom * map[y][x + 1].x + ctx.canvas.width / 2,
                zoom * map[y][x + 1].y + ctx.canvas.height / 2
            );
        }
    }
    for (let x = 0; x < map[0].length; x++) {
        console.log('x =', x);
        for (let y = 0; y < map.length - 1; y++) {
            drawline(
                zoom * map[y][x].x + ctx.canvas.width / 2,
                zoom * map[y][x].y + ctx.canvas.height / 2,
                zoom * map[y + 1][x].x + ctx.canvas.width / 2,
                zoom * map[y + 1][x].y + ctx.canvas.height / 2
            );
        }
    }
}