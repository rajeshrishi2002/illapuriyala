const STORAGE_KEY = 'ocrTranslations';

export function setupStorage() {
  // Load saved translations on page load
  const savedData = loadFromStorage();
  if (savedData) {
    document.getElementById('extractedText').textContent = savedData.scannedText || '';
    document.getElementById('translatedText').textContent = savedData.thanglishText || '';
  }

  // Clear storage when clear button is clicked
  document.getElementById('clearBtn').addEventListener('click', clearStorage);
}

export function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}