import { EthOutput } from './EthService'
import { WvsOutput } from './WvsService'

export interface ChartValue {
  value: number
  percent: number
}

export interface ChartChainData {
  burned: ChartValue
  circulating: ChartValue
  all: ChartValue
}

export interface ChartOutput {
  eth: ChartChainData
  wvs: ChartChainData
}

export class ChartService {
  calculateChartData(eth: EthOutput, wvs: WvsOutput) {
    return {
      eth: this.calculateEth(eth),
      wvs: this.calculateWvs(wvs)
    }
  }

  private getPercent(n: number, of: number) {
    return (n / of) * 100
  }

  private calculateEth(eth: EthOutput): ChartChainData {
    const all = eth.total - eth.excluded

    return {
      burned: {
        value: eth.burned,
        percent: this.getPercent(eth.burned, all)
      },
      circulating: {
        value: eth.circulating,
        percent: this.getPercent(eth.circulating, all)
      },
      all: {
        value: all,
        percent: 100
      }
    }
  }

  private calculateWvs(wvs: WvsOutput): ChartChainData {
    const all = wvs.genesis - wvs.feeSpent

    return {
      burned: {
        value: wvs.spent,
        percent: this.getPercent(wvs.spent, all)
      },
      circulating: {
        value: all - wvs.spent,
        percent: this.getPercent(all - wvs.spent, all)
      },
      all: {
        value: all,
        percent: 100
      }
    }
  }
}
