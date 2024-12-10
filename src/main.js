import { initThreeScene } from './three-background.js';
import { setupOCR } from './ocr.js';
import { setupStorage } from './storage.js';

// Initialize Three.js background
initThreeScene();

// Initialize OCR and storage functionality
setupOCR();
setupStorage();