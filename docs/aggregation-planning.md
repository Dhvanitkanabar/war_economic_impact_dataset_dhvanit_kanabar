# Aggregation Planning

## 1. Global Economic Summary
**Goal**: Calculate total estimated reconstruction costs and average GDP loss across all recorded conflicts.
**Pipeline**: `MATCH` (all) -> `GROUP` (null) -> `SUM` (reconstructionCost), `AVG` (gdpLoss).

## 2. Regional Inflation Heatmap
**Goal**: Identify regions with the most volatile price spikes.
**Pipeline**: `GROUP` (region) -> `AVG` (inflationRate) -> `SORT` (descending).

## 3. Conflict Type Distribution
**Goal**: See which types of conflicts are most common in the dataset.
**Pipeline**: `GROUP` (type) -> `COUNT` -> `SORT` (count: -1).

## 4. Top 5 Reconstruction Costs
**Goal**: List the most expensive conflicts in terms of capital required for recovery.
**Pipeline**: `SORT` (reconstructionCost: -1) -> `LIMIT` (5) -> `PROJECT` (name, reconstructionCost).
