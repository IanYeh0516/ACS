// gui.js

import { loadModel, createAnimationMap, playAnimation } from './animation.js';
import { Skill } from './skill.js';

let CONFIG;

async function loadConfig() {
  try {
    const response = await fetch('Script/player.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();
    CONFIG = {
      ...config,
      skills: config.skills.map(skillConfig => new Skill(skillConfig))
    };
    console.log('Configuration loaded successfully:', CONFIG);
  } catch (error) {
    console.error('Failed to load configuration:', error);
    // 可以在這裡添加一些錯誤處理邏輯，比如使用默認配置
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadConfig();
  if (!CONFIG) {
    console.error('Failed to load configuration. Cannot proceed.');
    return;
  }

  const player = document.querySelector(CONFIG.playerSelector);
  let animationMap = {};
  let isExecutingSkill = false;

  function toggleButtonsState(disabled) {
    CONFIG.skills.forEach((skill, index) => {
      const button = document.querySelector(`#${CONFIG.buttonPrefix}${index + 1}`);
      if (button) button.disabled = disabled;
    });
  }

  function handleSkillEnd() {
    const idleAnim = animationMap[CONFIG.idleAnimation];
    if (idleAnim) {
      playAnimation(player, idleAnim.name, idleAnim.duration);
      console.log('Switching to idle animation');
    } else {
      console.warn('Idle animation not found');
    }
    isExecutingSkill = false;
    toggleButtonsState(false);
  }

  function executeSkillWithTimeout(skill, target) {
    isExecutingSkill = true;
    toggleButtonsState(true);
    skill.execute(target, player);
    
    setTimeout(() => handleSkillEnd(), skill.duration * 1000);
  }

  function setupButtonListeners() {
    CONFIG.skills.forEach((skill, index) => {
      const button = document.querySelector(`#${CONFIG.buttonPrefix}${index + 1}`);
      if (button) {
        button.addEventListener('click', () => {
          if (isExecutingSkill) return;
          const target = { health: 100, speed: 1 }; // 示例目標
          executeSkillWithTimeout(skill, target);
        });
      } else {
        console.warn(`Button for skill ${skill.name} not found`);
      }
    });
  }

  function initializeIdleAnimation() {
    const idleAnim = animationMap[CONFIG.idleAnimation];
    if (idleAnim) {
      playAnimation(player, idleAnim.name, idleAnim.duration);
      console.log('Initializing with idle animation');
    } else {
      console.warn('Idle animation not found');
    }
  }

  try {
    const { model, animations } = await loadModel(CONFIG.modelPath);
    console.log('Model loaded successfully');
    
    animationMap = createAnimationMap(animations);
    console.log('Animation map created:', animationMap);

    Object.values(animationMap).forEach(anim => {
      console.log(`Animation: ${anim.name}, Duration: ${anim.duration.toFixed(2)} seconds`);
    });

    setupButtonListeners();
    initializeIdleAnimation();
  } catch (error) {
    console.error('Failed to load model:', error);
  }
});