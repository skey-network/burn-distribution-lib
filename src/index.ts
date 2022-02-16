import { readFileSync } from 'fs'
import { App, AppOptions, Output } from './App'

if (require.main === module) {
  const file = readFileSync('./config.json', 'utf-8')
  const options: AppOptions = JSON.parse(file)
  const app = new App(options)

  app.calculate().then((output) => {
    console.log(app.stringify(output, false))
  })
}

export type CalcOptions = AppOptions

export type CalcOutput = Output

export const calculateRatio = async (options: CalcOptions) => {
  const app = new App(options)
  return await app.calculate()
}

export * from './defaults'
