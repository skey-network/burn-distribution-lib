import { ChartOutput, ChartService } from './ChartService'
import { EthOptions, EthOutput, EthService } from './EthService'
import { WvsOptions, WvsOutput, WvsService } from './WvsService'

export interface AppOptions {
  eth: EthOptions
  wvs: WvsOptions
}

export interface Output {
  eth: EthOutput
  wvs: WvsOutput
  chart: ChartOutput
}

export class App {
  private eth: EthService
  private wvs: WvsService
  private chart: ChartService

  constructor(options: AppOptions) {
    this.eth = new EthService(options.eth)
    this.wvs = new WvsService(options.wvs)
    this.chart = new ChartService()
  }

  async calculate(): Promise<Output> {
    const eth = await this.eth.getBurnRatio()
    const wvs = await this.wvs.getBurnRatio()
    const chart = this.chart.calculateChartData(eth, wvs)

    return { eth, wvs, chart }
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
