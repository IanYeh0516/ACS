// gui.js

import { playAnimation, ANIMATIONS } from './animation.js';
import { loadLocalJson } from './jsonHandler.js';
import { Animationlog } from '../asset/detectGLBAnimations.js';

export const BUTTON_SKILL_MAPPING = [
  { buttonId: 'button1', skillName: ANIMATIONS.SKILL01 },
  { buttonId: 'button2', skillName: ANIMATIONS.SKILL02 },
  { buttonId: 'button3', skillName: ANIMATIONS.SKILL03 },
  { buttonId: 'button4', skillName: ANIMATIONS.SKILL04 }
];

document.addEventListener('DOMContentLoaded', function () {
  // 配置設置，包括玩家選擇器
  const CONFIG = {
    playerSelector: '#Player'
  };

  // 獲取玩家模型的 DOM 節點
  const player = document.querySelector(CONFIG.playerSelector);
  let animationMap = {}; // 存儲動畫映射的對象
  let isPlayingAnimation = false; // 用於追蹤是否有動畫正在播放

  // 加載動畫持續時間的 JSON 配置
  loadLocalJson('script/player.json').then(data => {
    if (data) {
      animationMap = data.skills;
      setupButtonListeners();
      initializeIdleAnimation();
    } else {
      console.error('無法加載動畫持續時間的 JSON 文件');
    }
  });

  // 切換按鈕的狀態（啟用/禁用）
  function toggleButtonsState(disabled) {
    BUTTON_SKILL_MAPPING.forEach(({ buttonId }) => {
      const button = document.querySelector(`#${buttonId}`);
      if (button) button.disabled = disabled;
    });
  }

  // 當動畫結束時處理，切換回 idle 動畫
  function handleAnimationEnd(idleAnimName) {
    const idleAnim = animationMap[idleAnimName];
    if (idleAnim) {
      playAnimation(player, idleAnimName, idleAnim.duration);
      console.log('切換至待機動畫');
    } else {
      console.warn('找不到待機動畫');
    }
    isPlayingAnimation = false;
    toggleButtonsState(false);
  }

  // 播放動畫並設置定時器來切換回 idle 動畫
  function playAnimationWithTimeout(animInfo,trackName) {
    isPlayingAnimation = true;
    toggleButtonsState(true);
    playAnimation(player, trackName, animInfo.duration);
    console.log(`播放動畫: ${animInfo.name}+ ${animInfo.duration} s`);
    setTimeout(() => handleAnimationEnd('idle'), animInfo.duration * 1000);
  }

  // 設置按鈕事件監聽器
  function setupButtonListeners() {
    BUTTON_SKILL_MAPPING.forEach(({ buttonId, skillName }) => {
      const button = document.querySelector(`#${buttonId}`);
      if (button) {
        button.addEventListener('click', () => {
          if (isPlayingAnimation) return;
          const animInfo = animationMap[skillName];

          console.log(buttonId +" " + skillName +animInfo);
          if (animInfo) {
            playAnimationWithTimeout(animInfo,skillName);
          } else {
            console.warn(`動畫 ${skillName} 在動畫映射中找不到`);
          }
        });
      } else {
        console.warn(`找不到 ID 為 '${buttonId}' 的按鈕`);
      }
    });
  }

  // 初始化 idle 動畫
  function initializeIdleAnimation() {
    const idleAnim = animationMap['idle'];
    if (idleAnim) {
      playAnimation(player, 'idle', idleAnim.duration);
      console.log('初始化待機動畫');
    } else {
      console.warn('找不到待機動畫');
    }
  }
});
