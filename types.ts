
export type EditSubMode = 'inpaint' | 'smartEdit' | 'mergeHouse' | 'mergeMaterial' | 'mergeFurniture' | 'canva' | 'structure';
export type ActiveTab = 'create' | 'interior' | 'cameraAngle' | 'edit' | 'planTo3d' | 'video' | 'canva' | 'prompt' | 'utilities' | 'library' | 'planning' | 'sketch' | 'trend' | 'dashboard' | 'architectureView' | 'interiorView' | 'materialMoodboard' | 'plan3d' | 'modelCreator' | 'brandIdentity' | 'enhance' | 'conceptStudio' | 'slideVideo' | 'archToInterior' | 'archToArch' | 'photographerStudio' | 'twoDToArch' | 'detailToTwoD' | 'structureEditor' | 'sketchToReal' | 'twoDPlanToLayout' | 'scanPlanAI' | 'template' | 'logoBrand' | 'moodboard' | 'lighting' | 'virtualTour' | 'extendView' | 'changeStyle' | 'timelapse' | 'videoPrompt' | 'conceptNarrative' | 'protocol' | 'techStudio' | 'platformVault' | 'myIdea' | 'vaultGuard' | 'utilityMigrator' | 'archTypo' | 'brandNameStation' | 'landscapeAI' | 'mindFlow' | 'versionLog' | 'manifestStation' | 'memoStation' | 'innovationStation';
export type AspectRatio = 'auto' | '1:1' | '4:3' | '3:4' | '16:9' | '9:16' | '2:3' | '3:2';
export type ImageSize = '1K' | '2K' | '4K';
export type Utility = 'conceptStudio' | 'enhance' | 'moodboard' | 'videoPrompt' | 'lighting' | 'virtualTour' | 'extendView' | 'changeStyle' | 'layout' | 'model' | 'diagram' | 'analyze' | 'trendMoodboard' | 'vr360' | 'interiorView' | 'architectureView' | 'archToInterior' | 'sketch' | 'modelCreator' | 'timelapse' | 'plan3d' | 'cameraAngle' | 'materialMoodboard' | 'conceptNarrative' | 'studioCreate' | 'studioEdit' | 'studioVideo' | 'slideVideo' | 'brandIdentity' | 'archToArch' | 'photographerStudio' | 'twoDToArch' | 'detailToTwoD' | 'structureEditor' | 'sketchToReal' | 'twoDPlanToLayout' | 'scanPlanAI' | 'template' | 'logoBrand' | 'protocol' | 'techStudio' | 'platformVault' | 'myIdea' | 'vaultGuard' | 'utilityMigrator' | 'archTypo' | 'brandNameStation' | 'landscapeAI' | 'mindFlow' | 'versionLog' | 'manifestStation' | 'memoStation' | 'innovationStation';

export interface SourceImage {
  base64: string;
  mimeType: string;
}

export interface VisionPin {
    id: string;
    x: number;
    y: number;
    note: string;
}

export interface VisionTask {
    id: string;
    label: string;
    prompt: string;
    x: number;
    y: number;
    selected: boolean;
}

export interface EditRenderTask {
    id: string;
    label: string;
    prompt: string;
    x: number;
    y: number;
    mask: SourceImage | null;
    referenceImage?: SourceImage | null;
    selected: boolean;
    isLoading: boolean;
}

export interface HistoryItem {
  id: string;
  tab: ActiveTab; 
  sourceImage: SourceImage | null;
  sourceImage2?: SourceImage | null;
  referenceImage: SourceImage | null;
  referenceImages?: SourceImage[];
  prompt: string;
  negativePrompt?: string;
  imageCount: number;
  generatedImages: string[];
  generatedPrompts?: string | null;
  videoModel?: string;
  additionalImages?: SourceImage[];
}

export interface LibraryItem {
  id: string;
  imageData: string;
}

export interface ObjectTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
