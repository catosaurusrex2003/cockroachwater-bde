import { createContext } from "react";
import image_0 from "../assets/book_0.webp";
import image_1 from "../assets/book_1.webp";
import image_2 from "../assets/book_2.webp";
import image_3 from "../assets/book_3.webp";
import image_4 from "../assets/book_4.webp";
import image_5 from "../assets/book_5.webp";
import image_6 from "../assets/book_6.webp";
import image_7 from "../assets/book_7.webp";
import image_8 from "../assets/book_8.webp";
import image_9 from "../assets/book_9.webp";
import image_10 from "../assets/book_10.webp";
import image_11 from "../assets/book_11.webp";
import image_12 from "../assets/image_12.webp";
import image_13 from "../assets/image_13.webp";
import image_14 from "../assets/image_14.webp";
import image_15 from "../assets/image_15.webp";
import image_16 from "../assets/image_16.webp";
import image_17 from "../assets/image_17.webp";
import image_18 from "../assets/image_18.webp";
import image_19 from "../assets/image_19.webp";
import image_20 from "../assets/image_20.webp";

type ContextType = string[];
const imageArr = [
	image_0,
	image_1,
	image_2,
	image_3,
	image_4,
	image_5,
	image_6,
	image_7,
	image_8,
	image_9,
	image_10,
	image_11,
	image_12,
	image_13,
	image_14,
	image_15,
	image_16,
	image_17,
	image_18,
	image_19,
	image_20,
];

export const ImageContext = createContext<ContextType>(imageArr);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
	return <ImageContext.Provider value={imageArr}>{children}</ImageContext.Provider>;
};
