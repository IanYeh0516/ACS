// ./Script/Model.js
export class Model {
    constructor() {
        if (new.target === Model) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    createModel(position = new Vector3()) {
        throw new Error("You have to implement the method createModel!");
    }
    animate() {
        throw new Error("You have to implement the method animate!");
    }
}
// Vectory 3 ，簡化操作。
export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class CubeModel extends Model {
    constructor() {
        super();
    }

    createModel(position = new Vector3()) {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, position.y, position.z);
        return this.mesh;
    }
    animate(){}

}