#!/usr/bin/env python3
"""
analyze.py — Lê os CSVs gerados por measure.sh e imprime tabelas markdown
com média e desvio padrão (amostral, N-1) para cada cenário.

Uso: python3 scripts/analyze.py
     python3 scripts/analyze.py --raw      (imprime valores brutos por run)
     python3 scripts/analyze.py --no-clean (desativa remoção de outliers)
"""
import csv
import statistics
import os
import sys

RESULTS_DIR = os.path.join(os.path.dirname(__file__), "results")
SHOW_RAW   = "--raw"      in sys.argv
CLEAN      = "--no-clean" not in sys.argv


def remove_outliers_iqr(values: list[float]) -> tuple[list[float], list[float]]:
    """Remove outliers pelo método IQR (1.5×IQR fence). Devolve (clean, removed)."""
    if len(values) < 4:
        return values, []
    s = sorted(values)
    n = len(s)
    q1 = statistics.median(s[:n // 2])
    q3 = statistics.median(s[(n + 1) // 2:])
    iqr = q3 - q1
    lo, hi = q1 - 1.5 * iqr, q3 + 1.5 * iqr
    clean   = [v for v in values if lo <= v <= hi]
    removed = [v for v in values if v < lo or v > hi]
    return clean, removed

SCENARIOS = [
    ("monolith_baseline",    "Monolito — baseline",          ["build", "typecheck", "lint", "test"]),
    ("turbo_cold",           "Turborepo — cache frio",       ["build", "typecheck", "lint", "test"]),
    ("turbo_warm",           "Turborepo — cache quente",     ["build", "typecheck", "lint", "test"]),
    ("turbo_post_change",    "Turborepo — pós-alteração",    ["typecheck", "lint", "test"]),
    ("monolith_post_change", "Monolito — mesma alteração",   ["typecheck", "lint", "test"]),
    ("repack_build_isolated","Re.Pack — build isolado por mini-app", ["host", "check-in", "dashboard"]),
]


def load_csv(filename: str) -> list[dict[str, float]]:
    path = os.path.join(RESULTS_DIR, filename + ".csv")
    rows = []
    with open(path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append({k: float(v) for k, v in row.items() if k != "run"})
    return rows


def fmt_time(seconds: float) -> str:
    if seconds < 1.0:
        return f"{seconds * 1000:.0f}ms"
    return f"{seconds:.2f}s"


def fmt_cell(mean: float, sd: float) -> str:
    if mean < 1.0:
        return f"{mean * 1000:.0f}ms ± {sd * 1000:.0f}ms"
    return f"{mean:.2f}s ± {sd:.2f}s"


all_stats: dict[str, dict[str, tuple[float, float]]] = {}

for csv_name, label, commands in SCENARIOS:
    path = os.path.join(RESULTS_DIR, csv_name + ".csv")
    if not os.path.exists(path):
        print(f"> **{label}**: arquivo `{csv_name}.csv` não encontrado — pule este cenário.\n")
        continue

    rows = load_csv(csv_name)
    n_raw = len(rows)
    # Remoção por coluna: cada métrica remove só seus próprios outliers
    col_values: dict[str, list[float]] = {}
    removed_log: dict[str, list[float]] = {}

    for cmd in commands:
        raw_vals = [r[cmd] for r in rows]
        if CLEAN:
            clean, removed = remove_outliers_iqr(raw_vals)
            col_values[cmd] = clean
            if removed:
                removed_log[cmd] = removed
        else:
            col_values[cmd] = raw_vals

    n_min = min(len(v) for v in col_values.values())
    n_max = max(len(v) for v in col_values.values())
    removed_total = n_raw - n_min
    suffix = f"N={n_raw}" if not removed_log else f"N={n_raw}, até {removed_total} outlier(s) removido(s) por coluna"
    print(f"### {label} ({suffix})\n")

    if removed_log:
        for cmd, vals in removed_log.items():
            print(f"> **Outliers removidos — `{cmd}`:** {', '.join(fmt_time(v) for v in vals)}")
        print()

    print(f"| Comando | N efetivo | Média | Desvio Padrão | CV% |")
    print(f"|---------|-----------|-------|---------------|-----|")

    scenario_stats: dict[str, tuple[float, float]] = {}
    for cmd in commands:
        values = col_values[cmd]
        mean = statistics.mean(values)
        sd = statistics.stdev(values) if len(values) > 1 else 0.0
        cv = (sd / mean * 100) if mean > 0 else 0.0
        print(f"| `{cmd}` | {len(values)}/{n_raw} | {fmt_cell(mean, sd)} | {sd:.3f}s | {cv:.1f}% |")
        scenario_stats[cmd] = (mean, sd)

    all_stats[csv_name] = scenario_stats

    if SHOW_RAW:
        print(f"\n<details><summary>Valores brutos (N={n_raw})</summary>\n")
        header = "| run | " + " | ".join(commands) + " |"
        sep    = "|-----|" + "|".join(["------"] * len(commands)) + "|"
        print(header)
        print(sep)
        for r_idx, row in enumerate(rows, 1):
            vals = " | ".join(fmt_time(row[c]) for c in commands)
            print(f"| {r_idx} | {vals} |")
        print("\n</details>")

    print()

# ---------------------------------------------------------------------------
# Visão consolidada
# ---------------------------------------------------------------------------

print("---\n")
print("### Visão consolidada — média (N=10)\n")
print("```")

COL_W = 18
SCENARIO_COL_W = 28

header_labels = ["Monolito", "Turbo Frio", "Turbo Quente", "Turbo Pós"]
csv_keys      = ["monolith_baseline", "turbo_cold", "turbo_warm", "turbo_post_change"]
cmds_full     = ["build", "typecheck", "lint", "test"]

header = "".ljust(SCENARIO_COL_W) + "".join(l.ljust(COL_W) for l in header_labels)
print(header)
print("-" * len(header))

for cmd in cmds_full:
    row_str = cmd.ljust(SCENARIO_COL_W)
    for key in csv_keys:
        if key not in all_stats or cmd not in all_stats[key]:
            row_str += "—".ljust(COL_W)
        else:
            mean, sd = all_stats[key][cmd]
            row_str += fmt_time(mean).ljust(COL_W)
    print(row_str)

print("```")
