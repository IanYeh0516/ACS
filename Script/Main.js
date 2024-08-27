import { CreateGLB } from './model.js';
import { SelectObjectAnimation } from './model.js';

function CreatePlayerGLB() {
    // 我方
    CreateGLB('Player', { x: -1.5, y: 0, z: -3.5 }, './asset/a.glb', { x: 0.01, y: 0.01, z: 0.01 }, { x: 0, y: 180, z: 0 });
}
function CreateEnemyGLB() {
    //敵方
    CreateGLB('Enemy', { x: 3, y: 0, z: -7 }, './asset/a.glb', { x: 0.01, y: 0.01, z: 0.01 }, { x: 0, y: -45, z: 0 });
}
//初始化
function setup() {
    var scene = document.querySelector('a-scene');
    scene.setAttribute('renderer', 'antialias: true; colorManagement: true; sortObjects: true; physicallyCorrectLights: true');
    var camera = document.createElement('a-camera');
    camera.setAttribute('look-controls', 'enabled: false');
    camera.setAttribute('log-rotation', '');
    camera.setAttribute('position', { x: 0, y: 1, z: 0 });

  
    // Create the raycaster entity and add it to the camera
    scene.appendChild(camera);
}
document.addEventListener('DOMContentLoaded', function () {
    setup();
    CreatePlayerGLB();
    CreateEnemyGLB();
    createGUI();
    document.querySelector('a-scene').enterVR({passthrough: true});
});