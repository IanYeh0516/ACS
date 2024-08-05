AFRAME.registerComponent('clickable', {
    init: function () {
      this.el.addEventListener('click', function () {
        console.log('Text clicked!');
        alert('Text clicked!');
      });
    }
  });

export function CreateGUI(){
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
