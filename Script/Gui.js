import { CONFIG } from './config.js';
import { setupButtonListeners, toggleButtonsState } from './buttonManager.js';
import { playAnimationWithTimeout, initializeIdleAnimation, isPlayingAnimation } from './animationManager.js';
import { loadLocalJson } from './jsonHandler.js';

document.addEventListener('DOMContentLoaded', function () {
  const player = document.querySelector(CONFIG.playerSelector);
  let animationMap = {};

  // 加載動畫持續時間的 JSON 配置
  loadLocalJson(CONFIG.jsonPath).then(data => {
    if (data) {
      animationMap = data.skills;
      setupButtonListeners(animationMap, isPlayingAnimation, (animInfo, skillName) =>
        playAnimationWithTimeout(player, animInfo, skillName, animationMap)
      );
      initializeIdleAnimation(player, animationMap);
    } else {
      console.error('無法加載動畫持續時間的 JSON 文件');
    }
  });
});
