AFRAME.registerComponent('clickable', {
    init: function () {
      this.el.addEventListener('click', function () {
        console.log('Text clicked!');
        alert('Text clicked!');
      });
    }
  });
export function createGUI(){

   CreateAtext("questOne", '1', { x: -1, y: 0.2, z: -2 });
  CreateAtext('questTwo', '2', { x: 1, y: 0.2, z: -2 });
  CreateAtext('questThree', '3', { x: -1, y: -0.2, z: -2 });
CreateAtext('questFour', '4', { x: 1, y: -0.2, z: -2 });
}

function CreateAtext(id, value, position) {
    var scene = document.querySelector('a-scene');
    var Atext = document.createElement('a-entity');
    Atext.setAttribute("id", id);
    Atext.setAttribute('text', 'width: 2; color: black; value: '+value+';align: center');
    Atext.setAttribute('position', '1 0.2 -2');
    Atext.setAttribute('position', position);
    Atext.setAttribute('class', 'clickable');
    scene.appendChild(Atext); // 將 Atext 元素添加到場景中
}

function createInfoButton(id, onClick) {
    // 创建包装器和按钮元素
    var wrapper = document.createElement('div');
    var button = document.createElement('button');
    
    // 设置按钮 ID 和文本
    button.id = id;
    button.textContent = id; // 使用 ID 作为按钮文本
    
    // 为按钮绑定点击事件
    button.addEventListener('click', onClick);
    
    // 将按钮添加到包装器中
    wrapper.appendChild(button);
    
    // 假设页面上有一个容器元素，id 为 'container'
    var container = document.getElementById('container');
    if (container) {
        // 将包装器添加到容器中
        container.appendChild(wrapper);
    } else {
        console.warn('Container element not found.');
    }
}