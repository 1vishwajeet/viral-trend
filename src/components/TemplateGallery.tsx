import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Image as ImageIcon } from 'lucide-react';
import { Trend, TEMPLATES, Template } from '../data/trends';

interface Props {
  trend: Trend;
  onSelectTemplate: (template: Template) => void;
  onClose: () => void;
}

export default function TemplateGallery({ trend, onSelectTemplate, onClose }: Props) {
  const [filter, setFilter] = useState<'ALL' | 'PHOTO' | 'VIDEO'>('ALL');

  const filtered = filter === 'ALL' ? TEMPLATES : TEMPLATES.filter((t) => t.type === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Step 2: Choose Template</span>
            </div>
            <h2 className="font-clash text-4xl text-white mb-1">
              {trend.emoji} PICK YOUR WEAPON
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl">
              Trend: <span className="text-zinc-300">{trend.headline}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 glass rounded-sm text-zinc-400 hover:text-red-500 hover:border-red-600/40 transition-colors cursor-pointer border border-zinc-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Trend context card */}
        <div className="glass-red rounded-sm p-4 mb-8 flex items-center gap-4">
          <div className="text-4xl">{trend.emoji}</div>
          <div>
            <div className="text-white font-bold text-sm">{trend.headline}</div>
            <div className="text-zinc-500 text-sm">{trend.subtext}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-red-500 font-clash text-2xl">{trend.hotness}%</div>
            <div className="text-zinc-600 text-xs uppercase tracking-widest">Heat Score</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6">
          {(['ALL', 'PHOTO', 'VIDEO'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-2 px-5 py-2 rounded-sm font-bold text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                filter === f
                  ? 'bg-red-600 text-white shadow-[0_0_15px_#ff000080]'
                  : 'glass text-zinc-500 hover:text-white border border-zinc-800'
              }`}
            >
              {f === 'PHOTO' && <ImageIcon size={14} />}
              {f === 'VIDEO' && <Play size={14} />}
              {f}
            </button>
          ))}
          <div className="ml-auto text-zinc-600 text-sm flex items-center">
            {filtered.length} templates available
          </div>
        </div>

        {/* Video Templates Row */}
        {(filter === 'ALL' || filter === 'VIDEO') && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Play size={14} className="text-red-500" />
              <span className="text-white font-bold text-sm tracking-widest uppercase">Video Templates</span>
              <span className="text-zinc-700 text-xs">(MP4 / Reel Format)</span>
            </div>
            <div className="horizontal-scroll pb-3">
              {TEMPLATES.filter((t) => t.type === 'VIDEO').map((template, i) => (
                <TemplateCard key={template.id} template={template} index={i} onSelect={onSelectTemplate} />
              ))}
            </div>
          </div>
        )}

        {/* Photo Templates Grid */}
        {(filter === 'ALL' || filter === 'PHOTO') && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon size={14} className="text-red-500" />
              <span className="text-white font-bold text-sm tracking-widest uppercase">Photo Templates</span>
              <span className="text-zinc-700 text-xs">(PNG / JPEG Format)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {TEMPLATES.filter((t) => t.type === 'PHOTO').map((template, i) => (
                <TemplateCard key={template.id} template={template} index={i} onSelect={onSelectTemplate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TemplateCard({ template, index, onSelect }: { template: Template; index: number; onSelect: (t: Template) => void }) {
  const isVideo = template.type === 'VIDEO';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => onSelect(template)}
      className="group relative flex-shrink-0 cursor-pointer rounded-sm overflow-hidden"
      style={{
        width: isVideo ? '180px' : '100%',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Thumbnail */}
      <div
        className={`relative ${isVideo ? 'h-72' : 'h-48'} bg-gradient-to-br ${template.gradient} overflow-hidden`}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Center emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">{template.emoji}</span>
        </div>

        {/* Video play button */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center">
              <Play size={20} className="text-white ml-1" />
            </div>
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${isVideo ? 'bg-red-600 text-white' : 'bg-white/10 text-white'}`}>
            {template.type}
          </span>
        </div>

        {/* Aspect ratio */}
        <div className="absolute top-2 right-2">
          <span className="text-xs text-white/60 bg-black/40 px-1.5 py-0.5 rounded-sm">
            {template.aspectRatio}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 transition-all duration-200 rounded-sm" />
      </div>

      {/* Info */}
      <div className="p-3 bg-zinc-950/90">
        <div className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
          {template.name}
        </div>
        <div className="text-zinc-600 text-xs mt-0.5">
          Mood: <span className="text-zinc-500">{template.mood}</span>
        </div>
      </div>

      {/* Select overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/10 rounded-sm">
        <div className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-sm tracking-widest uppercase">
          USE THIS
        </div>
      </div>
    </motion.div>
  );
}
