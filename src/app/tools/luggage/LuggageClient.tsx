"use client";

import { useMemo, useState } from "react";
import {
  DESTINATIONS,
  generateChecklist,
  type Activity,
  type Climate,
  type LuggageForm,
  type Season,
} from "@/lib/luggage";

const ACTIVITIES: { value: Activity; label: string }[] = [
  { value: "sightseeing", label: "觀光景點" },
  { value: "business", label: "商務出差" },
  { value: "beach", label: "海邊 / 游泳" },
  { value: "hiking", label: "登山健行" },
  { value: "ski", label: "滑雪" },
  { value: "photography", label: "攝影" },
  { value: "shopping", label: "購物" },
];

const SEASONS: { value: Season; label: string }[] = [
  { value: "spring", label: "春" },
  { value: "summer", label: "夏" },
  { value: "autumn", label: "秋" },
  { value: "winter", label: "冬" },
];

const CLIMATES: { value: Climate; label: string }[] = [
  { value: "cold", label: "寒冷" },
  { value: "mild", label: "溫和" },
  { value: "warm", label: "溫暖" },
  { value: "tropical", label: "熱帶" },
];

export default function LuggageClient() {
  const [destination, setDestination] = useState("japan");
  const [days, setDays] = useState(5);
  const [season, setSeason] = useState<Season>("spring");
  const [climate, setClimate] = useState<Climate>("mild");
  const [activities, setActivities] = useState<Activity[]>(["sightseeing"]);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const dest = DESTINATIONS[destination] ?? DESTINATIONS.other;

  const form: LuggageForm = useMemo(
    () => ({
      destination,
      days,
      season,
      climate,
      activities,
      needsVisa: dest.needsVisa,
      needsAdapter: dest.needsAdapter,
      voltage: dest.voltage,
    }),
    [destination, days, season, climate, activities, dest],
  );

  const checklist = useMemo(() => generateChecklist(form), [form]);

  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const totalItems = checklist.reduce((acc, s) => acc + s.items.length, 0);
  const checkedCount = checked.size;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
      <aside className="lg:sticky lg:top-4 self-start space-y-5 print:hidden">
        <h2 className="text-lg font-bold border-b pb-2">基本資訊</h2>

        <Field label="目的地">
          <select
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              const d = DESTINATIONS[e.target.value];
              if (d) setClimate(d.climate);
            }}
            className="w-full border border-slate-300 rounded px-3 py-2"
          >
            {Object.entries(DESTINATIONS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={`天數：${days} 天`}>
          <input
            type="range"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full"
          />
        </Field>

        <Field label="季節">
          <div className="grid grid-cols-4 gap-2">
            {SEASONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSeason(s.value)}
                className={`px-2 py-2 rounded border text-sm ${
                  season === s.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:border-blue-400"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="氣候">
          <div className="grid grid-cols-2 gap-2">
            {CLIMATES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setClimate(c.value)}
                className={`px-2 py-2 rounded border text-sm ${
                  climate === c.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:border-blue-400"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="活動類型（可複選）">
          <div className="grid grid-cols-2 gap-2">
            {ACTIVITIES.map((a) => {
              const on = activities.includes(a.value);
              return (
                <button
                  key={a.value}
                  type="button"
                  onClick={() =>
                    setActivities((prev) =>
                      prev.includes(a.value)
                        ? prev.filter((x) => x !== a.value)
                        : [...prev, a.value],
                    )
                  }
                  className={`px-2 py-2 rounded border text-sm ${
                    on
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-slate-300 hover:border-blue-400"
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </Field>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-700"
        >
          🖨️ 列印 / 存成 PDF
        </button>
      </aside>

      <div>
        <div className="mb-6 flex items-center justify-between print:mb-3">
          <h2 className="text-2xl font-bold">
            {dest.label}（{days} 天）行李清單
          </h2>
          <span className="text-sm text-slate-500 print:hidden">
            已勾 {checkedCount} / {totalItems}
          </span>
        </div>

        <div className="space-y-6">
          {checklist.map((section) => (
            <section
              key={section.title}
              className="border border-slate-200 rounded-lg p-5 break-inside-avoid"
            >
              <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, idx) => {
                  const key = `${section.title}-${idx}-${item.name}`;
                  const isChecked = checked.has(key);
                  return (
                    <li
                      key={key}
                      className="flex items-start gap-3 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(key)}
                        className="mt-1 w-4 h-4 accent-blue-600"
                      />
                      <div className="flex-1">
                        <span
                          className={
                            isChecked ? "line-through text-slate-400" : ""
                          }
                        >
                          {item.name}
                        </span>
                        {item.qty && (
                          <span className="ml-2 text-xs text-slate-500">
                            ({item.qty})
                          </span>
                        )}
                        {item.required && (
                          <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 print:bg-transparent print:text-red-700">
                            必備
                          </span>
                        )}
                        {item.tip && (
                          <p className="text-xs text-slate-500 mt-1">
                            💡 {item.tip}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate-500 print:hidden">
          ※ 本清單為通用建議，請依個人需求調整。重要證件與藥品請於出發前再次確認。
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {children}
    </div>
  );
}
