// button UI
AFRAME.registerComponent('round_button', {
  schema: {
    text: {type: 'string', default: 'Button'},
    width :{type: 'float', default: 1.5},
    radius: {type: 'float', default: 0.25},
    position: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    textColor: {type: 'color', default: '#ffffff'},
    hoverColor: {type: 'color', default: '#18206F'},
    defaultColor: {type: 'color', default: '#08B2E3'},
    activeColor: {type: 'color', default: '#FFAF87'}
  },

  init: function () {
    const data = this.data;
    const el = this.el;

    // 创建最上层的 a-entity 实体
    const parentEntity = document.createElement('a-entity');
    parentEntity.setAttribute('position', `${data.position.x} ${data.position.y} ${data.position.z}`);
    // 原点位置
    const originPos = {x: 0, y: 0, z: 0};  // 相对于 parentEntity 的原点位置
    // 确保高度等于 radius * 2
    const height = data.radius * 2;
    // 计算盒子的位置和宽度（减去圆柱体的空间）
    const boxPosition = {
      x: originPos.x,  // 向右移动一个半径的距离，使盒子和圆柱体对齐
      y: originPos.y,
      z: originPos.z
    };

    // 创建背景盒子
    const background = document.createElement('a-plane');
    background.setAttribute('color', data.defaultColor);
    background.setAttribute('width', data.width);
    background.setAttribute('height', height);
    background.setAttribute('position', `${boxPosition.x} ${boxPosition.y} ${boxPosition.z}`);
    background.setAttribute('class', 'clickable');

    // 创建右侧圆柱体
    const rCirclePosition = {
      x: boxPosition.x +data.width/2,
      y: boxPosition.y,
      z: boxPosition.z
    };

    const circleR = document.createElement('a-circle');
    circleR.setAttribute('color', data.defaultColor);
    circleR.setAttribute('radius', data.radius);
    circleR.setAttribute('height', boxPosition.z);
    circleR.setAttribute('position', `${rCirclePosition.x} ${rCirclePosition.y} ${rCirclePosition.z}`);
    circleR.setAttribute('rotation', '0 0 0'); // 使圆柱体垂直于平面放置
    circleR.setAttribute('class', 'clickable');

    // 创建左侧圆柱体
    const lCirclePosition = {
      x: boxPosition.x-data.width/2,
      y: boxPosition.y,
      z: boxPosition.z
    };

    const circleL = document.createElement('a-circle');
    circleL.setAttribute('color', data.defaultColor);
    circleL.setAttribute('radius', data.radius);
    circleL.setAttribute('height', boxPosition.z);
    circleL.setAttribute('position', `${lCirclePosition.x} ${lCirclePosition.y} ${lCirclePosition.z}`);
    circleL.setAttribute('rotation', '0 0 0'); // 使圆柱体垂直于平面放置
    circleL.setAttribute('class', 'clickable');

    // 创建文本元素
    const text = document.createElement('a-text');
    text.setAttribute('value', data.text);
    text.setAttribute('align', 'center');
    text.setAttribute('position', `${originPos.x } ${originPos.y} ${originPos.z + boxPosition.z / 2 + 0.01}`);
    text.setAttribute('color', data.textColor);

    // 添加事件监听器
    this.registerEventListeners(parentEntity, background, circleR, circleL);

    // 将所有子元素附加到 parentEntity
    parentEntity.appendChild(background);
    parentEntity.appendChild(circleL);
    parentEntity.appendChild(circleR);
    parentEntity.appendChild(text);

    // 将 parentEntity 附加到组件的根实体上
    el.appendChild(parentEntity);
  },

  registerEventListeners: function (el, background, circleR, circleL) {
    const data = this.data;

    el.addEventListener('mouseenter', function () {
      background.setAttribute('color', data.hoverColor);
      circleR.setAttribute('color', data.hoverColor);
      circleL.setAttribute('color', data.hoverColor);
    });

    el.addEventListener('mouseleave', function () {
      background.setAttribute('color', data.defaultColor);
      circleR.setAttribute('color', data.defaultColor);
      circleL.setAttribute('color', data.defaultColor);
    });

    el.addEventListener('mousedown', function () {
      background.setAttribute('color', data.activeColor);
      circleR.setAttribute('color', data.activeColor);
      circleL.setAttribute('color', data.activeColor);
    });

    el.addEventListener('mouseup', function () {
      background.setAttribute('color', data.hoverColor);
      circleR.setAttribute('color', data.hoverColor);
      circleL.setAttribute('color', data.hoverColor);
    });

    el.addEventListener('click', function () {
    });
  }
});

// HP_barUI

AFRAME.registerComponent('hp-displayer', {
    schema: {
      position: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
      maxHp: {type: 'int', default: 100},
      curHp: {type: 'int', default: 100},
      width: {type: 'float', default: 1},  // 背景的宽度
      height: {type: 'float', default: 0.2}, // 背景的高度
      bgColor: {type: 'color', default: '#333'},  // 背景颜色
      hpBgColor: {type: 'color', default: '#555'}, // HP 背景颜色
      hpColor: {type: 'color', default: '#f00'}  // HP 条颜色
    },
  
    init: function () {
      const data = this.data;
      const el = this.el;
  
      // 创建最上层的 a-entity 实体
      const parentEntity = document.createElement('a-entity');
      parentEntity.setAttribute('position', `${data.position.x} ${data.position.y} ${data.position.z}`);
  
      // 计算HP条的比例
      const hpRatio = data.curHp / data.maxHp;
  
      // 创建背景
      const bgPlane = document.createElement('a-plane');
      bgPlane.setAttribute('width', data.width);
      bgPlane.setAttribute('height', data.height);
      bgPlane.setAttribute('color', data.bgColor);
      bgPlane.setAttribute('position', `0 0 0`);
  
      // 创建HP背景
      const hpBgPlane = document.createElement('a-plane');
      hpBgPlane.setAttribute('width', data.width);
      hpBgPlane.setAttribute('height', data.height);
      hpBgPlane.setAttribute('color', data.hpBgColor);
      hpBgPlane.setAttribute('position', `0 0 0.01`);
  
      // 创建HP显示条
      const hpPlane = document.createElement('a-plane');
      hpPlane.setAttribute('width', data.width * hpRatio);
      hpPlane.setAttribute('height', data.height);
      hpPlane.setAttribute('color', data.hpColor);
      hpPlane.setAttribute('emissive', data.hpColor);
      hpPlane.setAttribute('position', `${-data.width / 2 + data.width * hpRatio / 2} 0 0.02`);
  
      // 将元素按顺序附加到 parentEntity
      parentEntity.appendChild(bgPlane);
      parentEntity.appendChild(hpBgPlane);
      parentEntity.appendChild(hpPlane);
  
      // 将 parentEntity 附加到 el
      el.appendChild(parentEntity);
    },
  
    update: function () {
      const data = this.data;
      const hpRatio = data.curHp / data.maxHp;
      const hpPlane = this.el.querySelector('a-plane:nth-child(3)');
      if (hpPlane) {
        if(hpRatio<1){
            hpPlane.setAttribute('width', data.width * hpRatio);
            hpPlane.setAttribute('position', `${-data.width / 2 + data.width * hpRatio} 0 0.02`);
        } else if(hpRatio>1){
            hpPlane.setAttribute('width', data.width * 1);
            hpPlane.setAttribute('position', `${-data.width + data.width * 1} 0 0.02`);
        } 
      }
    }
  });