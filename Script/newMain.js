AFRAME.registerComponent('click', {  // 修正拼写错误
    update: function () {
      var el = this.el;
      el.addEventListener('mouseleave', function () {
        console.log('bbbbb');
      });
      el.addEventListener('mouseenter', function () {
        console.log('ccccc');
      });

      el.addEventListener('mousedown', function () {
        console.log('ssss');
      });

    }
  });
