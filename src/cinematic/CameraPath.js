import * as THREE from 'three'

/**
 * CameraPath
 * ----------
 * A single virtual camera dolly. Position and look-at are each interpolated
 * along their own CatmullRom curve through the configured waypoints, so the
 * camera body glides while its gaze swings ahead into the next doorway —
 * producing natural, real-estate-flythrough turns with no cuts.
 *
 * Pure maths: given a progress t (0–1) it returns where the camera is and what
 * it is looking at. Inertia + handheld are applied by the consumer (HouseScene).
 */
export default class CameraPath {
  constructor(waypoints) {
    const toVec = (a) => new THREE.Vector3(a[0], a[1], a[2])
    this.posCurve = new THREE.CatmullRomCurve3(
      waypoints.map((w) => toVec(w.pos)),
      false,
      'centripetal',
      0.5,
    )
    this.lookCurve = new THREE.CatmullRomCurve3(
      waypoints.map((w) => toVec(w.look)),
      false,
      'centripetal',
      0.5,
    )
    this._p = new THREE.Vector3()
    this._l = new THREE.Vector3()
  }

  position(t) {
    return this.posCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), this._p)
  }

  look(t) {
    return this.lookCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), this._l)
  }

  /** Sample into provided vectors (avoids allocations in the render loop). */
  sample(t, outPos, outLook) {
    this.posCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), outPos)
    this.lookCurve.getPoint(THREE.MathUtils.clamp(t, 0, 1), outLook)
  }
}
