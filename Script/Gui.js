const THREE = AFRAME.THREE;

const ANIMATIONS = {
  SKILL01: 'skill01', // 
  SKILL02: 'skill02', // 
  SKILL03: 'skill03', // 
  SKILL04: 'skill04', // 
  IDLE: 'idle'
  // 可以在這裡添加更多動畫軌道變數
};

document.addEventListener('DOMContentLoaded', function () {
  // 定義動畫軌道名稱的變數
  test('./asset/Acs_testCube.glb');
  // 定義按鈕 ID 和對應動畫名稱的映射
  const buttonAnimations = [
    { id: 'button1', animation: ANIMATIONS.SKILL01 },
    { id: 'button2', animation: ANIMATIONS.SKILL02 },
    { id: 'button3', animation: ANIMATIONS.SKILL03 },
    { id: 'button4', animation: ANIMATIONS.SKILL04 },
    // 如果需要新增按鈕，只需在這裡添加對應項目
  ];
  const player = document.querySelector('#Player');

  // 通用事件處理函數
  function handleButtonClick(animation) {
    PlayAnimationCycle(player, animation);
    // 在這裡可以添加額外的自定義行為
  }

  // 為每個按鈕綁定事件處理程序
  buttonAnimations.forEach(({ id, animation }) => {
    const button = document.querySelector(`#${id}`);
    if (button) {
      button.addEventListener('click', () => handleButtonClick(animation));
    }
  });
  function PlayAnimationCycle(model, animation) {
    const timer = 1000;
    if (model && model.hasAttribute('animation-mixer')) {
      model.setAttribute('animation-mixer', `clip: ${animation}`);
      console.log(`Playing animation: ${animation}`);
      setTimeout(() => {
        model.setAttribute('animation-mixer', `clip:${ANIMATIONS.IDLE}`);
        console.log('Switching to idle animation');
      }, timer);
    } else {
      console.error('Model is not valid or does not have an animation-mixer component');
      model.setAttribute('animation-mixer', `clip:${ANIMATIONS.IDLE}`);
    }
  }
});


function test(src) {
  const loader = new THREE.GLTFLoader();
  loader.load(src, (gltf) => {
    const animationInfo = getAnimationClipLength(gltf);
    // 遍歷陣列並將每個動畫的名稱和長度打印到控制台
    animationInfo.forEach(trackInfo => {
      console.log(`Track Name: ${trackInfo.name}, Length: ${trackInfo.length}`);
    });
  }, undefined, (error) => {
    console.error('Error loading GLB:', error);
  });
}

function getAnimationClipLength(model) {
  console.log('Model:', model);
  console.log('Model.animations:', model ? model.animations : 'model is undefined or null');
  console.log('Model.animation:', model ? model.animation : 'model is undefined or null');

  const mixer = new THREE.AnimationMixer(model.scene);
  
  if(mixer == null) {
    throw new Error('mixer is null.');
  }

  try {
    // 紀錄動畫軌道資訊的陣列
    const trackInfoArray = [];
    // 檢查模型中是否包含動畫
    if (model.animations.length > 0) {
      // 遍歷所有動畫
      model.animations.forEach((clip) => {
        // 取得動畫名稱和長度
        const clipName = clip.name;
        const clipLength = clip.duration;

        // 儲存軌道名稱和長度
        trackInfoArray.push({ name: clipName, length: clipLength });
      });
    } else {
      console.warn('This model does not contain any animations.');
    }

    // 回傳軌道資訊
    return trackInfoArray;

  } catch (error) {
    // 錯誤處理
    console.error('Error in getAnimationClipLength:', error.message);
    return []; // 在錯誤的情況下返回空陣列
  }
}