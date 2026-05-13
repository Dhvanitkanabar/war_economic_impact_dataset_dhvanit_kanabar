# Dataset Analysis: war_economic_impact_dataset

## Overview
The dataset provides a comprehensive look at the economic consequences of global conflicts. It includes quantitative metrics for GDP, inflation, and reconstruction, alongside qualitative indicators for sector impact and social stability.

## Key Fields
- `conflict_name`: Name of the war/conflict.
- `region`: Geographical area (e.g., Middle East, Eastern Europe).
- `country`: Primary countries involved.
- `start_year` / `end_year`: Duration of the conflict.
- `gdp_loss_percentage`: Annualized impact on national production.
- `inflation_rate`: Maximum spike in consumer prices.
- `poverty_rate_increase`: Delta in poverty levels.
- `unemployment_impact`: Percentage increase in jobless claims.
- `reconstruction_cost_est`: Estimated billions (USD) for recovery.
- `food_insecurity_index`: 0-100 scale of availability.
- `currency_devaluation`: Percentage drop in local currency value vs. USD.
- `sector_impact`: Key sectors affected (Agriculture, Tourism, Infrastructure).

## Data Integrity Notes
- Historical data (WWII) may have interpolated values for modern metrics like specific food insecurity indices.
- Ongoing conflicts (Russia-Ukraine) require periodic updates to economic projections.
