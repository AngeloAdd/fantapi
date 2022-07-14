import Kernel from './Kernel.js';
import app from './application/index.js';

const webServer = new Kernel(app);

export default webServer;
