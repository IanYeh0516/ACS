export function CreateGLB(id,position, modelPath,scale,rotation) {
    var scene = document.querySelector('a-scene');
    var glbModel = document.createElement('a-entity');
    glbModel.setAttribute('id', id);
    glbModel.setAttribute('position', position);
    glbModel.setAttribute('scale', scale);
    glbModel.setAttribute('gltf-model', modelPath);
    glbModel.setAttribute('rotation', rotation);
    glbModel.setAttribute('animation-mixer', 'clip:Idle');
    scene.appendChild(glbModel);
}
export function SelectObjectAnimation(glbModel,animationTrack) {
    glbModel.setAttribute('animation-mixer', animationTrack);
}