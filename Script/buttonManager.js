import { BUTTON_SKILL_MAPPING } from './config.js';

export function toggleButtonsState(disabled) {
  BUTTON_SKILL_MAPPING.forEach(({ buttonId }) => {
    const button = document.querySelector(`#${buttonId}`);
    if (button) button.disabled = disabled;
  });
}

export function setupButtonListeners(animationMap, isPlayingAnimation, playAnimationWithTimeout) {
  BUTTON_SKILL_MAPPING.forEach(({ buttonId, skillName }) => {
    const button = document.querySelector(`#${buttonId}`);
    if (button) {
      button.addEventListener('click', () => {
        if (isPlayingAnimation()) return;

        const animInfo = animationMap[skillName];
        if (animInfo) {
          playAnimationWithTimeout(animInfo, skillName);
        } else {
          console.warn(`動畫 ${skillName} 在動畫映射中找不到`);
        }
      });
    } else {
      console.warn(`找不到 ID 為 '${buttonId}' 的按鈕`);
    }
  });
}
