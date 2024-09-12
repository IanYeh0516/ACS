// gui.js

import { loadModel, createAnimationMap, playAnimation, ANIMATIONS } from './animation.js';

document.addEventListener('DOMContentLoaded', function () {
  const buttonAnimations = [
    { id: 'button1', animation: ANIMATIONS.SKILL01 },
    { id: 'button2', animation: ANIMATIONS.SKILL02 },
    { id: 'button3', animation: ANIMATIONS.SKILL03 },
    { id: 'button4', animation: ANIMATIONS.SKILL04 },
  ];

  const player = document.querySelector('#Player');

  let animationMap = {};

  loadModel('./asset/Acs_testCube.glb').then(({ model, animations }) => {
    console.log('Model loaded successfully');
    
    // 創建動畫映射
    animationMap = createAnimationMap(animations);
    console.log('Animation map created:', animationMap);

    // 輸出所有可用的動畫名稱和持續時間
    Object.values(animationMap).forEach(anim => {
      console.log(`Animation: ${anim.name}, Duration: ${anim.duration.toFixed(2)} seconds`);
    });

    // 設置按鈕事件監聽器
    buttonAnimations.forEach(({ id, animation }) => {
      const button = document.querySelector(`#${id}`);
      if (button) {
        button.addEventListener('click', () => {
          const animInfo = animationMap[animation];
          if (animInfo) {
            playAnimation(player, animInfo.name, animInfo.duration);
            console.log(`Playing animation: ${animInfo.name}`);
            
            // 設置計時器以在動畫結束後切換回閒置動畫
            setTimeout(() => {
              const idleAnim = animationMap[ANIMATIONS.IDLE];
              if (idleAnim) {
                playAnimation(player, idleAnim.name, idleAnim.duration);
                console.log('Switching to idle animation');
              } else {
                console.warn('Idle animation not found');
              }
            }, animInfo.duration * 1000); // 將持續時間轉換為毫秒
          } else {
            console.warn(`Animation ${animation} not found in the animation map`);
          }
        });
      } else {
        console.warn(`Button with id '${id}' not found`);
      }
    });

    // 初始化為閒置動畫
    const idleAnim = animationMap[ANIMATIONS.IDLE];
    if (idleAnim) {
      playAnimation(player, idleAnim.name, idleAnim.duration);
      console.log('Initializing with idle animation');
    } else {
      console.warn('Idle animation not found');
    }

  }).catch(error => {
    console.error('Failed to load model:', error);
  });
});