// 用來偵測glb的軌道秒數多常

const THREE = AFRAME.THREE;
// 加載 GLB 模型並返回模型和動畫資訊
export function loadModel(src) {
    const loader = new THREE.GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(src, (gltf) => {
        const model = gltf.scene;
        resolve({ model, animations: gltf.animations });
      }, undefined, (error) => {
        console.error('加載 GLB 文件時出錯:', error);
        reject(error);
      });
    });
  }
  
  // 創建動畫映射，包含動畫的名稱和持續時間
  export function createAnimationMap(animations) {
    const animationMap = {};
    animations.forEach(animation => {
      animationMap[animation.name] = {
        name: animation.name,
        duration: animation.duration
      };
    });
    return animationMap;
  }
  
  // 用於加載 GLB 模型並打印動畫資訊
  export function Animationlog(modelPath){
      loadModel(modelPath)
      .then(({ model, animations }) => {
        console.log('模型加載成功');
        
        animationMap = createAnimationMap(animations);
        console.log('動畫映射已創建:', animationMap);
  
        Object.values(animationMap).forEach(anim => {
          console.log(`動畫: ${anim.name}, 持續時間: ${anim.duration.toFixed(2)} 秒`);
        });
      })
      .catch(error => {
        console.error('模型加載失敗:', error);
      });
  }
  