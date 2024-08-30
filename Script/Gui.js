import { loadModel, PlayAnimationCycle, getAnimationClipLength, ANIMATIONS } from './animation.js';


document.addEventListener('DOMContentLoaded', function () {
  const buttonAnimations = [
    { id: 'button1', animation: ANIMATIONS.SKILL01 },
    { id: 'button2', animation: ANIMATIONS.SKILL02 },
    { id: 'button3', animation: ANIMATIONS.SKILL03 },
    { id: 'button4', animation: ANIMATIONS.SKILL04 },
    // 如果需要新增按鈕，只需在這裡添加對應項目
  ];
  const player = document.querySelector('#Player');

  // load character needfix 
  loadModel('./asset/Acs_testCube.glb').then(({ animations }) => {
    const animationInfo = getAnimationClipLength(animations);
    animationInfo.forEach(trackInfo => {
      console.log(`Track Name: ${trackInfo.name}, Length: ${trackInfo.length}`);
    });

    buttonAnimations.forEach(({ id, animation }) => {
      const button = document.querySelector(`#${id}`);
      if (button) {
        button.addEventListener('click', () => PlayAnimationCycle(animation));
      }
    });
  }).catch(error => {
    console.error('Failed to load model:', error);
  });
});