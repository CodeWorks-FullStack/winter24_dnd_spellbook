import { AuthController } from './controllers/AuthController.js';
import { DndController } from './controllers/DndController.js';
import { SandboxController } from './controllers/SandboxController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  DndController = new DndController()
  SandboxController = new SandboxController()

  AuthController = new AuthController()

  constructor() {
    if (USE_ROUTER) {
      this.router = router
      this.router.init(this)
    }
  }
}


const app = new App()
// @ts-ignore
window.app = app
