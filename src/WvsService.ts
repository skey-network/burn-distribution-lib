import NodeFetch from 'node-fetch'
import { IBlock } from '@waves/node-api-js/cjs/api-node/blocks'
import { GenesisTransaction } from '@waves/ts-types'
import { IBalanceDetails } from '@waves/node-api-js/cjs/api-node/addresses'

export interface Label {
  name: string
  address: string
}

export interface Account {
  address: string
  name: string
  genesis: number
  current: number
  blacklisted: boolean
  spent: number
}

export interface WvsOptions {
  nodeUrl: string
  labels?: Label[]
  blacklist?: string[]
}

export interface WvsOutput {
  genesis: number
  current: number
  spent: number
  feeSpent: number
  accounts: Account[]
}

export class WvsService {
  constructor(private options: WvsOptions) {}

  async getBlock(height: number) {
    return await this.request<IBlock>(`/blocks/at/${height}`)
  }

  async getGenesisTxes(): Promise<GenesisTransaction<number>[]> {
    const block = await this.getBlock(1)
    const txes = block.transactions.filter((tx) => tx.type === 1)
    return txes as any
  }

  async getBalance(address: string) {
    const data = await this.request<IBalanceDetails<number>>(
      `/addresses/balance/details/${address}`
    )

    return data.available
  }

  private sumValues(accounts: Account[], key: 'genesis' | 'current' | 'spent') {
    return accounts.reduce((acc, curr) => acc + curr[key], 0)
  }

  async getAccounts(): Promise<Account[]> {
    const blacklist = this.options.blacklist ?? []
    const txes = await this.getGenesisTxes()

    return await Promise.all(
      txes.map(async (tx) => {
        const current = await this.getBalance(tx.recipient)

        return {
          address: tx.recipient,
          name: this.getLabel(tx.recipient),
          genesis: tx.amount,
          current,
          blacklisted: blacklist.includes(tx.recipient),
          spent: tx.amount - current
        }
      })
    )
  }

  async getBurnRatio(): Promise<WvsOutput> {
    const accounts = await this.getAccounts()
    const whitelisted = accounts.filter((acc) => !acc.blacklisted)
    const blacklisted = accounts.filter((acc) => acc.blacklisted)

    const genesis = this.sumValues(accounts, 'genesis')
    const current = this.sumValues(accounts, 'current')
    const spent = this.sumValues(whitelisted, 'spent')
    const feeSpent = this.sumValues(blacklisted, 'spent')

    return { genesis, current, spent, feeSpent, accounts }
  }

  private getLabel(address: string) {
    const labels = this.options.labels ?? []

    return labels.find((label) => label.address === address)?.name ?? 'unknown'
  }

  private async request<T = any>(path: string) {
    const res = await this.fetch(this.options.nodeUrl + path)
    return (await res.json()) as T
  }

  private get fetch() {
    if (globalThis.fetch) return globalThis.fetch.bind(globalThis)

    return NodeFetch
  }
}
