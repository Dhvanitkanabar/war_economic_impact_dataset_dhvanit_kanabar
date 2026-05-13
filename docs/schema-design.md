# Schema Design (Mongoose)

## User Schema
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
}
```

## Conflict Schema
```javascript
{
  name: { type: String, required: true, unique: true },
  region: { type: String, required: true },
  countries: [{ type: String }],
  type: { type: String, enum: ['Civil War', 'Interstate', 'Invasion', 'Terrorism'], required: true },
  status: { type: String, enum: ['Ongoing', 'Resolved', 'Frozen'], default: 'Ongoing' },
  timeline: {
    startYear: { type: Number, required: true },
    endYear: { type: Number }
  },
  economicMetrics: {
    gdpLoss: { type: Number },
    inflationRate: { type: Number },
    reconstructionCost: { type: Number },
    currencyDevaluation: { type: Number }
  },
  socialMetrics: {
    povertyRate: { type: Number },
    unemploymentRate: { type: Number },
    foodInsecurityIndex: { type: Number }
  },
  sectorImpact: [{ type: String }],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}
```
