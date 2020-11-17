<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import * as THREE from 'three'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'ShellCity',
  data() {
    return {
      scene: null,
      camera: null,
      camSpawn: new THREE.Vector3(500, 50, 0),
      camPos: null,
      camRot: null,
      camTarget: null,
      render: null,
      controls: null,
      mouseX: null,
      mouseY: null
    }
  },
  async mounted() {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('resize', this.onResize)
    await this.initThree()
    this.animate()
  },
  methods: {
    async initThree() {
      return new Promise(resolve => {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.rotation.order = 'XYZ'
        this.camera.position.copy(this.camSpawn)
        this.camPos = this.camSpawn.clone()
        this.camera.rotation.set(Math.PI * 1, Math.PI * 1.6, Math.PI * 1)
        this.camRot = this.camera.rotation.clone()
        this.scene.add(new THREE.AmbientLight(0x404040))
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.35)
        directionalLight.position.set(0, 2, 1)
        this.scene.add(directionalLight)
        this.scene.add(this.camera)
        this.loadScene()
        // this.addStars()
        this.initRenderer()
        resolve()
      })
    },
    renderCube() {
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0xdddddd, wireframe: false })
      const cube = new THREE.Mesh(geometry, material)
      return cube
    },
    addStars() {
      const loader = new GLTFLoader()
      const scene = this.scene
      loader.load(
        '/models/stars.glb',
        function(gltf) {
          const model = gltf.scene
          model.position.set(0, 0, 0)
          this.scene.add(model)
        },
        undefined,
        function(error) {
          console.error(error)
        }
      )
    },
    loadScene() {
      const loader = new GLTFLoader()
      const scene = this.scene
      loader.load(
        '/models/London2.glb',
        function(gltf) {
          const model = gltf.scene
          model.traverse(o => {
            if (o.isMesh) {
              const line = new MeshLine()
              const material = new MeshLineMaterial({ color: Math.round(Math.random()) ? 0xafcbe7 : 0xcfcde0 })
              line.setPoints(o.geometry.attributes.position.array, p => 0.75)
              const mesh = new THREE.Mesh(line, material)
              scene.add(mesh)
            }
          })
        },
        undefined,
        function(error) {
          console.error(error)
        }
      )
    },
    loadScene2() {
      const loader = new GLTFLoader()
      const scene = this.scene
      loader.load(
        '/models/London2.glb',
        function(gltf) {
          const model = gltf.scene
          const newMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, wireframe: false })
          model.traverse(o => {
            if (o.isMesh) o.material = newMaterial
          })
          model.position.set(0, 0, 0)
          scene.add(model)
        },
        undefined,
        function(error) {
          console.error(error)
        }
      )
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs.canvas
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(this.renderer.domElement)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.updateCamera()
      if (this.controls) this.controls.update()
      this.renderer.render(this.scene, this.camera)
    },
    updateCamera() {
      const targetX = this.mouseX * 0.1
      const targetY = this.mouseY * 0.1
      const targetPos = new THREE.Vector3(
        targetY * 2 - this.camera.position.x - 800,
        targetX - this.camera.position.y + 150,
        targetX - this.camera.position.z - 200
      )
      const targetRot = new THREE.Euler(Math.PI * 1, targetX - Math.PI * 1.5, Math.PI * 1, 'YXZ')
      this.camPos.lerp(targetPos, 0.00075)
      this.camera.position.copy(this.camPos)
    },
    getCamDistance() {
      const h = 0.5 * this.meshes.books[0].children[0].geometry.parameters.height
      const a = THREE.Math.degToRad(this.camera.fov) / 2
      const d = h / Math.tan(a)
      return d
    },
    onMouseMove(e) {
      this.mouseX = e.clientX - window.innerWidth / 2
      this.mouseY = e.clientY - window.innerHeight / 2
    },
    onResize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style lang="scss">
.bookdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
</style>
