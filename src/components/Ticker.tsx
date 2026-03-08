import { TICKER_ITEMS } from '../data/trends';

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full bg-red-600 py-2 overflow-hidden relative z-50">
      <div className="flex ticker-animate whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-block px-8 text-white font-bold text-sm tracking-widest uppercase">
            {item}
            <span className="ml-8 text-red-300">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
