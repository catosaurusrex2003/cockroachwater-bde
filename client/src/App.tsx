// import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import Store from "./pages/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { StoreProvider } from "./context/Store.context";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<StoreProvider>
				<>
					<Store />
				</>
			</StoreProvider>
		</QueryClientProvider>
	);
}

export default App;
