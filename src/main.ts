import { readFileSync } from 'fs'
import { App, AppOptions } from './App'

if (require.main === module) {
  const file = readFileSync('./config.json', 'utf-8')
  const options: AppOptions = JSON.parse(file)
  const app = new App(options)

  app.calculate().then((output) => {
    console.log(app.stringify(output, true))
  })
}

export { App, AppOptions }
