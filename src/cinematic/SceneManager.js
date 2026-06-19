/**
 * SceneManager
 * ------------
 * The registry of cinematic scenes. It is the single source of truth for which
 * scenes exist and how to reach each scene's DOM nodes. Controllers ask the
 * SceneManager for refs rather than querying the DOM themselves.
 *
 * It holds NO animation logic — purely structure + lookup.
 */
export default class SceneManager {
  /**
   * @param {Array} sceneData  CINEMATIC_SCENES from content.js
   * @param {HTMLElement} stage  the pinned stage element containing scene nodes
   */
  constructor(sceneData, stage) {
    this.data = sceneData
    this.stage = stage
    this.scenes = sceneData.map((data, index) => this._resolve(data, index))
  }

  get count() {
    return this.scenes.length
  }

  /** Collect every animatable node for one scene from the DOM. */
  _resolve(data, index) {
    const root = this.stage.querySelector(`[data-scene="${data.id}"]`)
    return {
      index,
      data,
      root,
      media: root?.querySelector('[data-media]') || null,
      content: root?.querySelector('[data-content]') || null,
      title: root?.querySelector('[data-title]') || null,
      reveals: root ? Array.from(root.querySelectorAll('[data-reveal]')) : [],
      ray: root?.querySelector('[data-ray]') || null,
      clouds: root?.querySelector('[data-clouds]') || null,
      // Connector nodes (door swinging open into this room + corner column).
      door: root?.querySelector('[data-door]') || null,
      doorLeaves: root ? Array.from(root.querySelectorAll('[data-door-leaf]')) : [],
      doorLight: root?.querySelector('[data-door-light]') || null,
      fg: root?.querySelector('[data-fg]') || null,
    }
  }

  at(index) {
    return this.scenes[index]
  }

  forEach(fn) {
    this.scenes.forEach(fn)
  }
}
