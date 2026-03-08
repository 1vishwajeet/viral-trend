import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, RotateCcw, Smartphone, Monitor, Square, Zap, Type, Layers } from 'lucide-react';
import { Trend, Template } from '../data/trends';

interface Props {
  trend: Trend;
  template: Template;
  onClose: () => void;
  onBack: () => void;
}

type AspectRatio = '9:16' | '1:1' | '16:9';

const ASPECT_DIMENSIONS: Record<AspectRatio, { w: number; h: number; label: string }> = {
  '9:16': { w: 9, h: 16, label: 'Stories / Reels' },
  '1:1': { w: 1, h: 1, label: 'Instagram Post' },
  '16:9': { w: 16, h: 9, label: 'YouTube / Twitter' },
};

const WATERMARK_OPTIONS = ['@TheTrendLab', '@YourBrand', 'VIRAL CONTENT', 'TREND LAB', 'None'];

export default function MiniEditor({ trend, template, onClose, onBack }: Props) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [watermark, setWatermark] = useState('None');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#ffffff');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const dims = ASPECT_DIMENSIONS[aspectRatio];
  function handleGenerate() {
    setIsGenerating(true);
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2500);
  }

  function handleReset() {
    setTopText('');
    setBottomText('');
    setIsGenerated(false);
    setWatermark('None');
    setFontSize(32);
    setTextColor('#ffffff');
  }

  const canvasH = aspectRatio === '9:16' ? 400 : aspectRatio === '1:1' ? 300 : 200;
  const canvasW = aspectRatio === '16:9' ? 500 : aspectRatio === '1:1' ? 300 : 225;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b border-zinc-900 bg-black/95 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-zinc-500 hover:text-white text-sm flex items-center gap-1 cursor-pointer transition-colors"
          >
            ← Back
          </button>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full pulse-red" />
            <span className="text-white font-bold text-sm font-clash tracking-wider">THE STUDIO</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 text-xs">
          <span>{trend.emoji}</span>
          <span className="text-zinc-700 hidden md:block">{trend.headline}</span>
        </div>
        <button onClick={onClose} className="p-2 text-zinc-500 hover:text-red-500 transition-colors cursor-pointer">
          <X size={18} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Canvas Area */}
        <div className="flex flex-col items-center">
          <div className="mb-6 text-center">
            <h2 className="font-clash text-3xl text-white">STEP 3: CRAFT IT</h2>
            <p className="text-zinc-600 text-sm">Preview your viral content below</p>
          </div>

          {/* Canvas */}
          <motion.div
            animate={isGlitching ? { x: [-3, 3, -3, 3, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="relative rounded-sm overflow-hidden"
            style={{
              width: `${canvasW}px`,
              height: `${canvasH}px`,
              maxWidth: '100%',
            }}
          >
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`} />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Scanline effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
              }}
            />

            {/* Center emoji */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span style={{ fontSize: `${Math.min(canvasH * 0.3, 100)}px` }}>{template.emoji}</span>
            </div>

            {/* Top Text */}
            {topText && (
              <div
                className="absolute top-4 left-0 right-0 text-center px-4"
                style={{
                  color: textColor,
                  fontSize: `${Math.min(fontSize, 40)}px`,
                  fontFamily: 'Bebas Neue, sans-serif',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,0,0,0.3)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                }}
              >
                {topText.toUpperCase()}
              </div>
            )}

            {/* Bottom Text */}
            {bottomText && (
              <div
                className="absolute bottom-4 left-0 right-0 text-center px-4"
                style={{
                  color: textColor,
                  fontSize: `${Math.min(fontSize, 40)}px`,
                  fontFamily: 'Bebas Neue, sans-serif',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,0,0,0.3)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                }}
              >
                {bottomText.toUpperCase()}
              </div>
            )}

            {/* Watermark */}
            {watermark !== 'None' && (
              <div
                className="absolute bottom-2 right-2 text-xs font-bold tracking-widest uppercase opacity-70"
                style={{ color: textColor }}
              >
                {watermark}
              </div>
            )}

            {/* Aspect ratio label */}
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 text-xs text-red-500 font-bold rounded-sm">
              {aspectRatio}
            </div>

            {/* Generated overlay */}
            <AnimatePresence>
              {isGenerated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                  <div className="text-green-400 text-4xl mb-2">✓</div>
                  <div className="text-white font-bold text-sm tracking-widest">READY TO EXPORT</div>
                  <div className="text-zinc-500 text-xs mt-1">File generated successfully</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generating overlay */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/90"
                >
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="text-red-500 font-clash text-2xl mb-4"
                  >
                    GENERATING...
                  </motion.div>
                  <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 load-bar rounded-full" />
                  </div>
                  <div className="text-zinc-600 text-xs mt-3 tracking-widest uppercase">Rendering pixels</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Template info */}
          <div className="mt-4 flex items-center gap-3 text-zinc-600 text-xs">
            <span>{template.emoji} {template.name}</span>
            <span>•</span>
            <span>{template.type}</span>
            <span>•</span>
            <span>{aspectRatio}</span>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {/* Aspect Ratio */}
          <div className="glass rounded-sm p-4 border border-zinc-900">
            <div className="flex items-center gap-2 mb-3">
              <Monitor size={14} className="text-red-500" />
              <span className="text-white font-bold text-xs tracking-widest uppercase">Aspect Ratio</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(ASPECT_DIMENSIONS) as AspectRatio[]).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    aspectRatio === ratio
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800'
                  }`}
                >
                  {ratio === '9:16' && <Smartphone size={14} />}
                  {ratio === '1:1' && <Square size={14} />}
                  {ratio === '16:9' && <Monitor size={14} />}
                  <span>{ratio}</span>
                  <span className="text-xs opacity-60 font-normal">{ASPECT_DIMENSIONS[ratio].label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Controls */}
          <div className="glass rounded-sm p-4 border border-zinc-900">
            <div className="flex items-center gap-2 mb-3">
              <Type size={14} className="text-red-500" />
              <span className="text-white font-bold text-xs tracking-widest uppercase">Add Neon Text</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-zinc-500 text-xs mb-1 block">Top Text</label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="BEARS ARE BACK..."
                  className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-red-600 placeholder-zinc-700 transition-colors"
                />
              </div>
              <div>
                <label className="text-zinc-500 text-xs mb-1 block">Bottom Text</label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="WE EAT ANYWAY"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-red-600 placeholder-zinc-700 transition-colors"
                />
              </div>
              <div>
                <label className="text-zinc-500 text-xs mb-1 block">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min={16}
                  max={60}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>
              <div>
                <label className="text-zinc-500 text-xs mb-1 block">Text Color</label>
                <div className="flex gap-2">
                  {['#ffffff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setTextColor(c)}
                      className={`w-7 h-7 rounded-sm border-2 cursor-pointer transition-all ${textColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="glass rounded-sm p-4 border border-zinc-900">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} className="text-red-500" />
              <span className="text-white font-bold text-xs tracking-widest uppercase">Add Watermark</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {WATERMARK_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setWatermark(opt)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    watermark === opt
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="glass rounded-sm p-4 border border-zinc-900">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-red-500" />
              <span className="text-white font-bold text-xs tracking-widest uppercase">AI Suggestions</span>
            </div>
            <div className="space-y-2">
              {[
                { top: 'MARKET LAAL HAI', bottom: 'MEME HARA HAI' },
                { top: trend.moodTag === 'PAIN' ? 'THIS IS FINE' : 'WHEN IT HITS', bottom: 'YOU KNOW IT' },
                { top: 'POV:', bottom: trend.headline.split(' ').slice(0, 4).join(' ').toUpperCase() },
              ].map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setTopText(s.top); setBottomText(s.bottom); }}
                  className="w-full text-left px-3 py-2 bg-zinc-950 border border-zinc-800 hover:border-red-600/40 rounded-sm text-xs text-zinc-500 hover:text-white transition-all cursor-pointer"
                >
                  <span className="text-zinc-400">{s.top}</span>
                  <span className="text-zinc-700 mx-1">/</span>
                  <span className="text-zinc-500">{s.bottom}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isGenerated ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 text-white font-bold tracking-widest uppercase rounded-sm transition-all cursor-pointer disabled:opacity-50"
                style={{ boxShadow: isGenerating ? 'none' : '0 0 20px #ff000060' }}
              >
                {isGenerating ? (
                  <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 0.4 }}>
                    ⚡ GENERATING...
                  </motion.span>
                ) : (
                  <>
                    <Zap size={16} />
                    GENERATE & DOWNLOAD
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white font-bold tracking-widest uppercase rounded-sm cursor-pointer"
                style={{ boxShadow: '0 0 20px #16a34a60' }}
              >
                <Download size={16} />
                DOWNLOAD NOW
              </motion.button>
            )}

            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-3 glass text-zinc-500 hover:text-white font-bold text-sm tracking-widest uppercase rounded-sm transition-all cursor-pointer border border-zinc-800 hover:border-zinc-700"
            >
              <RotateCcw size={14} />
              RESET
            </button>
          </div>

          {/* Info */}
          {isGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-red rounded-sm p-3 text-center"
            >
              <div className="text-green-400 font-bold text-sm mb-1">Content Ready!</div>
              <div className="text-zinc-500 text-xs">Download and post it before they do. Speed wins.</div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
