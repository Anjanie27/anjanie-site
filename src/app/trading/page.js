import { TradingDashboard } from "../../components/trading/trading-dashboard";

export const metadata = {
  title: "Trading Dashboard | Anjanie Sukhnandan",
  description:
    "A live intraday trading dashboard with one-minute candles, technical indicators, market gainers, and saved high/low levels.",
};

export default function TradingPage() {
  return <TradingDashboard />;
}
