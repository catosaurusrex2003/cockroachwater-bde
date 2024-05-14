import { useContext } from "react";
import { StarSVG } from "../assets/svg";
import { ImageContext } from "../context/Image.context";

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

type Props = {
	book: BookType;
};

export default function RecomCard({ book }: Props) {
	const imageArr = useContext(ImageContext);
	return (
		<>
			<div className="my-4 mx-auto md:mx-0">
				<div
					className="py-12 px-[3.05rem] w-[13.75rem] rounded bg-zinc-100 shadow hover:bg-accent-blue-33 hover:rounded-none cursor-pointer"
					onClick={() => {
						document.body.style.overflow = "hidden";
					}}
				>
					<img
						//@ts-ignore
						src={imageArr[parseInt(book.url)]}
						className="h-44 border-2 w-[120px] border-black"
						alt=""
					/>
				</div>
				<h1 className="mt-3 h-10 font-medium w-52 leading-tight ">{book.title}</h1>
				<p className="text-sm text-primary-400">{book.author}</p>
				<div className="flex">
					<StarSVG className="w-4 text-yellow-400" />
					<StarSVG className="w-4 text-yellow-400" />
					<StarSVG className="w-4 text-yellow-400" />
					<StarSVG className="w-4 text-yellow-400" />
					<StarSVG className="w-4 text-yellow-400" />
				</div>
			</div>
		</>
	);
}
