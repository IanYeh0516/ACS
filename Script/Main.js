import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { SceneManager } from './Scene.js';
import { CubeModel } from './Model.js';
import { Vector3 } from './model.js';

// 初始化場景管理器
const sceneManager = new SceneManager();

// 創建一個 CubeModel 的實例
const cubeModel = new CubeModel();
const cube1 = cubeModel.createModel(new Vector3(0,0,0));
const cube2 = cubeModel.createModel(new Vector3(1,1,1));
sceneManager.addModel(cube1);
sceneManager.addModel(cube2);
// 每幀渲染
function Update() {
    requestAnimationFrame(Update);
    sceneManager.render();
}

// 開始動畫
Update();