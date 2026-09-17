window.CameraPath = class CameraPath {
  constructor(waypoints) {
    const toVec = (a) => new THREE.Vector3(a[0], a[1], a[2]);
    this.posCurve = new THREE.CatmullRomCurve3(
      waypoints.map((w) => toVec(w.pos)),
      false,
      'centripetal',
      0.5
    );
    this.lookCurve = new THREE.CatmullRomCurve3(
      waypoints.map((w) => toVec(w.look)),
      false,
      'centripetal',
      0.5
    );
    this._p = new THREE.Vector3();
    this._l = new THREE.Vector3();
  }

  position(t) {
    return this.posCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), this._p);
  }

  look(t) {
    return this.lookCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), this._l);
  }

  sample(t, outPos, outLook) {
    this.posCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), outPos);
    this.lookCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), outLook);
  }
};
