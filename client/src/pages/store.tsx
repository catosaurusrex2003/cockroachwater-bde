import { useContext, useState } from "react";
import Card from "../components/card";
import RecomCard from "../components/recomCard";
import { StoreContext } from "../context/Store.context";
import RecomContainer from "../components/RecomContainer";
import toast from "react-hot-toast";

type Props = {};

export default function Store({}: Props) {
	const { data, error } = useContext(StoreContext);
	// let CardArrJSX: React.ReactNode = <SkeletonCards />;
	let CardArrJSX: React.ReactNode = [];
	if (error) {
		return <>error</>;
	}
	if (data) {
		CardArrJSX = data!.map((book) => {
			return <Card book={book} key={Math.random()} />;
		});
	}

	const testData = [
		{
			url: "18",
			title: "The Silent Depths",
			author: "Mia Yoshida",
			rating: 4.9,
			genre: ["thriller", "mystery"],
			quantity: 100,
			reviews: "",
			description: "Lorem",
		},
		{
			url: "19",
			title: "Gates of Fire",
			author: "Steven Pressfield",
			rating: 5,
			genre: ["historical", "war"],
			quantity: 85,
			reviews: "",
			description: "Lorem",
		},
		{
			url: "20",
			title: "Winter's Heart",
			author: "Robert Jordan",
			rating: 3.5,
			genre: ["fantasy", "epic"],
			quantity: 150,
			reviews: "",
			description: "Lorem",
		},
	];

	const newArrJSX = testData!.map((book) => {
		return <RecomCard book={book} key={Math.random()} />;
	});

	// console.log(data);

	const [userId, setUserId] = useState<string>("0");

	return (
		<div className="pb-16 pt-5 max-w-[67rem] mx-4 sm:mx-20 xl:mx-auto">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-medium">
					User ID
					<input
						type="number"
						className="ml-3 p-2 border-2 border-gray-300 rounded-md w-20 text-center"
						onChange={(e) => {
							setUserId(e.target.value);
						}}
					/>
				</h1>

				<button
					className="p-3 rounded bg-blue-800 text-white"
					onClick={() => {
						localStorage.setItem("user_id", userId.toString());
						toast.success("User Id set");
					}}
				>
					Set User Id
				</button>
			</div>
			<hr className="my-3" />
			<h1 className="text-2xl font-medium">Books Inventory store...</h1>
			<div className="flex justify-between overflow-x-scroll gap-7">{CardArrJSX}</div>
			<h1 className="text-2xl mt-10 font-medium">User Recommendations</h1>
			{/* <div className="flex overflow-x-scroll gap-7">{newArrJSX}</div> */}
			<RecomContainer />
		</div>
	);
}
