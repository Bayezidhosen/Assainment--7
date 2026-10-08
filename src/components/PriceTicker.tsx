const items = [
  ["🍚", "চাল", "৮০ টাকা", "▲ ২.৫%"],
  ["🥔", "আলু", "৩৫ টাকা", "▼ ১.৮%"],
  ["🧅", "পেঁয়াজ", "৭০ টাকা", "▲ ৩.২%"],
  ["🌶️", "মরিচ", "১২০ টাকা", "▲ ৪.১%"],
  ["🥚", "ডিম", "১২ টাকা", "▼ ২.০%"],
  ["🐟", "ইলিশ", "১২০০ টাকা", "▲ ৫.৪%"],
];

export default function PriceTicker() {
  const data = [...items, ...items];

  return (
    <div className="border-t border-slate-100 bg-[#f7fbf8]">
      <div className="ticker-wrapper">
        <div className="ticker-track gap-8 px-4 py-2">
          {data.map(
            ([icon, name, price, change], index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm"
              >
                <span>{icon}</span>

                <span className="font-semibold text-slate-700">
                  {name}
                </span>

                <span className="text-slate-500">
                  {price}
                </span>

                <span
                  className={
                    change.startsWith("▲")
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-500"
                  }
                >
                  {change}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}