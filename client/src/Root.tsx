import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner';
import Header from './components/layouts/Header';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios';
import { persistor, store } from './store';
const queryClient = new QueryClient()
import { Provider } from 'react-redux'
axios.defaults.withCredentials = true
export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <HelmetProvider>
                        <Toaster richColors />
                        <Header />
                        <Outlet />
                    </HelmetProvider>
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    )
}


