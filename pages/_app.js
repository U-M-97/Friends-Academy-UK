import '../styles/globals.css'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </Provider>
      
    </div>
  
  )
}

export default MyApp
