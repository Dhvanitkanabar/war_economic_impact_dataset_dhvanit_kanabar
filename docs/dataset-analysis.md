# Dataset Analysis

---

## Dataset Overview

| Property        | Detail                                          |
| :-------------- | :---------------------------------------------- |
| **Project Name**   | WarLens — War Economic Impact Tracker         |
| **Dataset Name**   | war_economic_impact_dataset                   |
| **Repository**     | war_economic_impact_dataset_dhvanit_kanabar   |
| **Dataset File**   | war_economic_impact_dataset.json              |
| **Format**         | JSON Array                                    |

### Dataset Purpose

This dataset documents the **economic, employment, poverty, and black-market impact** of major armed conflicts around the world. Each record represents a data observation for a specific conflict and country, capturing pre-war baselines alongside wartime metrics. The dataset is designed to support comparative analysis across conflicts, regions, time periods, and economic indicators.

---

## Main Entity

> **Conflict**

The primary entity is a **Conflict** — a specific armed conflict occurring in a primary country, recorded with detailed economic and social impact data. Multiple records can exist for the same conflict name (representing different countries involved, or different observation snapshots).

---

## Important Fields

The following fields are present in **every record** of the dataset:

| Field                                  | Description                                         |
| :------------------------------------- | :-------------------------------------------------- |
| `Conflict_Name`                        | Name of the conflict (e.g., "Russia-Ukraine War")   |
| `Conflict_Type`                        | Category of war                                     |
| `Region`                               | Geographic region of the conflict                   |
| `Start_Year`                           | Year the conflict began                             |
| `End_Year`                             | Year the conflict ended or projected end            |
| `Status`                               | Current status (Ongoing / Resolved)                 |
| `Primary_Country`                      | The main country affected by this record            |
| `Pre_War_Unemployment_%`               | Unemployment rate before the conflict               |
| `During_War_Unemployment_%`            | Unemployment rate during the conflict               |
| `Unemployment_Spike_Percentage_Points` | Increase in unemployment (during minus pre)         |
| `Most_Affected_Sector`                 | Economic sector most disrupted                      |
| `Youth_Unemployment_Change_%`          | Change in youth unemployment during the conflict    |
| `Pre_War_Poverty_Rate_%`               | Poverty rate before the conflict                    |
| `During_War_Poverty_Rate_%`            | Poverty rate during the conflict                    |
| `Extreme_Poverty_Rate_%`               | Extreme poverty rate during the conflict            |
| `Food_Insecurity_Rate_%`               | Food insecurity rate during the conflict            |
| `Households_Fallen_Into_Poverty_Estimate` | Estimated number of households newly in poverty  |
| `GDP_Change_%`                         | Percentage change in GDP (typically negative)       |
| `Inflation_Rate_%`                     | Annual inflation rate during the conflict           |
| `Currency_Devaluation_%`               | Currency devaluation percentage                     |
| `Cost_of_War_USD`                      | Estimated total cost of war in USD                  |
| `Estimated_Reconstruction_Cost_USD`    | Estimated post-war reconstruction cost in USD       |
| `Informal_Economy_Size_Pre_War_%`      | Size of informal economy before the conflict        |
| `Informal_Economy_Size_During_War_%`   | Size of informal economy during the conflict        |
| `Black_Market_Activity_Level`          | Categorical level of black market activity          |
| `Primary_Black_Market_Goods`           | Comma-separated list of primary black market goods  |
| `Currency_Black_Market_Rate_Gap_%`     | Gap between official and black market currency rate |
| `War_Profiteering_Documented`          | Whether war profiteering was documented (Yes / No)  |

---

## Field Categories

### General Information

Fields that identify and classify each conflict record.

