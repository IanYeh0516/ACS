

export const ANIMATIONS = {
  SKILL01: 'skill01',
  SKILL02: 'skill02',
  SKILL03: 'skill03',
  SKILL04: 'skill04',
  IDLE: 'idle'
  // 可以在這裡添加更多動畫軌道變數
};
//
export function playAnimation(model, animationName, duration) {
  model.setAttribute('animation-mixer', `clip: ${animationName}; duration: ${duration}`);
}