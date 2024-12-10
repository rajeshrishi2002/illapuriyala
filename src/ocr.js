import Tesseract from 'tesseract.js';
import { translateToThanglish } from './translator.js';
import { saveToStorage } from './storage.js';
import { preprocessImage } from './image-utils.js';

export function setupOCR() {
  const imageInput = document.getElementById('imageInput');
  const preview = document.getElementById('preview');
  const extractedText = document.getElementById('extractedText');
  const translatedText = document.getElementById('translatedText');
  const clearBtn = document.getElementById('clearBtn');

  imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show image preview
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('hidden');

    // Show loading state
    extractedText.textContent = 'Scanning text...';
    translatedText.textContent = 'Please wait...';

    try {
      // Preprocess image for better OCR
      const processedImage = await preprocessImage(file);

      // Perform OCR with optimized settings
      const result = await Tesseract.recognize(processedImage, 'eng', {
        workerPath: 'https://unpkg.com/tesseract.js@v5.0.4/dist/worker.min.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
        corePath: 'https://unpkg.com/tesseract.js-core@v5.0.0/tesseract-core.wasm.js',
        logger: () => {}, // Disable logging for better performance
        errorHandler: () => {}, // Disable error logging
        cacheMethod: 'memory',
        cachePath: '.',
        parameters: {
          tessedit_pageseg_mode: '1', // Automatic page segmentation with OSD
          tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!? ', // Limit character set
          tessjs_create_pdf: '0', // Disable PDF output
          tessjs_create_hocr: '0', // Disable HOCR output
          textord_heavy_nr: '1', // Enable heavy noise removal
          textord_min_linesize: '3.5' // Minimum text size to detect
        }
      });

      const scannedText = result.data.text.trim();
      extractedText.textContent = scannedText;

      // Translate to Thanglish
      const thanglishText = await translateToThanglish(scannedText);
      translatedText.textContent = thanglishText;

      // Save to local storage
      saveToStorage({
        scannedText,
        thanglishText,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error:', error);
      extractedText.textContent = 'Error scanning text. Please try again.';
      translatedText.textContent = 'Translation failed.';
    }
  });

  clearBtn.addEventListener('click', () => {
    preview.src = '';
    preview.classList.add('hidden');
    extractedText.textContent = '';
    translatedText.textContent = '';
    imageInput.value = '';
  });
}