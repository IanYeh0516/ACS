// 定義所有的動畫名稱
export const ANIMATIONS = {
  SKILL01: 'skill01',
  SKILL02: 'skill02',
  SKILL03: 'skill03',
  SKILL04: 'skill04',
  IDLE: 'idle'
  // 可以在這裡添加更多動畫軌道變數
};

// 播放指定的動畫
export function playAnimation(model, animationName, duration) {
  if (!model || !animationName) {
    console.warn('無效的模型或動畫名稱');
    return;
  }
  model.setAttribute('animation-mixer', `clip: ${animationName}; duration: ${duration}`);
}

// 管理動畫狀態（防止多重播放）
let isPlaying = false;

// 檢查是否有動畫正在播放
export function isPlayingAnimation() {
  return isPlaying;
}

// 播放動畫並設置定時器來切換回 idle 動畫
export function playAnimationWithTimeout(model, animInfo, skillName, animationMap) {
  if (!animInfo || !skillName) {
    console.warn('無效的動畫信息或技能名稱');
    return;
  }

  isPlaying = true;
  playAnimation(model, skillName, animInfo.duration);
  console.log(`播放動畫: ${animInfo.name} (${animInfo.duration} s)`);

  setTimeout(() => handleAnimationEnd(model, animationMap, ANIMATIONS.IDLE), animInfo.duration * 1000);
}

// 動畫結束後處理
export function handleAnimationEnd(model, animationMap, idleAnimName) {
  const idleAnim = animationMap[idleAnimName];
  if (idleAnim) {
    playAnimation(model, idleAnimName, idleAnim.duration);
    console.log('切換至待機動畫');
  } else {
    console.warn('找不到待機動畫');
  }
  isPlaying = false;
}

// 初始化 idle 動畫
export function initializeIdleAnimation(model, animationMap) {
  const idleAnim = animationMap[ANIMATIONS.IDLE];
  if (idleAnim) {
    playAnimation(model, ANIMATIONS.IDLE, idleAnim.duration);
    console.log('初始化待機動畫');
  } else {
    console.warn('找不到待機動畫');
  }
}
