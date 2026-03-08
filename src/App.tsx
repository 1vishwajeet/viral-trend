import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Ticker from './components/Ticker';
import LandingPage from './components/LandingPage';
import TrendRadar from './components/TrendRadar';
import TemplateGallery from './components/TemplateGallery';
import MiniEditor from './components/MiniEditor';
import { Trend, Template } from './data/trends';

type AppView = 'landing' | 'radar' | 'gallery' | 'editor';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  function handleEnterLab() {
    setView('radar');
  }

  function handleSelectTrend(trend: Trend) {
    setSelectedTrend(trend);
    setView('gallery');
  }

  function handleSelectTemplate(template: Template) {
    setSelectedTemplate(template);
    setView('editor');
  }

  function handleBackFromGallery() {
    setView('radar');
    setSelectedTrend(null);
  }

  function handleBackFromEditor() {
    setView('gallery');
    setSelectedTemplate(null);
  }

  function handleClose() {
    setView('radar');
    setSelectedTrend(null);
    setSelectedTemplate(null);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Always show ticker */}
      <Ticker />

      {/* Navigation bar (shown after landing) */}
      {view !== 'landing' && view !== 'gallery' && view !== 'editor' && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 border-b border-zinc-900 bg-black/95 backdrop-blur-xl px-4 py-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs">TL</span>
              </div>
              <div>
                <div className="font-clash text-white text-xl tracking-wider">THE TREND LAB</div>
                <div className="text-zinc-600 text-xs tracking-widest uppercase">Viral Content Engine</div>
              </div>
            </div>

            {/* Nav actions */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1 px-3 py-1.5 glass rounded-sm border border-zinc-800">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full blink-dot" />
                <span className="text-zinc-500 text-xs">12 trends live</span>
              </div>
              <button
                onClick={() => setView('landing')}
                className="text-zinc-600 hover:text-white text-sm transition-colors cursor-pointer hidden md:block"
              >
                Home
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold text-xs tracking-widest uppercase rounded-sm cursor-pointer"
                style={{ boxShadow: '0 0 15px #ff000050' }}
              >
                🔥 RADAR
              </button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Views */}
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onEnter={handleEnterLab} />
            
            {/* How it works section */}
            <HowItWorks onEnter={handleEnterLab} />
            
            {/* Genre copy section */}
            <GenreSection />
            
            {/* Footer */}
            <Footer />
          </motion.div>
        )}

        {view === 'radar' && (
          <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TrendRadar onSelectTrend={handleSelectTrend} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {view === 'gallery' && selectedTrend && (
          <TemplateGallery
            trend={selectedTrend}
            onSelectTemplate={handleSelectTemplate}
            onClose={handleBackFromGallery}
          />
        )}
      </AnimatePresence>

      {/* Editor Modal */}
      <AnimatePresence>
        {view === 'editor' && selectedTrend && selectedTemplate && (
          <MiniEditor
            trend={selectedTrend}
            template={selectedTemplate}
            onClose={handleClose}
            onBack={handleBackFromEditor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---- Supporting Sections ---- */

function HowItWorks({ onEnter }: { onEnter: () => void }) {
  const steps = [
    {
      number: '01',
      title: 'THE RADAR',
      subtitle: 'Discovery',
      desc: 'Pick your genre — Finance, Sports, Business, Tech, or Funny. See what is burning on the internet RIGHT NOW.',
      emoji: '📡',
      color: 'from-red-900/30 to-transparent',
    },
    {
      number: '02',
      title: 'THE WEAPON',
      subtitle: 'Template Match',
      desc: 'Click a trend. System instantly suggests the perfect meme template based on the mood. Sad news = sad memes. Hype = hype templates.',
      emoji: '🎯',
      color: 'from-orange-900/30 to-transparent',
    },
    {
      number: '03',
      title: 'THE STRIKE',
      subtitle: 'Edit & Export',
      desc: 'Add your text, set the format (9:16 for Reels, 1:1 for Posts). Hit Generate. Download in seconds. Post before the trend dies.',
      emoji: '⚡',
      color: 'from-yellow-900/20 to-transparent',
    },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3">The 3-Step Flow</div>
        <h2 className="font-clash text-6xl text-white mb-4">HOW THE LAB WORKS</h2>
        <p className="text-zinc-500 max-w-xl mx-auto">From news to meme. In under 60 seconds. No designer. No delay. No excuses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative glass rounded-sm p-8 border border-zinc-900 hover:border-red-900/40 transition-colors group overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className="font-clash text-7xl text-zinc-900 mb-4">{step.number}</div>
              <div className="text-4xl mb-4">{step.emoji}</div>
              <div className="text-red-500 text-xs font-bold tracking-widest uppercase mb-1">{step.subtitle}</div>
              <h3 className="font-clash text-3xl text-white mb-3">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="px-8 py-4 bg-red-600 text-white font-bold tracking-widest uppercase rounded-sm cursor-pointer"
          style={{ boxShadow: '0 0 25px #ff000060' }}
        >
          ⚡ START NOW — IT'S FREE
        </motion.button>
      </div>
    </section>
  );
}

function GenreSection() {
  const genres = [
    {
      emoji: '📈',
      title: 'FINANCE',
      copy: 'Market laal hai ya hara? Humare paas dono ke liye memes hain.',
      sub: 'Sensex crashes, crypto pumps, and dadi\'s gold ATH.',
      color: 'hover:border-green-800/60',
      glow: '#16a34a',
    },
    {
      emoji: '💼',
      title: 'BUSINESS',
      copy: 'Pitch decks, funding, and late-night grinds.',
      sub: 'Turn your struggle into viral gold. Founders will relate.',
      color: 'hover:border-blue-800/60',
      glow: '#1d4ed8',
    },
    {
      emoji: '🏏',
      title: 'SPORTS',
      copy: 'Match khatam hone se pehle meme ready.',
      sub: 'Speed is the only game. Win the internet, then the match.',
      color: 'hover:border-yellow-800/60',
      glow: '#ca8a04',
    },
    {
      emoji: '😂',
      title: 'FUNNY',
      copy: 'Life is absurd. Your memes should be too.',
      sub: 'Go viral on pure chaos and relatable energy. That\'s it.',
      color: 'hover:border-purple-800/60',
      glow: '#7c3aed',
    },
    {
      emoji: '🤖',
      title: 'TECH',
      copy: 'AI, startups, and the future — all meme-able.',
      sub: 'Silicon Valley drama hits different when it\'s a meme.',
      color: 'hover:border-cyan-800/60',
      glow: '#0891b2',
    },
  ];

  return (
    <section className="py-24 px-4 bg-zinc-950/50 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-red-500 text-xs font-bold tracking-widest uppercase mb-3">Content Categories</div>
          <h2 className="font-clash text-6xl text-white">PICK YOUR BATTLEFIELD</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {genres.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`glass rounded-sm p-6 border border-zinc-900 ${g.color} transition-all duration-300 cursor-pointer group`}
            >
              <div className="text-4xl mb-4">{g.emoji}</div>
              <div className="font-clash text-2xl text-white mb-2 group-hover:text-red-400 transition-colors">
                {g.title}
              </div>
              <p className="text-white/80 text-sm font-medium mb-2 leading-snug">{g.copy}</p>
              <p className="text-zinc-600 text-xs leading-relaxed">{g.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xs">TL</span>
          </div>
          <div>
            <div className="font-clash text-white text-lg tracking-wider">THE TREND LAB</div>
            <div className="text-zinc-700 text-xs">Viral Content Engine — TIOFE369</div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-zinc-600 text-sm">
            Built for{' '}
            <span className="text-red-500 font-bold">Gen-Z Marketers</span> who refuse to sleep on trends.
          </p>
        </div>

        <div className="flex items-center gap-4 text-zinc-700 text-xs">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
          <span className="text-red-600">© 2026</span>
        </div>
      </div>
    </footer>
  );
}
