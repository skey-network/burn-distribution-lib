import { EthOptions, EthOutput, EthService } from './EthService'
import { WvsOptions, WvsOutput, WvsService } from './WvsService'

export interface AppOptions {
  eth: EthOptions
  wvs: WvsOptions
}

export interface Output {
  eth: EthOutput
  wvs: WvsOutput
}

export class App {
  private eth: EthService
  private wvs: WvsService

  constructor(options: AppOptions) {
    this.eth = new EthService(options.eth)
    this.wvs = new WvsService(options.wvs)
  }

  async calculate(): Promise<Output> {
    return {
      eth: await this.eth.getBurnRatio(),
      wvs: await this.wvs.getBurnRatio()
    }
  }

  stringify(obj: Output, pretty: boolean) {
    return JSON.stringify(obj, this.getReplacer(pretty) as any, 2)
  }

  private getReplacer(pretty: boolean) {
    if (!pretty) return null

    return (_: string, value: any) => {
      if (typeof value === 'number') {
        return (value / 10 ** 8).toFixed(2)
      }

      return value
    }
  }
}
