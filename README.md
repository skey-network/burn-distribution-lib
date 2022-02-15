## Burn distribution lib

### Use via terminal

```bash
# Install packages
yarn

# Edit input options
cp config.example.json config.json

npm start
```

#### TODO

```typescript
const options: Options = {
  eth: {
    rpcUrl: 'https://mainnet.infura.io/v3/********************************',
    tokenAddress: '0x06A01a4d579479Dd5D884EBf61A31727A3d8D442'
  },
  wvs: {
    // Node url address
    nodeUrl: 'https://master.nodes.skey.network',
    // List of addresses to skip when calculating spent value
    blacklist: ['3KN8NoSsFXrs9pNhFfEQupje7aMxRXJtikm'],
    // Labels will be used for descriptions only
    // They do not affect calculations and are optional
    labels: [
      { name: 'master_node', address: '3K5xURMkm9sh3aQhkWC1MbsZNfiEPvsg5LD' },
      { name: 'network', address: '3KMBki9ys6PMHUioQ3dAebG67PgVZqhpn2N' },
      { name: 'dapp_father', address: '3KN8NoSsFXrs9pNhFfEQupje7aMxRXJtikm' },
      { name: 'bridge', address: '3KJsASaS58Wzobo2WnxkxpXa6GwoEm7uPYB' }
    ]
  }
}
```
