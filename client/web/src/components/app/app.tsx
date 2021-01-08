import { Scaffolding } from "./layout/dashboard/scaffolding"
import { Root } from "./root"
import { Test } from './layout/dashboard/quote/quote_page_tester'

export function App() {
  return (
    <div className="App">
      <Root>
        <Scaffolding>
          <Test />
        </Scaffolding>
      </Root>
    </div>
  )
}
