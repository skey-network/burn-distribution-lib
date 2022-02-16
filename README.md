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
    "current": 99997393147400000,
    "spent": 2588373200000,
    "accounts": [
      {
        "address": "3K5xURMkm9sh3aQhkWC1MbsZNfiEPvsg5LD",
        "name": "master_node",
        "genesis": 1000000000000,
        "current": 1001628000000,
        "blacklisted": false,
        "spent": -1628000000
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
        "current": 48998981520600000,
        "blacklisted": true,
        "spent": 18479400000
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
  }
}
```
