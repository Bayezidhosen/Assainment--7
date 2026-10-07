const tickerItems = [
  {
    emoji: "🍚",
    name: "চাল",
    price: "৭৫ টাকা/কেজি",
    change: "▲ ২.১%",
    type: "up",
  },
  {
    emoji: "🥔",
    name: "আলু",
    price: "৩৫ টাকা/কেজি",
    change: "▼ ১.৫%",
    type: "down",
  },
  {
    emoji: "🧅",
    name: "পেঁয়াজ",
    price: "৬০ টাকা/কেজি",
    change: "▲ ৩.২%",
    type: "up",
  },
  {
    emoji: "🌶️",
    name: "মরিচ",
    price: "১৮০ টাকা/কেজি",
    change: "▲ ৪.১%",
    type: "up",
  },
  {
    emoji: "🥚",
    name: "ডিম",
    price: "১৪৫ টাকা/ডজন",
    change: "▼ ০.৮%",
    type: "down",
  },
  {
    emoji: "🐟",
    name: "ইলিশ",
    price: "১,৮৫০ টাকা/কেজি",
    change: "— ০.০%",
    type: "flat",
  },
  {
    emoji: "🫘",
    name: "মসুর ডাল",
    price: "১২০ টাকা/কেজি",
    change: "▲ ১.২%",
    type: "up",
  },
];

export default function PriceTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {items.map((item, index) => (
          <div className="ticker-item" key={`${item.name}-${index}`}>
            <span className="text-lg">{item.emoji}</span>

            <span className="font-semibold text-gray-800">
              {item.name}
            </span>

            <span className="text-gray-500">
              {item.price}
            </span>

            <span
              className={
                item.type === "up"
                  ? "ticker-up"
                  : item.type === "down"
                  ? "ticker-down"
                  : "ticker-flat"
              }
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}