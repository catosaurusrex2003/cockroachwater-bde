import axios from "axios";
import { useEffect, useState } from "react";
import RecomCard from "./recomCard";
import { BookType } from "./card";
import data from "../../public/store.json";

type Props = {};

export default function RecomContainer({}: Props) {
	const [latestRecom, setLatestRecom] = useState<{ user_not_found: string } | any>([]);
	const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

	const get_user_recom = async () => {
		// console.log("meow");
		const result = await axios.post("http://127.0.0.1:8000/get_user_recom", {
			user_id: parseInt(localStorage.getItem("user_id") || "21"),
		});
		console.log("getting latest recomendation: ", result.data);
		if (result.data?.recommended_books?.length > 0) {
			const dummyBooksData = result.data?.recommended_books.map((a: string, index: number) => {
				const getUrlByTitle = (title: string): string | undefined => {
					const book = data?.find((book) => book.title === a);
					return book ? book.url : undefined;
				};

				const newUrl = getUrlByTitle("Warriors of Past");

				return {
					url: newUrl,
					title: a,
					author: "Mia Yoshida",
					rating: 4.9,
					genre: ["thriller", "mystery"],
					quantity: 100,
					reviews: "",
					description: "Lorem",
				};
			});

			// setLatestRecom(result.data);
			setLatestRecom(dummyBooksData);
		} else {
			setLatestRecom([]);
		}
	};

	useEffect(() => {
		console.log("Polling Started");
		const id = setInterval(async () => {
			await get_user_recom();
		}, 2000);
		setIntervalId(id);
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, []);

	return (
		<div>
			<div className="flex ">
				{latestRecom.length > 0 && latestRecom[0] ? (
					<div className="flex gap-7 items-center w-full">
						{latestRecom.map((book: BookType) => {
							return <RecomCard book={book} key={Math.random()} />;
						})}
					</div>
				) : (
					<div>
						<p className=" text-center">
							You have no Interactions with our Ecommerce. Please Simulate an interaction to be
							ablke to se your recomendations
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
