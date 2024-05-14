import { createContext } from "react";
import { useQuery } from "react-query";

export type BookType = {
	url: string;
	title: string;
	author: string;
	rating: number;
	genre: string[];
	quantity: number;
	reviews: string;
	description: string;
};
type ContextType = {
	name: string;
	isLoading: boolean;
	error: unknown;
	data: BookType[] | null;
	booksIdArr: string[];
};

const StoreContext = createContext<ContextType>({
	name: "korebhaumik",
	isLoading: true,
	error: null,
	data: null,
	booksIdArr: [],
});

function StoreProvider({ children }: { children: JSX.Element }) {
	// const [name, setName] = useState<string>("Bhaumik");

	const {
		isLoading = true,
		error,
		data = null,
	} = useQuery<BookType[]>({
		queryKey: ["storeData"],
		queryFn: () => fetch("store.json").then((res) => res.json()),
	});

	let booksIdArr: string[] = [];
	if (data) {
		booksIdArr = data.map((book) => book.url);
	}

	return (
		<StoreContext.Provider value={{ name: "Bhaumik", isLoading, error, data, booksIdArr }}>
			{children}
		</StoreContext.Provider>
	);
}

export { StoreContext, StoreProvider };
