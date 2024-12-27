import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { SocketContextProvider } from './context/SocketContext.tsx';
import store, { persistor } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<SocketContextProvider>
				<App />
			</SocketContextProvider>
		</PersistGate>
	</Provider>
);