| Field             | Example Values                                                    |
| :---------------- | :---------------------------------------------------------------- |
| `Conflict_Name`   | WWII (Japan), Syrian Civil War, Russia-Ukraine War, Iraq War …    |
| `Conflict_Type`   | World War, Civil War, Interstate War, Asymmetric War, Interstate/Counter-insurgency |
| `Region`          | East Asia, Middle East, Europe, Africa, South Asia                |
| `Start_Year`      | 1939, 1996, 2001, 2003, 2011, 2015, 2020, 2022, 2023, 2025       |
| `End_Year`        | 1945, 2011, 2021, 2022, 2026                                      |
| `Status`          | Ongoing, Resolved                                                 |
| `Primary_Country` | Japan, Germany, Syria, Ukraine, Russia, Afghanistan, Iraq, Yemen, DRC, Ethiopia, Palestine (Gaza), Israel, Iran |

---

### Economic Impact

Fields capturing macroeconomic deterioration caused by conflict.

| Field                               | Type    | Notes                          |
| :---------------------------------- | :------ | :----------------------------- |
| `GDP_Change_%`                      | Number  | Negative values (GDP decline)  |
| `Inflation_Rate_%`                  | Number  | Positive; can exceed 100%      |
| `Currency_Devaluation_%`            | Number  | Positive percentage            |
| `Cost_of_War_USD`                   | Number  | Large integers (USD)           |
| `Estimated_Reconstruction_Cost_USD` | Number  | Large integers (USD)           |
| `Informal_Economy_Size_Pre_War_%`   | Number  | Pre-war baseline percentage    |
| `Informal_Economy_Size_During_War_%`| Number  | Wartime percentage (max ~90%)  |

---

### Employment Impact

Fields capturing workforce disruption during conflict.

| Field                                  | Type   | Notes                             |
| :------------------------------------- | :----- | :-------------------------------- |
| `Pre_War_Unemployment_%`               | Number | Pre-conflict baseline             |
| `During_War_Unemployment_%`            | Number | Wartime rate; can reach ~70%      |
| `Unemployment_Spike_Percentage_Points` | Number | Derived field (during − pre)      |
| `Youth_Unemployment_Change_%`          | Number | Youth-specific change             |
| `Most_Affected_Sector`                 | String | Categorical — sector name         |

---

### Poverty Impact

Fields capturing poverty and food security deterioration.

| Field                                     | Type   | Notes                              |
| :---------------------------------------- | :----- | :--------------------------------- |
| `Pre_War_Poverty_Rate_%`                  | Number | Pre-conflict poverty baseline      |
| `During_War_Poverty_Rate_%`               | Number | Wartime poverty rate               |
| `Extreme_Poverty_Rate_%`                  | Number | Subset of wartime poverty          |
| `Food_Insecurity_Rate_%`                  | Number | Population facing food insecurity  |
| `Households_Fallen_Into_Poverty_Estimate` | Number | Absolute household count           |

---

### Black Market Impact

Fields capturing informal and illegal economic activity.

| Field                           | Type    | Notes                                  |
| :------------------------------ | :------ | :------------------------------------- |
| `Black_Market_Activity_Level`   | String  | Enum: Low / Moderate / High / Dominant |
| `Primary_Black_Market_Goods`    | String  | Comma-separated list of goods          |
| `Currency_Black_Market_Rate_Gap_%` | Number | % gap vs official rate              |
| `War_Profiteering_Documented`   | String  | Enum: Yes / No                         |

---

## Planned Main Collection

> **`conflicts`**

All records from the dataset map to a single MongoDB collection named **`conflicts`**.

---

## Repeated Values & Patterns

### Conflict Names (repeated across multiple records)

The same `Conflict_Name` appears multiple times, representing:
- Different countries involved in the same conflict
- Multiple observation snapshots for the same country

