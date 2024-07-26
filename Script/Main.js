function CreatePlayerCube() {
    createCube({ x: -1.5, y: 0, z: -3.5 }, 'blue');

}

// Create an enemy cube at position (0, 1, 0)
function CreateEnemyCube() {
    createCube({ x: 3, y: 0, z: -7 }, 'red');

}

function createCube(position, color) {
    var scene = document.querySelector('a-scene');
    var cube = document.createElement('a-box');
    cube.setAttribute('position', position);
    cube.setAttribute('color', color);
    scene.appendChild(cube);
}

function setup() {
    var scene = document.querySelector('a-scene');
    var camera = document.createElement('a-camera');
    camera.setAttribute('log-rotation', ''); // Attach the log-rotation component
    camera.setAttribute('position', { x: 0, y: 1, z: 0 });
    scene.appendChild(camera);

}

AFRAME.registerComponent('log-rotation', {
    tick: function () {
        //var camera = this.el;
        //var rotation = camera.getAttribute('rotation');
        //console.log('Camera rotation:', rotation);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    setup();
    CreatePlayerCube();
    CreateEnemyCube();
});



