import { useRef, MouseEvent, useContext, useState } from "react";
import { motion } from "framer-motion";
import { BookType } from "../context/Store.context";
import { ImageContext } from "../context/Image.context";
import toast from "react-hot-toast";
import axios from "axios";
// import { useCart } from "../hooks/useCart";

type EachDocument = {
	user_id?: number;
	book_id?: number;
	clicks?: number;
	ratings?: number;
	likes?: number;
	orders?: number;
};
export default function ItemPreview({ setBool, book }: ItemPreviewProps) {
	const ModalRef = useRef<HTMLDivElement>(null);
	const imageArr = useContext(ImageContext);
	const [reqData, setReqData] = useState<EachDocument>({
		user_id: 5,
		book_id: parseInt(book.url),
		likes: 0,
		clicks: 0,
		ratings: 0,
		orders: 0,
	});

	function handleIsOpen(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
		if (!ModalRef.current?.contains(event.target as HTMLElement)) {
			document.body.style.overflow = "auto";
			setBool(false);
		}
	}

	const handleSendData = async () => {
		try {
			console.log(reqData);
			const response = await axios.post("http://127.0.0.1:8000/produce_spark", [
				{
					user_id: parseInt(localStorage.getItem("user_id") || "21"),
					book_id: reqData.book_id,
					clicks: reqData.clicks,
					ratings: reqData.ratings,
					likes: reqData.likes,
					orders: reqData.orders,
				},
			]);
			console.log(response.data);
			// toast.success("server recieved");
		} catch (err) {
			throw new Error(err as string);
		}
	};

	const BajArrJSX: JSX.Element[] = book.genre.map((genre) => {
		return <Baj label={genre} key={Math.random()} />;
	});
	return (
		// Overlay
		<motion.div
			className="fixed inset-0 z-10 flex items-center justify-center h-full bg-black bg-opacity-60"
			initial={{
				opacity: 0,
				filter: "blur(0)",
			}}
			animate={{
				opacity: 100,
			}}
			transition={{
				ease: "easeOut",
				duration: 0.3,
			}}
			exit={{
				opacity: 0,
				transition: {
					ease: "easeIn",
					duration: 0.2,
				},
			}}
			onClick={(e) => {
				handleIsOpen(e);
			}}
		>
			{/* Modal */}
			<motion.div
				ref={ModalRef}
				className="absolute flex px-5 py-10 flex-wrap justify-between z-20 w-full sm:p-10 sm:px-12 sm:w-[47.25rem] rounded h-fit mx-auto bg-slate-200 "
				initial={{
					opacity: 0,
					scale: 0.95,
					// y: 4,
				}}
				animate={{
					opacity: 100,
					scale: 1,
					y: 0,
				}}
				transition={{
					ease: "easeOut",
					duration: 0.3,
				}}
				exit={{
					opacity: 0,
					scale: 0.95,
					transition: {
						ease: "easeIn",
						duration: 0.2,
					},
				}}
			>
				{/* @ts-ignore */}
				<img src={imageArr[book.url]} className="hidden sm:block border-2 border-black h-80" />
				<div className="sm:w-96 ">
					<h1 className="text-2xl">{book.title}</h1>
					<h2 className="text-lg text-accent-blue-600">- {book.author}</h2>
					<div className="flex flex-wrap">{BajArrJSX}</div>
					<div className="flex justify-between items-center w-64">
						<label>Likes: </label>
						<input
							onChange={(e) => setReqData((prev) => ({ ...prev, likes: parseInt(e.target.value) }))}
							type="number"
							className="p-2 bg-inherit border rounded outline-none border-gray-500 my-2"
						/>
					</div>
					<div className="flex justify-between items-center w-64">
						<label>Clicks: </label>
						<input
							onChange={(e) =>
								setReqData((prev) => ({ ...prev, clicks: parseInt(e.target.value) }))
							}
							type="number"
							className="p-2 bg-inherit border rounded outline-none border-gray-500 my-2"
						/>
					</div>
					<div className="flex justify-between items-center w-64">
						<label>Rating: </label>
						<input
							onChange={(e) =>
								setReqData((prev) => ({ ...prev, ratings: parseInt(e.target.value) }))
							}
							type="number"
							className="p-2 bg-inherit border rounded outline-none border-gray-500 my-2"
						/>
					</div>
					<div className="flex items-center justify-between w-64 ">
						<label className="w-full">Previous Orders: </label>
						<input
							onChange={(e) =>
								setReqData((prev) => ({ ...prev, orders: parseInt(e.target.value) }))
							}
							type="number"
							className="p-2 bg-inherit w-16 border rounded outline-none border-gray-500 my-2"
						/>
					</div>
					<button
						className="w-full py-3 my-3 text-white rounded bg-blue-800"
						onClick={() => {
							// addToCart(book);
							document.body.style.overflow = "auto";
							setBool((prev) => !prev);
							// toast.loading("Getting Recommendations...");
							toast.promise(
								new Promise(async (resolve, reject) => {
									try {
										await handleSendData();
										resolve(null);
									} catch (err) {
										reject(err);
									}
								}),
								{
									loading: "Getting Recommendations...",
									success: "Recommendations Loaded!",
									error: "Failed to Load Recommendations!",
								}
							);
						}}
					>
						See Recommendations
					</button>
					<div className="flex text-accent-green-600">
						{/* <ShieldSVG />
						<p>Guarenteed Delivery in 2 Days.</p> */}
					</div>
				</div>
				{/* <CrossSVG /> */}
			</motion.div>
		</motion.div>
	);
}

function Baj({ label }: { label: string }) {
	return (
		<div
			key={Math.random()}
			className="p-2 mr-2 my-2 text-white bg-slate-800 w-fit rounded text-sm tracking-wider"
		>
			{label}
		</div>
	);
}

type ItemPreviewProps = {
	book: BookType;
	setBool: React.Dispatch<React.SetStateAction<boolean>>;
};
