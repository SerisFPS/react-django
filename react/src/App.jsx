// import { Button } from 'semantic-ui-react'
import { Navigation } from './routes/main'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/main'
function App() {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        // hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
      />
    </AuthProvider>
  )
}

export default App
