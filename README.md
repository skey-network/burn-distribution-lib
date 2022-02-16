## Burn distribution lib

### Use via terminal

```bash
# Install packages
yarn

# Edit input options
cp config.example.json config.json

# Run
npm run build && npm start
```

### Use as library

```typescript
import { calculateRatio, defaults } from 'burn-distribution-lib'

calculateRatio(defaults.mainnet).then(console.log)
```

### Expected output example

```json
{
  "eth": {
    "total": 100000000000000000,
    "burned": 0,
    "excluded": 79702930074713100,
    "circulating": 20297069925286896
  },
  "wvs": {
    "genesis": 100000000000000000,
    "current": 99997392564120000,
    "spent": 2588349480000,
    "feeSpent": 19086400000,
    "accounts": [
      {
        "address": "3K5xURMkm9sh3aQhkWC1MbsZNfiEPvsg5LD",
        "name": "master_node",
        "genesis": 1000000000000,
        "current": 1001651720000,
        "blacklisted": false,
        "spent": -1651720000
      },
      {
        "address": "3KMBki9ys6PMHUioQ3dAebG67PgVZqhpn2N",
        "name": "network",
        "genesis": 1000000000000000,
        "current": 997409998800000,
        "blacklisted": false,
        "spent": 2590001200000
      },
      {
        "address": "3KN8NoSsFXrs9pNhFfEQupje7aMxRXJtikm",
        "name": "dapp_father",
        "genesis": 48999000000000000,
        "current": 48998980913600000,
        "blacklisted": true,
        "spent": 19086400000
      },
      {
        "address": "3KJsASaS58Wzobo2WnxkxpXa6GwoEm7uPYB",
        "name": "bridge",
        "genesis": 50000000000000000,
        "current": 50000000000000000,
        "blacklisted": false,
        "spent": 0
      }
    ]
  },
  "chart": {
    "eth": {
      "burned": {
        "value": 0,
        "percent": 0
      },
      "circulating": {
        "value": 20297069925286896,
        "percent": 100
      },
      "all": {
        "value": 20297069925286896,
        "percent": 100
      }
    },
    "wvs": {
      "burned": {
        "value": 2588349480000,
        "percent": 0.0025883499740228296
      },
      "circulating": {
        "value": 99997392564120000,
        "percent": 99.99741165002598
      },
      "all": {
        "value": 99999980913600000,
        "percent": 100
      }
    }
  }
}
```
