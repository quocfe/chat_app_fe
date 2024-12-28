import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
} from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { RootState } from '../redux/reducer';

interface SocketContextValues {
	socket: null;
	onlineUsers: any[];
}

// Create context
const SocketContext = createContext<SocketContextValues | undefined>(undefined);

export const useSocketContext = () => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error(
			'useSocketContext must be used within a SocketContextProvider'
		);
	}
	return context;
};

interface SocketContextProviderProps {
	children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
	children,
}) => {
	const [socket, setSocket] = useState<any>(null);
	const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
	const authUser = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (authUser?._id) {
			const newSocket = io('https://chat-app-be-17fu.onrender.com', {
				query: {
					userId: authUser._id,
				},
			});
			// ok
			setSocket(newSocket);

			newSocket.on('getOnlineUsers', (users: any) => {
				setOnlineUsers(users);
			});

			return () => {
				newSocket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
