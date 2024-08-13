document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#button1').addEventListener('click', function () {
    const player = document.querySelector('#Player');
    PlayAnimationCycle(player,'Fear');
  });

  document.querySelector('#button2').addEventListener('click', function () {
    const player = document.querySelector('#Player');
    PlayAnimationCycle(player,'Roll');
    // 自定义行为...
  });

  document.querySelector('#button3').addEventListener('click', function () {
    const player = document.querySelector('#Player');
    PlayAnimationCycle(player,'Spin');
    // 自定义行为...
  });

  document.querySelector('#button4').addEventListener('click', function () {
    const player = document.querySelector('#Player');
    PlayAnimationCycle(player,'Munch');
    // 自定义行为...
  });
});


function PlayAnimationCycle(model, animation) {
  const timer = 1000;
  // 确保模型存在并且具有 animation-mixer 组件
  if (model && model.hasAttribute('animation-mixer')) {
    // 播放指定的动画片段
    model.setAttribute('animation-mixer', `clip: ${animation}`);
    console.log(`Playing animation: ${animation}`);
    
    // 设定 2000ms 的延迟，然后播放 idle 动画
    setTimeout(() => {
      model.setAttribute('animation-mixer', 'clip: Idle');
      console.log('Switching to idle animation');
    }, timer);
  } else {
    console.error('Model is not valid or does not have an animation-mixer component');
  }
}