import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type eachdocument = {
	user_id?: number;
	book_id?: number;
	clicks?: number;
	ratings?: number;
	likes?: number;
	orders?: number;
};

function Home() {
	const [data, setData] = useState<eachdocument>({});
	const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
	const [latestRecom, setLatestRecom] = useState<{ user_not_found: string } | any>();
	const userIdRef = useRef<number>();

	const sendData = async () => {
		try {
			const response = await axios.post("http://127.0.0.1:8000/produce_spark", [
				{
					user_id: data.user_id,
					book_id: data?.book_id,
					clicks: data?.clicks,
					ratings: data?.ratings,
					likes: data?.likes,
					orders: data?.orders,
				},
			]);
			console.log(response.data);
			toast.success("server recieved");
		} catch (err) {
			console.log(err);
		}
	};

	const handleInputChange = (str: string, value: string) => {
		setData((prev) => ({ ...prev, [str]: parseInt(value) } as eachdocument));
	};

	const get_user_recom = async () => {
		// console.log("meow");
		if (!userIdRef.current) return;
		console.log("getting latest recomendation");
		const result = await axios.post("http://127.0.0.1:8000/get_user_recom", {
			user_id: userIdRef.current,
		});
		console.log(result.data);
		if (result.data?.recommended_books?.length > 0) {
			setLatestRecom(result.data);
		} else {
			setLatestRecom(undefined);
		}
	};

	useEffect(() => {
		console.log("bhau");
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

	useEffect(() => {
		userIdRef.current = data?.user_id;
	}, [data]);

	return (
		<div>
			<h1 className="text-2xl mx-4 mt-5">Ecommerce Content Based Recommendation System</h1>
			<div className="flex flex-col mx-auto mt-20 rounded-sm p-5 gap-3">
				{/* <div className="flex flex-col mx-auto mt-20 bg-gray-100 border border-gray-300 rounded-sm p-5 gap-3"> */}
				<div className="flex justify-between items-center gap-1 w-full">
					<span>User_id</span>
					<input
						onChange={(e) => handleInputChange("user_id", e.target.value)}
						className="w-1/2 border-gray-300 border rounded-sm p-2 px-2"
					/>
				</div>
				{/* <hr /> */}
				<div className="flex justify-between items-center gap-1 w-full">
					<span>Book_id</span>
					<input
						onChange={(e) => handleInputChange("book_id", e.target.value)}
						className="w-1/2 border-gray-300 border rounded-sm p-2 px-2"
					/>
				</div>
				{/* <hr /> */}
				<div className="flex justify-between items-center gap-1 w-full">
					<span>Likes</span>
					<input
						onChange={(e) => handleInputChange("likes", e.target.value)}
						className="w-1/2 border-gray-300 border rounded-sm p-2 px-2"
					/>
				</div>
				{/* <hr /> */}
				<div className="flex justify-between items-center gap-1 w-full">
					<span>Rating</span>
					<input
						onChange={(e) => handleInputChange("ratings", e.target.value)}
						className="w-1/2 border-gray-300 border rounded-sm p-2 px-2"
					/>
				</div>
				{/* <hr /> */}
				<div className="flex justify-between items-center gap-1 w-full">
					<span>Clicks</span>
					<input
						onChange={(e) => handleInputChange("clicks", e.target.value)}
						className="w-1/2 border-gray-300 border rounded-sm p-2 px-2"
					/>
				</div>
				{/* <hr /> */}
				<div className="flex justify-between items-center gap-1 w-full">
					<span>Orders</span>
					<input
						onChange={(e) => handleInputChange("orders", e.target.value)}
						className="w-1/2 border-gray-300 border rounded-sm p-2 px-2"
					/>
				</div>
				{/* <hr /> */}
				<button
					onClick={sendData}
					className=" bg-blue-600 border border-blue-600 rounded-sm py-3 text-white"
				>
					Simulate Activity
				</button>

				<div className="flex ">
					{latestRecom?.recommended_books && latestRecom?.recommended_books.length > 0 ? (
						<div className="flex flex-col items-center w-full">
							<span className=" font-medium">Recomended for user {data?.user_id}:</span>
							{latestRecom?.recommended_books.map((a: string) => (
								<span className=" text-center">{a}</span>
							))}
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
		</div>
	);
}

export default Home;
