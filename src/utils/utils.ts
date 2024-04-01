export async function getImageParams(base64Image: string): Promise<{ width: number, height: number, isAllBlack: boolean }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Unable to get canvas context'));
        return;
      }

      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height);

      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        // If the pixel is not black or transparent, resolve the promise with false
        if (r !== 0 || g !== 0 || b !== 0 || a !== 255) {
          resolve({ width: img.width, height: img.height, isAllBlack: false});
          return;
        }
      }

      // If all pixels are black, resolve the promise with true
      resolve({ width: img.width, height: img.height, isAllBlack: true});
    };

    img.onerror = reject;
    img.src = base64Image;
  });
}