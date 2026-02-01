
import type { SourceImage, BoundingBox } from './types';

export const sourceImageToDataUrl = (image: SourceImage): string => {
    return `data:${image.mimeType};base64,${image.base64}`;
}

export const dataUrlToSourceImage = (dataUrl: string): SourceImage | null => {
    if (!dataUrl) return null;
    const parts = dataUrl.split(',');
    if (parts.length !== 2) return null;
    const header = parts[0];
    const base64Data = parts[1];
    const mimeTypeMatch = header.match(/:(.*?);/);
    if (!mimeTypeMatch || !mimeTypeMatch[1]) return null;
    return { base64: base64Data, mimeType: mimeTypeMatch[1] };
};

/**
 * XØN NAMING PROTOCOL V4.2
 * Format: XON_[UTILITY]_[DD_MM_YYYY]_[HHhMM]_[STATUS].[EXT]
 */
export const generateProtocolFileName = (utility: string, status: string, extension: 'json' | 'txt' | 'png' | 'mp4'): string => {
    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getFullYear()}`;
    const timeStr = `${now.getHours().toString().padStart(2, '0')}h${now.getMinutes().toString().padStart(2, '0')}`;
    return `XON_${utility.toUpperCase()}_${dateStr}_${timeStr}_${status.toUpperCase()}.${extension}`;
};

// --- PCM Audio Helpers for Gemini TTS ---

export function decodeBase64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Convert Int16 to Float32 [-1.0, 1.0]
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Chuyển đổi URL ảnh thành SourceImage (Base64)
 */
export const convertUrlToBase64 = async (url: string): Promise<SourceImage> => {
    try {
        const finalUrl = `${url}${url.includes('?') ? '&' : '?'}cache_bust=${Date.now()}`;
        const response = await fetch(finalUrl, { 
            method: 'GET',
            mode: 'cors'
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                if (base64) {
                    resolve({ base64, mimeType: blob.type || 'image/jpeg' });
                } else {
                    reject(new Error("Dữ liệu Base64 trống"));
                }
            };
            reader.onerror = () => reject(new Error("FileReader failed"));
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Lỗi convertUrlToBase64:", error);
        throw error;
    }
};

export const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

export const cropImageToAspectRatio = (image: SourceImage, targetAspectRatio: number): Promise<SourceImage> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = sourceImageToDataUrl(image);
    img.onload = () => {
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      const originalAspectRatio = originalWidth / originalHeight;
      let sx = 0, sy = 0, sWidth = originalWidth, sHeight = originalHeight;
      if (originalAspectRatio > targetAspectRatio) {
        sWidth = originalHeight * targetAspectRatio;
        sx = (originalWidth - sWidth) / 2;
      } else if (originalAspectRatio < targetAspectRatio) {
        sHeight = originalWidth / targetAspectRatio;
        sy = (originalHeight - sHeight) / 2;
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(sWidth);
      canvas.height = Math.round(sHeight);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Could not get canvas context'));
      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL(image.mimeType);
      const newSourceImage = dataUrlToSourceImage(dataUrl);
      if (newSourceImage) resolve(newSourceImage);
      else reject(new Error('Failed to convert cropped canvas'));
    };
    img.onerror = (err) => reject(new Error(`Image load error: ${err}`));
  });
};

export const padImageToAspectRatio = (image: SourceImage, targetAspectRatio: number): Promise<SourceImage> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = sourceImageToDataUrl(image);
    img.onload = () => {
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      const originalAspectRatio = originalWidth / originalHeight;
      if (Math.abs(originalAspectRatio - targetAspectRatio) < 0.01) {
        resolve(image);
        return;
      }
      let canvasWidth = originalWidth;
      let canvasHeight = originalHeight;
      let dx = 0; let dy = 0;
      if (originalAspectRatio > targetAspectRatio) {
        canvasHeight = originalWidth / targetAspectRatio;
        dy = (canvasHeight - originalHeight) / 2;
      } else {
        canvasWidth = originalHeight * targetAspectRatio;
        dx = (canvasWidth - originalWidth) / 2;
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(canvasWidth);
      canvas.height = Math.round(canvasHeight);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Could not get canvas context'));
      ctx.drawImage(img, dx, dy, originalWidth, originalHeight);
      const dataUrl = canvas.toDataURL('image/png');
      const newSourceImage = dataUrlToSourceImage(dataUrl);
      if (newSourceImage) resolve(newSourceImage);
      else reject(new Error('Failed to convert padded canvas'));
    };
    img.onerror = (err) => reject(new Error(`Image load error: ${err}`));
  });
};

export const compositeImage = (
  bgImage: SourceImage,
  fgImage: SourceImage,
  box: BoundingBox,
  maskImage: SourceImage,
  options: { expansion: number, edgeBlend: number }
): Promise<SourceImage> => {
  return new Promise((resolve, reject) => {
    const bg = new Image(); const fg = new Image(); const mask = new Image();
    let loadedCount = 0;
    const onImageLoad = () => { loadedCount++; if (loadedCount === 3) performComposite(); };
    bg.crossOrigin = fg.crossOrigin = mask.crossOrigin = "anonymous";
    bg.onload = fg.onload = mask.onload = onImageLoad;
    bg.src = sourceImageToDataUrl(bgImage);
    fg.src = sourceImageToDataUrl(fgImage);
    mask.src = sourceImageToDataUrl(maskImage);
    const performComposite = () => {
      try {
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = bg.naturalWidth; finalCanvas.height = bg.naturalHeight;
        const finalCtx = finalCanvas.getContext('2d');
        if (!finalCtx) return reject(new Error('Canvas failure'));
        finalCtx.drawImage(bg, 0, 0);
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = bg.naturalWidth; maskCanvas.height = bg.naturalHeight;
        const maskCtx = maskCanvas.getContext('2d');
        if (!maskCtx) return;
        maskCtx.drawImage(mask, 0, 0);
        const fgCanvas = document.createElement('canvas');
        fgCanvas.width = bg.naturalWidth; fgCanvas.height = bg.naturalHeight;
        const fgCtx = fgCanvas.getContext('2d');
        if (!fgCtx) return;
        fgCtx.drawImage(fg, box.x, box.y, box.width, box.height);
        fgCtx.globalCompositeOperation = 'destination-in';
        if (options.edgeBlend > 0) fgCtx.filter = `blur(${options.edgeBlend}px)`;
        fgCtx.drawImage(maskCanvas, 0, 0);
        finalCtx.globalCompositeOperation = 'source-over';
        finalCtx.drawImage(fgCanvas, 0, 0);
        const dataUrl = finalCanvas.toDataURL('image/png');
        const res = dataUrlToSourceImage(dataUrl);
        if (res) resolve(res); else reject(new Error('Failed to composite'));
      } catch (e) { reject(e); }
    };
  });
};
