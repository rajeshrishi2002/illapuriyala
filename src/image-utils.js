export async function preprocessImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply image processing
      for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        // Increase contrast
        const contrast = 1.2;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        const color = factor * (avg - 128) + 128;
        
        // Apply threshold for better text recognition
        const threshold = 128;
        const final = color > threshold ? 255 : 0;

        data[i] = final;     // R
        data[i + 1] = final; // G
        data[i + 2] = final; // B
      }

      // Put processed image back
      ctx.putImageData(imageData, 0, 0);

      // Convert to blob and resolve
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    };

    img.src = URL.createObjectURL(file);
  });
}