| Conflict Name              | Observed Countries                            |
| :------------------------- | :-------------------------------------------- |
| WWII (Japan)               | Japan                                         |
| WWII (Germany)             | Germany                                       |
| Russia-Ukraine War         | Ukraine, Russia                               |
| Syrian Civil War           | Syria                                         |
| Afghanistan War            | Afghanistan                                   |
| Iraq War                   | Iraq                                          |
| Yemen Civil War            | Yemen                                         |
| Israel-Hamas War           | Palestine (Gaza), Israel                      |
| Israel-Iran War            | Israel, Iran                                  |
| DRC Conflict               | DRC                                           |
| Tigray Conflict            | Ethiopia                                      |

---

### Most Affected Sectors (observed values)

| Sector          |
| :-------------- |
| Agriculture     |
| Construction    |
| Energy          |
| Manufacturing   |
| Services        |
| Tourism         |

---

### Primary Black Market Goods (observed values)

Goods appear as comma-separated strings. Individual goods observed:

| Good       |
| :--------- |
| food       |
| fuel       |
| currency   |
| medicine   |
| water      |
| weapons    |

---

### Numeric Field Ranges (observed from dataset)

| Field                                     | Min Observed   | Max Observed    |
| :---------------------------------------- | :------------- | :-------------- |
| `Start_Year`                              | 1939           | 2025            |
| `End_Year`                                | 1945           | 2026            |
| `GDP_Change_%`                            | -84.86         | -5.12           |
| `Inflation_Rate_%`                        | 3.48           | 138.9           |
| `Currency_Devaluation_%`                  | 3.85           | 255.54          |
| `Pre_War_Unemployment_%`                  | 3.2            | 14.95           |
| `During_War_Unemployment_%`               | 4.71           | 69.42           |
| `Unemployment_Spike_Percentage_Points`    | 0.65           | 56.37           |
| `Youth_Unemployment_Change_%`             | 0.93           | 70.87           |
| `Pre_War_Poverty_Rate_%`                  | 5.02           | 29.87           |
| `During_War_Poverty_Rate_%`               | 8.82           | 79.03           |
| `Extreme_Poverty_Rate_%`                  | 3.73           | 51.32           |
| `Food_Insecurity_Rate_%`                  | 5.04           | 63.6            |
| `Households_Fallen_Into_Poverty_Estimate` | 512            | 1,679,998       |
| `Cost_of_War_USD`                         | 4,202,096,306  | 497,726,236,064 |
| `Estimated_Reconstruction_Cost_USD`       | 8,665,001,497  | 1,813,437,924,274 |
| `Informal_Economy_Size_Pre_War_%`         | 10.11          | 39.65           |
| `Informal_Economy_Size_During_War_%`      | 15.12          | 90.0            |
| `Currency_Black_Market_Rate_Gap_%`        | 0.75           | 485.82          |

---

> [!NOTE]
> All numeric fields in the raw dataset are stored as **strings** in the JSON file. They must be cast to `Number` types during schema validation and data ingestion.

---

## Field Relationships

| Derived / Related Fields                            | Relationship                                                           |
| :-------------------------------------------------- | :--------------------------------------------------------------------- |
| `During_War_Unemployment_%` − `Pre_War_Unemployment_%` | Equals `Unemployment_Spike_Percentage_Points`                       |
| `During_War_Poverty_Rate_%` > `Pre_War_Poverty_Rate_%`  | Consistently true across all records                                |
| `Informal_Economy_Size_During_War_%` > `Informal_Economy_Size_Pre_War_%` | Informal economy always grows during war             |
| `Conflict_Name` + `Primary_Country`                 | Together form a logical compound identifier for each conflict-country pair |
| `Start_Year` / `End_Year` + `Status`                | If `Status = Ongoing`, `End_Year` is a projected year (e.g., 2026)     |
| `Black_Market_Activity_Level` ↔ `Currency_Black_Market_Rate_Gap_%` | Higher activity level generally correlates with a larger gap |
| `Primary_Black_Market_Goods` ↔ `Black_Market_Activity_Level`       | More diverse goods listed when activity is High or Dominant |
