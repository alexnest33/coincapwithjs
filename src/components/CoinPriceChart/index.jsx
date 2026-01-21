import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
   Area,
   AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { coinHistory, coinsHistory } from "../../redux/slicers/historyOfCoins";
import { intervals } from "../../utils/chartIntervals";


  
  const CoinPriceChart = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const  history  = useSelector(coinHistory);
  
    const [activeInterval, setActiveInterval] = useState(intervals[0]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const now = Date.now();
      let start;
  
      if (activeInterval.range !== "all") {
        start = now - activeInterval.range * 24 * 60 * 60 * 1000;
      }
  
      setIsLoading(true);
      dispatch(
        coinsHistory({
          slug,
          interval: activeInterval.value,
          start,
          end: now,
        })
      ).finally(() => setIsLoading(false));
    }, [dispatch, slug, activeInterval]);
  
    const data = useMemo(
      () =>
        history?.map((p) => ({
          date:
            activeInterval.range === 1
              ? new Date(p.time).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : new Date(p.time).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "short",
                  year: activeInterval.range === "all" ? "2-digit" : undefined,
                }),
          price: parseFloat(p.priceUsd),
        })) || [],
      [history, activeInterval]
    );
  
    if (!data.length) return <p className="no-data">Нет данных для графика</p>;
  
    return (
      <div className="coin-chart-wrapper light">
        <div className="coin-chart-header">
          <h3 className="coin-chart-title">Динамика цены</h3>
  
          <div className="chart-intervals">
            {intervals.map((intv) => (
              <button
                key={intv.label}
                className={`interval-btn ${
                  activeInterval.label === intv.label ? "active" : ""
                }`}
                onClick={() => setActiveInterval(intv)}
              >
                {intv.label}
              </button>
            ))}
          </div>
        </div>
  
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff00aa" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#ff99cc" stopOpacity={0.05} />
              </linearGradient>
            </defs>
  
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#777", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              tick={{ fill: "#777", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid #ffb3e0",
                borderRadius: "6px",
                color: "#222",
              }}
              labelStyle={{ color: "#ff00aa", fontWeight: 500 }}
              formatter={(val) => [`$${parseFloat(val).toFixed(2)}`, "Цена"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#ff00aa"
              strokeWidth={2.5}
              fill="url(#colorPrice)"
              isAnimationActive={!isLoading}
              animationDuration={900}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };


export default CoinPriceChart;
