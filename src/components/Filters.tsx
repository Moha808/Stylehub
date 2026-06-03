interface FiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activePriceRange: string;
  onPriceRangeChange: (priceRange: string) => void;
  categories: string[];
  priceRanges: { label: string; value: string }[];
}

export default function Filters({
  activeCategory,
  onCategoryChange,
  activePriceRange,
  onPriceRangeChange,
  categories,
  priceRanges,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-8 md:gap-12 mb-10 pb-4 border-b border-zinc-900">
      {/* Category Tabs */}
      <div>
        <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4">
          // Browse Categories
        </span>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all rounded-none border ${
                activeCategory === category
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Ranges Tabs */}
      <div>
        <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-4">
          // Filter by Pricing
        </span>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onPriceRangeChange(range.value)}
              className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all rounded-none border ${
                activePriceRange === range.value
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-700"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
