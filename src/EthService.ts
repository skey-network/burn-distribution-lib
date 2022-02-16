import { BigNumber, ethers } from 'ethers'
import { Token__factory } from '../typechain/factories/Token__factory'
import { Token } from '../typechain/Token'

export interface EthOptions {
  rpcUrl: string
  tokenAddress: string
  excluded?: string[]
}

export interface EthOutput {
  total: number
  burned: number
  excluded: number
  circulating: number
}

export class EthService {
  private token: Token
  private provider: ethers.providers.JsonRpcProvider

  constructor(private options: EthOptions) {
    this.provider = new ethers.providers.JsonRpcProvider(options.rpcUrl)
    this.token = Token__factory.connect(options.tokenAddress, this.provider)
  }

  public async getBurnRatio(): Promise<EthOutput> {
    const total = await this.token.totalSupply()
    const burned = await this.token.balanceOf(ethers.constants.AddressZero)
    const excluded = await this.excludedBalance()
    const circulating = total.sub(burned).sub(excluded)

    return {
      total: Number(total.toString()),
      burned: Number(burned.toString()),
      excluded: Number(excluded.toString()),
      circulating: Number(circulating.toString())
    }
  }

  private async excludedBalance() {
    const excluded = this.options.excluded ?? []

    const balances = await Promise.all(
      excluded.map((address) => this.token.balanceOf(address))
    )

    return balances.reduce((acc, curr) => acc.add(curr), BigNumber.from(0))
  }
}
