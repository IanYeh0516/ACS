// gui.js

import { loadModel, createAnimationMap, playAnimation, ANIMATIONS } from './animation.js';

document.addEventListener('DOMContentLoaded', function () {
  const CONFIG = {
    buttonAnimations: [
      { id: 'button1', animation: ANIMATIONS.SKILL01 },
      { id: 'button2', animation: ANIMATIONS.SKILL02 },
      { id: 'button3', animation: ANIMATIONS.SKILL03 },
      { id: 'button4', animation: ANIMATIONS.SKILL04 },
    ],
    playerSelector: '#Player',
    modelPath: './asset/Acs_testCube.glb'
  };

  const player = document.querySelector(CONFIG.playerSelector);
  let animationMap = {};
  let isPlayingAnimation = false;

  function toggleButtonsState(disabled) {
    CONFIG.buttonAnimations.forEach(({ id }) => {
      const button = document.querySelector(`#${id}`);
      if (button) button.disabled = disabled;
    });
  }

  function handleAnimationEnd(idleAnimName) {
    const idleAnim = animationMap[idleAnimName];
    if (idleAnim) {
      playAnimation(player, idleAnim.name, idleAnim.duration);
      console.log('Switching to idle animation');
    } else {
      console.warn('Idle animation not found');
    }
    isPlayingAnimation = false;
    toggleButtonsState(false);
  }

  function playAnimationWithTimeout(animInfo) {
    isPlayingAnimation = true;
    toggleButtonsState(true);
    playAnimation(player, animInfo.name, animInfo.duration);
    console.log(`Playing animation: ${animInfo.name}`);
    
    setTimeout(() => handleAnimationEnd(ANIMATIONS.IDLE), animInfo.duration * 1000);
  }

  function setupButtonListeners() {
    CONFIG.buttonAnimations.forEach(({ id, animation }) => {
      const button = document.querySelector(`#${id}`);
      if (button) {
        button.addEventListener('click', () => {
          if (isPlayingAnimation) return;
          const animInfo = animationMap[animation];
          if (animInfo) {
            playAnimationWithTimeout(animInfo);
          } else {
            console.warn(`Animation ${animation} not found in the animation map`);
          }
        });
      } else {
        console.warn(`Button with id '${id}' not found`);
      }
    });
  }

  function initializeIdleAnimation() {
    const idleAnim = animationMap[ANIMATIONS.IDLE];
    if (idleAnim) {
      playAnimation(player, idleAnim.name, idleAnim.duration);
      console.log('Initializing with idle animation');
    } else {
      console.warn('Idle animation not found');
    }
  }

  // NOTE: 模型加載路徑可能會根據需求變化
  // TODO: 未來可能需要修改此處以支持動態加載不同的模型文件
  // 可能的改進：將模型路徑作為參數傳入，或從配置文件中讀取
  loadModel(CONFIG.modelPath)
    .then(({ model, animations }) => {
      console.log('Model loaded successfully');
      
      animationMap = createAnimationMap(animations);
      console.log('Animation map created:', animationMap);

      Object.values(animationMap).forEach(anim => {
        console.log(`Animation: ${anim.name}, Duration: ${anim.duration.toFixed(2)} seconds`);
      });

      setupButtonListeners();
      initializeIdleAnimation();
    })
    .catch(error => {
      console.error('Failed to load model:', error);
    });
});