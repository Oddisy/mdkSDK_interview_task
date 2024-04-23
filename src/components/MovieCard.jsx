import React from "react";
import toy from "../assets/images/sdkImage.png";
import {FaArrowUpLong} from "react-icons/fa6";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export const MovieCard = ({id, like, title, username}) => {
	const {attributes, listeners, setNodeRef, transform, transition} =
		useSortable({id});
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};
	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			key={id}
			className="flex  justify-between items-center mb-8  w-full px-0 md:px-4 py-2  rounded-[1rem]  border border-gray-500 border-opacity-50  text-[16px]  "
		>
			<p className="px-1 md:p-4">{like}</p>
			<div className="w-[60%] lg:w-[50%]  flex  items-center gap-4">
				<img className="w-16 md:w-32 h-12 object-contain" src={toy} alt="" />
				<p className="title_responsive text-gray-300 opacity-40 pr-2 md:pr-4 font-100">
					{title}
				</p>
			</div>

			<div className="w-[20%] lg:w-[10%]   flex gap-2  justify-center items-center ">
				<img className="rounded-full h-8 w-8" src={toy} alt="" />
				<div className="text-[#9BFF00] opacity-40 ">{username}</div>
			</div>
			<div className="w-[15%] lg:w-[40%] flex justify-end items-center ">
				<div className="flex gap-0 md:gap-2 ">
					<p className="text-gray-300 opacity-40">{like}</p>
					<FaArrowUpLong className="text-[#9BFF00] opacity-40 font-100" />
				</div>
			</div>
		</div>
	);
};
