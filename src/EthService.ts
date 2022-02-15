import { ethers } from 'ethers'
import { Token__factory } from '../typechain/factories/Token__factory'
import { Token } from '../typechain/Token'

export interface EthOptions {
  rpcUrl: string
  tokenAddress: string
}

export interface EthOutput {
  total: number
  burned: number
  circulating: number
}

export class EthService {
  private token: Token
  private provider: ethers.providers.JsonRpcProvider

  constructor(options: EthOptions) {
    this.provider = new ethers.providers.JsonRpcProvider(options.rpcUrl)
    this.token = Token__factory.connect(options.tokenAddress, this.provider)
  }

  public async getBurnRatio(): Promise<EthOutput> {
    const total = await this.token.totalSupply()
    const burned = await this.token.balanceOf(ethers.constants.AddressZero)
    const circulating = total.sub(burned)

    return {
      total: Number(total.toString()),
      burned: Number(burned.toString()),
      circulating: Number(circulating.toString())
    }
  }
}
