"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CITIES,
  formatOffsetDiff,
  formatTimeAt,
  getOffsetMinutes,
} from "@/lib/timezone";

const FAVORITES = ["東京", "首爾", "曼谷", "新加坡", "香港", "倫敦", "巴黎", "紐約", "洛杉磯", "雪梨"];

export default function TimezoneClient() {
  const [now, setNow] = useState(() => new Date());
  const [sourceCity, setSourceCity] = useState("台北");
  const [targetCity, setTargetCity] = useState("東京");
  const [customTime, setCustomTime] = useState("");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const at = useMemo(() => {
    if (!customTime) return now;
    const parsed = new Date(customTime);
    return isNaN(parsed.getTime()) ? now : parsed;
  }, [customTime, now]);

  const source = CITIES.find((c) => c.city === sourceCity) ?? CITIES[0];
  const target = CITIES.find((c) => c.city === targetCity) ?? CITIES[1];

  const sourceOffset = getOffsetMinutes(source.tz, at);
  const targetOffset = getOffsetMinutes(target.tz, at);
  const diff = targetOffset - sourceOffset;

  const favoriteRows = FAVORITES.map((name) => CITIES.find((c) => c.city === name))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500 mb-2">來源城市（你目前在）</p>
          <select
            value={sourceCity}
            onChange={(e) => setSourceCity(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2 mb-3"
          >
            {CITIES.map((c) => (
              <option key={c.city} value={c.city}>
                {c.flag} {c.city}（{c.country}）
              </option>
            ))}
          </select>
          <div className="text-3xl font-mono font-semibold">
            {formatTimeAt(source.tz, at)}
          </div>
        </div>

        <div className="p-5 border border-blue-200 bg-blue-50 rounded-lg">
          <p className="text-xs text-slate-500 mb-2">目標城市（你要去）</p>
          <select
            value={targetCity}
            onChange={(e) => setTargetCity(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2 mb-3 bg-white"
          >
            {CITIES.map((c) => (
              <option key={c.city} value={c.city}>
                {c.flag} {c.city}（{c.country}）
              </option>
            ))}
          </select>
          <div className="text-3xl font-mono font-semibold text-blue-900">
            {formatTimeAt(target.tz, at)}
          </div>
        </div>
      </div>

      <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">{target.city} 比 {source.city}</p>
        <p className="text-3xl font-bold">
          {diff === 0 ? "時間相同" : formatOffsetDiff(diff)}
        </p>
      </div>

      <div className="p-5 border border-slate-200 rounded-lg">
        <p className="text-sm font-medium mb-2">特定時間換算</p>
        <p className="text-xs text-slate-500 mb-3">
          想知道台北早上 9:00 時，目標城市是幾點？選一個時間：
        </p>
        <div className="flex items-center gap-2">
          <input
            type="datetime-local"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2 text-sm"
          />
          {customTime && (
            <button
              onClick={() => setCustomTime("")}
              className="text-sm text-slate-500 hover:text-slate-900 px-2"
            >
              清除（用現在時間）
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">與台北的時差速查（熱門城市）</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {favoriteRows.map((c) => {
            const taipeiOffset = getOffsetMinutes("Asia/Taipei", at);
            const cOffset = getOffsetMinutes(c.tz, at);
            const d = cOffset - taipeiOffset;
            return (
              <button
                key={c.city}
                onClick={() => setTargetCity(c.city)}
                className="text-left p-3 border border-slate-200 rounded hover:border-blue-400 transition"
              >
                <div className="text-sm font-medium">
                  {c.flag} {c.city}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {d === 0 ? "相同" : formatOffsetDiff(d)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        ※ 自動處理日光節約時間（DST）。若計算結果有疑問，請以航空公司或當地公告為準。
      </p>
    </div>
  );
}
