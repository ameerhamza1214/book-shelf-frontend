import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {

  // <ToastContainer />
  // < NotificationContainer />
  
  
   return ( <><Component {...pageProps} /><ToastContainer /></>)


}
