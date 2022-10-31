import '../styles/globals.css'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import {store, persistor} from '../redux/store';
import { PersistGate } from "redux-persist/integration/react"
import "../style.css"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </PersistGate>
      </Provider>
      
    </div>
  
  )
}

export default MyApp
