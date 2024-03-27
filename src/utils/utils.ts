export function getImageDimensions(base64Image: string): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      resolve({ width, height });
    };
    img.onerror = reject;
    img.src = base64Image;
  });
}