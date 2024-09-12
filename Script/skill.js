// skill.js

export class Skill {
    constructor(config) {
      this.name = config.name;
      this.animationName = config.animationName;
      this.duration = config.duration;
      this.effects = config.effects.map(createEffect);
    }
  
    execute(target, player) {
      console.log(`Executing skill: ${this.name}`);
      // 播放動畫的邏輯保持不變
      this.effects.forEach(effect => effect(target, player));
    }
  }
  
  function createEffect(effectConfig) {
    switch (effectConfig.type) {
      case 'damage':
        return (target) => {
          console.log(`Dealing ${effectConfig.value} damage to target`);
          target.health -= effectConfig.value;
        };
      case 'heal':
        return (target, player) => {
          console.log(`Healing player for ${effectConfig.value}`);
          player.health += effectConfig.value;
        };
      case 'slow':
        return (target) => {
          console.log(`Slowing target by ${effectConfig.value * 100}%`);
          target.speed *= effectConfig.value;
        };
      case 'buff':
        return (target, player) => {
          console.log(`Buffing player's ${effectConfig.stat} by ${effectConfig.value * 100}%`);
          player[effectConfig.stat] *= effectConfig.value;
        };
      default:
        console.warn(`Unknown effect type: ${effectConfig.type}`);
        return () => {};
    }
  }