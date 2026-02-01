
import React, { useState, useRef, useEffect } from 'react';
import type { ActiveTab, SourceImage, AspectRatio, ImageSize, EditSubMode, ObjectTransform, BoundingBox } from './types';
import { UtilitiesView } from './components/UtilitiesView';
import { useHistory } from './hooks/useHistory';
import { useLibrary } from './hooks/useLibrary';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import { FullscreenViewer } from './components/FullscreenViewer';
import { generateImages, generateInpaintImage, generateSingleVideo } from './services/geminiService';
import { copyToClipboard, dataUrlToSourceImage } from './utils';

export default function App() {
    const { addHistoryItem } = useHistory();
    const { addImageToLibrary } = useLibrary();
    const { t, language } = useLanguage();
    const { theme } = useTheme();

    // KHỞI TẠO THẲNG VÀO NEURAL BRAIN
    const [activeTab, setActiveTab] = useState<ActiveTab>('utilities');
    const [externalActiveUtility, setExternalActiveUtility] = useState<string | null>('neuralBrain');
    
    const [isProMode] = useState(true);
    const [sourceImage, setSourceImage] = useState<SourceImage | null>(null);
    const [additionalSourceImages, setAdditionalSourceImages] = useState<SourceImage[]>([]);
    const [referenceImages, setReferenceImages] = useState<SourceImage[]>([]);
    const [editReferenceImages, setReferenceImagesEdit] = useState<SourceImage[]>([]);
    const [maskImage, setMaskImage] = useState<SourceImage | null>(null);
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [imageCount, setImageCount] = useState(4);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('auto');
    const [imageSize, setImageSize] = useState<ImageSize>('1K');
    const [aiModel, setAiModel] = useState('gemini-3-pro-image-preview');

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [generatedPrompts, setGeneratedPrompts] = useState<string | null>(null);
    const [fullscreenData, setFullscreenData] = useState<{ images: string[], index: number } | null>(null);

    const handleTabChange = (tab: ActiveTab) => {
        setActiveTab(tab);
        if (tab === 'utilities') setExternalActiveUtility('neuralBrain');
    };

    const handleGeneration = async () => {
        setIsLoading(true); setLoadingMessage(t('loadingMessageDefault'));
        try {
            if (activeTab === 'edit' && sourceImage && maskImage) {
                const results = await generateInpaintImage(sourceImage, maskImage, prompt, language, aiModel, editReferenceImages, additionalSourceImages);
                if (results && results.length > 0) { setGeneratedImages(results); setSelectedImage(results[0]); }
            } else if (activeTab === 'video' && sourceImage) {
                const videoUrl = await generateSingleVideo(sourceImage, prompt, language, '16:9', '720p', 'veo-3.1-fast-generate-preview', setLoadingMessage);
                if (videoUrl) setGeneratedVideoUrl(videoUrl);
            } else {
                const results = await generateImages(sourceImage, prompt, imageCount, referenceImages, aspectRatio, language, negativePrompt, aiModel, imageSize);
                if (results && results.length > 0) {
                    setGeneratedImages(results); setSelectedImage(results[0]);
                }
            }
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
    };

    const masterProps = {
        isProMode, activeTab, externalActiveUtility, setExternalActiveUtility, sourceImage, setSourceImage, additionalSourceImages, setAdditionalSourceImages, referenceImages, setReferenceImages, editReferenceImages, setEditReferenceImages: setReferenceImagesEdit, prompt, setPrompt, negativePrompt, setNegativePrompt, imageCount, setImageCount, aspectRatio, setAspectRatio, imageSize, setImageSize, aiModel, setAiModel, isLoading, setIsLoading, loadingMessage, setLoadingMessage, generatedImages, setGeneratedImages, generatedPrompts, setGeneratedPrompts, selectedImage, setSelectedImage, generatedVideoUrl, setGeneratedVideoUrl, setMaskImage, handleGeneration, addImageToLibrary, addHistoryItem, setFullscreenData: (imgs: string[], idx: number) => setFullscreenData({images: imgs, index: idx}), onTabChange: handleTabChange, copyToClipboard
    };

    return (
        <div className={`h-screen w-screen flex flex-col ${theme.appBg} ${theme.textMain} font-inter overflow-hidden`}>
            <main className="flex-grow w-full h-full animate-fade-in overflow-hidden">
                <UtilitiesView {...masterProps} />
            </main>

            {fullscreenData && <FullscreenViewer images={fullscreenData.images} initialIndex={fullscreenData.index} onClose={() => setFullscreenData(null)} />}
        </div>
    );
}
