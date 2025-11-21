
import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';

const MagicEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const result = event.target.result as string;
        setSelectedImage(result);
        // Remove Data URL prefix to get raw base64
        const base64 = result.split(',')[1];
        setBase64Data(base64);
        setMimeType(file.type);
        setResultImage(null);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTransmute = async () => {
    if (!base64Data || !mimeType || !prompt) {
        setError("請上傳圖片並輸入咒語。");
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resultBase64 = await editImageWithGemini(base64Data, mimeType, prompt);
      if (resultBase64) {
        setResultImage(`data:image/png;base64,${resultBase64}`);
      } else {
        setError("煉金術失敗，未能生成影像。");
      }
    } catch (err) {
      setError("魔力連結中斷，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in pb-24 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center text-mystic-gold mb-2">影像煉金術</h2>
      <p className="text-mystic-silver text-sm mb-8 text-center opacity-80">運用星辰之力重塑你的影像</p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div 
            className="relative w-full aspect-square bg-mystic-800/50 border-2 border-dashed border-mystic-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-mystic-gold transition-colors overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Source" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                <p className="text-mystic-silver text-sm">點擊上傳儀式媒介 (圖片)</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
            {selectedImage && (
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-bold">更換圖片</p>
               </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-mystic-gold text-sm font-bold">咒語 (Prompt)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Add a retro filter, remove the person in background..."
              className="w-full bg-mystic-800 border border-mystic-600 rounded-lg p-3 text-white focus:border-mystic-gold outline-none h-24 resize-none"
            />
          </div>

          <button
            onClick={handleTransmute}
            disabled={isLoading || !selectedImage || !prompt}
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                isLoading || !selectedImage || !prompt
                ? 'bg-mystic-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/30'
            }`}
          >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>煉成中...</span>
                </>
            ) : (
                <>
                    <span>✨ 開始煉成</span>
                </>
            )}
          </button>
          
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-mystic-800/30 border border-mystic-700 rounded-xl flex items-center justify-center overflow-hidden">
            {resultImage ? (
              <img src={resultImage} alt="Result" className="w-full h-full object-cover animate-fade-in" />
            ) : (
              <div className="text-center p-4 opacity-50">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-mystic-silver text-sm">結果將顯示於此</p>
              </div>
            )}
            
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-mystic-900/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                    <div className="text-6xl animate-bounce mb-4">🪄</div>
                    <p className="text-mystic-gold animate-pulse">Gemini 正在施法...</p>
                </div>
            )}
          </div>
          
          {resultImage && (
              <a 
                href={resultImage} 
                download="mystic-alchemy-result.png"
                className="w-full py-3 bg-mystic-700 hover:bg-mystic-600 text-white rounded-lg font-bold text-center transition-colors"
              >
                下載煉成產物
              </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default MagicEditor;
