import React, { Suspense } from "react";

const WeatherWidget = React.lazy(() => import("weather/Widget"));
const CounterWidget = React.lazy(() => import("counter/Widget"));

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Microfrontend Dashboard</h1>
        <span style={styles.subtitle}>
          Module Federation • Vite • React
        </span>
      </header>

      <main style={styles.grid}>
        <Suspense fallback={<CardSkeleton title="Weather" />}>
          <WidgetCard title="Weather">
            <WeatherWidget />
          </WidgetCard>
        </Suspense>

        <Suspense fallback={<CardSkeleton title="Counter" />}>
          <WidgetCard title="Counter">
            <CounterWidget />
          </WidgetCard>
        </Suspense>
      </main>
    </div>
  );
}

function WidgetCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.card}>
      <h2 style={styles.cardTitle}>{title}</h2>
      {children}
    </section>
  );
}

function CardSkeleton({ title }: { title: string }) {
  return (
    <section style={{ ...styles.card, opacity: 0.6 }}>
      <h2 style={styles.cardTitle}>{title}</h2>
      <p>Loading widget...</p>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    fontFamily: "Inter, system-ui, sans-serif",
    padding: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 600,
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: 500,
  },
};
