// import { motion } from "framer-motion";

interface ISvg {
	className?: string;
	onClick?: () => void;
}
//Cart SVG
export const CartSVG = ({ onClick }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6 mx-4 cursor-pointer "
			onClick={onClick}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
			/>
		</svg>
	);
};

//Notif SVG
export const NotifSVG = ({ onClick, className }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className || "hidden w-6 h-6 mx-4 cursor-pointer md:block"}
			onClick={onClick}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
			/>
		</svg>
	);
};

//Menu SVG
export const MenuSVG = ({ onClick }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6 mx-0 cursor-pointer md:hidden"
			onClick={onClick}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	);
};

//LArrow SVG
export const LArrowSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6 mx-1"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
			/>
		</svg>
	);
};

//LArrow SVG
export const RArrowSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			className="w-6 h-6 mx-1"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
			/>
		</svg>
	);
};

//Truck SVG
export const TruckSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			className="w-16 h-16 mb-2 mt-9 text-accent-blue-600"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
			/>
		</svg>
	);
};

//Refund SVG
export const RefundSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			className="mt-10 mb-3 w-14 h-14 text-accent-pink"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
			/>
		</svg>
	);
};

//Lock SVG
export const LockSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1"
			stroke="currentColor"
			className="mt-10 mb-3 w-14 h-14 text-accent-green"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
			/>
		</svg>
	);
};

//chevron-left SVG
export const ChevronLeftSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
	);
};

//chevron-right SVG
export const ChevronRightSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	);
};

//arrow-right SVG
export const ArrowRightSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
			/>
		</svg>
	);
};

//chevron-down SVG
export const ChevronDownSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2.5"
			stroke="currentColor"
			className="w-4 h-4"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
		</svg>
	);
};

//quotes SVG
export const QuotesSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="12"
			viewBox="0 0 18 12"
			fill="none"
			className="absolute top-24 left-5"
		>
			<path
				d="M3.65625 11.25C5.36488 11.25 6.75 9.86488 6.75 8.15625C6.75 6.44762 5.36488 5.0625 3.65625 5.0625C1.94762 5.0625 0.5625 6.44762 0.5625 8.15625C0.5625 9.86488 1.94762 11.25 3.65625 11.25Z"
				fill="#BDC3C7"
			/>
			<path
				d="M3.65625 11.8125C1.64025 11.8125 0 10.1723 0 8.15625C0 6.14025 1.64025 4.5 3.65625 4.5C5.67225 4.5 7.3125 6.14025 7.3125 8.15625C7.3125 10.1723 5.67225 11.8125 3.65625 11.8125ZM3.65625 5.625C2.26069 5.625 1.125 6.76069 1.125 8.15625C1.125 9.55181 2.26069 10.6875 3.65625 10.6875C5.05181 10.6875 6.1875 9.55181 6.1875 8.15625C6.1875 6.76069 5.05181 5.625 3.65625 5.625Z"
				fill="#BDC3C7"
			/>
			<path
				d="M13.2188 11.25C14.9274 11.25 16.3125 9.86488 16.3125 8.15625C16.3125 6.44762 14.9274 5.0625 13.2188 5.0625C11.5101 5.0625 10.125 6.44762 10.125 8.15625C10.125 9.86488 11.5101 11.25 13.2188 11.25Z"
				fill="#BDC3C7"
			/>
			<path
				d="M13.2188 11.8125C11.2027 11.8125 9.5625 10.1723 9.5625 8.15625C9.5625 6.14025 11.2027 4.5 13.2188 4.5C15.2348 4.5 16.875 6.14025 16.875 8.15625C16.875 10.1723 15.2348 11.8125 13.2188 11.8125ZM13.2188 5.625C11.8232 5.625 10.6875 6.76069 10.6875 8.15625C10.6875 9.55181 11.8232 10.6875 13.2188 10.6875C14.6143 10.6875 15.75 9.55181 15.75 8.15625C15.75 6.76069 14.6143 5.625 13.2188 5.625Z"
				fill="#BDC3C7"
			/>
			<path
				d="M0.5625 8.4375C0.251438 8.4375 0 8.18606 0 7.875C0 3.5325 3.5325 0 7.875 0C8.18606 0 8.4375 0.251438 8.4375 0.5625C8.4375 0.873562 8.18606 1.125 7.875 1.125C4.15294 1.125 1.125 4.15294 1.125 7.875C1.125 8.18606 0.873562 8.4375 0.5625 8.4375Z"
				fill="#BDC3C7"
			/>
			<path
				d="M10.125 8.4375C9.81394 8.4375 9.5625 8.18606 9.5625 7.875C9.5625 3.5325 13.095 0 17.4375 0C17.7486 0 18 0.251438 18 0.5625C18 0.873562 17.7486 1.125 17.4375 1.125C13.7154 1.125 10.6875 4.15294 10.6875 7.875C10.6875 8.18606 10.4361 8.4375 10.125 8.4375Z"
				fill="#BDC3C7"
			/>
		</svg>
	);
};

//Star SVG
export const StarSVG = ({ className }: { className: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
		>
			<path
				fillRule="evenodd"
				d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

//Cross SVG
export const CrossSVG = ({ className, onClick }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2.5"
			stroke="currentColor"
			// className="w-5 h-5 rotate-45 cursor-pointer text-slate-400"
			className={`w-4 h-4 rotate-45 cursor-pointer text-slate-400 ${className}`}
			onClick={onClick}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	);
};

//Top Right ArrowSVG
export const TRArrowSVG = ({ className, onClick }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2.5"
			stroke="currentColor"
			className={`w-8 h-8 cursor-pointer ${className}`}
			onClick={onClick}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
			/>
		</svg>
	);
};

//Search SVG
export const SearchSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2.5"
			stroke="currentColor"
			className="w-4 h-4"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	);
};

//Filter SVG
export const FilterSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="w-6 h-6"
		>
			<path
				fillRule="evenodd"
				d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

//Genre SVG
export const GenreSVG = ({ className }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
			/>
		</svg>
	);
};

//Rating SVG
export const RatingSVG = ({ className }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
			/>
		</svg>
	);
};

//Exclusive SVG
export const ExclusiveSVG = ({ className }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
			/>
		</svg>
	);
};

//Shield SVG
export const ShieldSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6 mr-2 "
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
			/>
		</svg>
	);
};

//Check SVG
export const CheckSVG = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6 mr-2 text-accent-green-600"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
		</svg>
	);
};

//XMark SVG
export const XMarkSVG = ({ className, onClick }: ISvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			onClick={onClick}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	);
};
