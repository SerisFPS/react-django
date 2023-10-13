// import { Button } from 'semantic-ui-react'
import { Navigation } from './routes/main'
import { ClientLayout } from './layouts/main'

function App() {
  return (
    <ClientLayout>
      <h1>Hello World!</h1>
      <Navigation />
    </ClientLayout>
  )
}

export default App
