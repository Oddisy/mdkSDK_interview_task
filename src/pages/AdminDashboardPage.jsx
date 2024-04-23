import React, {useCallback, useEffect, useContext, useState} from "react";
import {AuthContext} from "../authContext";
import {GlobalContext} from "../globalContext";
import {useNavigate} from "react-router-dom";
import MkdSDK from "../utils/MkdSDK";
import {RiUser3Line} from "react-icons/ri";

import {MdKeyboardArrowDown} from "react-icons/md";
import {DndContext, closestCorners} from "@dnd-kit/core";
import {MovieCard} from "../components/MovieCard";
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";
import SnackBar from "../components/SnackBar";
const AdminDashboardPage = () => {
	const [movieResponse, setMovieResponse] = useState([]);
	const [movieTotalPage, setMovieTotalPage] = useState(null);
	const [showSnackbar, setShowSnackbar] = useState(false);
	const navigate = useNavigate();
	const {dispatch: authDispatch} = useContext(AuthContext);
	const {dispatch: globalDispatch} = useContext(GlobalContext);

	let [page, setPage] = useState(1);

	const handleLogout = () => {
		authDispatch({type: "LOGOUT"});
		globalDispatch({type: "SNACKBAR", payload: {message: ""}});

		navigate("/");
	};

	const apiVideo = useCallback(async (page) => {
		const ApiReq = new MkdSDK();
		ApiReq.setTable("video");
		try {
			const response = await ApiReq.callRestAPI(
				{
					payload: {},
					page,
					limit: 10,
				},
				"PAGINATE"
			);
			setMovieResponse(response?.list);
			setMovieTotalPage(response?.num_pages);
		} catch (error) {
			console.log(error);
		}
	}, []);
	// fetch apiVideo when page loads
	useEffect(() => {
		apiVideo(page);
	}, [page]);
	// show snackbar
	useEffect(() => {
		setShowSnackbar(true);

		const timeout = setTimeout(() => {
			setShowSnackbar(false);
			globalDispatch({type: "SNACKBAR", payload: {message: ""}});
		}, 3000);

		return () => clearTimeout(timeout);
	}, [showSnackbar]);
	// handle prev paginationm
	const handlePrev = () => {
		setPage(() => page - 1);
	};
	// handle next pagination
	const handleNext = () => {
		setPage(() => page + 1);
	};
	// get position of item
	const getMoviePos = (id) =>
		movieResponse.findIndex((movie) => movie.id === id);
	// make drag item stay in the position
	const handleDragEnd = (event) => {
		const {active, over} = event;

		if (active.id === over.id) return;
		setMovieResponse((movieResponse) => {
			// position of element before dragged
			const originalPos = getMoviePos(active.id);
			// possition where it shoukd be
			const newPos = getMoviePos(over.id);
			return arrayMove(movieResponse, originalPos, newPos);
		});
	};

	return (
		<div className="w-full flex justify-center items-center text-7xl text-gray-700   ">
			{showSnackbar ? <SnackBar /> : null}
			<div className=" w-full bg-[#111111] px-[16px] lg:px-[112px] pt-4 pb-32">
				<div className="flex flex-col gap-32">
					<div className="flex justify-between">
						<p className="text-[#FFFFFF] text-[48px] font-[900]">App</p>
						<div className="text-[16px] ">
							<button
								onClick={handleLogout}
								className="px-8 py-4 flex gap-1 bg-[#9BFF00] rounded-[2rem] "
							>
								<RiUser3Line />
								Logout
							</button>
						</div>
					</div>
					<div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
						<p className="text-[#FFFFFF] text-[40px] font-[100] font-[inter]">
							Today’s leaderboard
						</p>
						<div className="text-[16px] flex items-center gap-4  px-4 py-2 rounded-xl  bg-[#1D1D1D]">
							<p className="flex gap-2">
								<span>30</span>
								<span>may</span>
								<span>2022</span>
							</p>
							<button className="px-2 py-2 bg-[#9BFF00] text-[14px] rounded-[0.5rem] ">
								SUBMISSION OPENS
							</button>
							<p className="flex justify-between">
								<span>11</span>
								<span>:</span>
								<span>34</span>
							</p>
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center mt-8  w-full px-4 py-4 rounded-[1rem]  text-[16px]  ">
					<p className="px-4">#</p>
					<div className="w-[70%] lg:w-[55%]  flex pl-8  items-center gap-4">
						<p className="text-[16px] text-gray-300 opacity-40 pr-4 font-100">
							Title
						</p>
					</div>

					<div className="w-[15%] lg:w-[5%]  flex gap-2 items-center ">
						<div className="text-gray-300 opacity-40 ">Author</div>
					</div>
					<div className="w-[15%] lg:w-[40%] flex justify-end items-center ">
						<div className="flex gap-2 ">
							<p className="text-gray-300 opacity-40">Most liked</p>
							<MdKeyboardArrowDown className="text-[#ffff] opacity-40 font-100" />
						</div>
					</div>
				</div>
				<DndContext
					onDragEnd={handleDragEnd}
					collisionDetection={closestCorners}
				>
					<SortableContext
						items={movieResponse}
						strategy={verticalListSortingStrategy}
					>
						{movieResponse.map((data) => {
							return (
								<MovieCard
									like={data?.like}
									id={data?.id}
									key={data?.id}
									title={data?.title}
									username={data?.username}
									movieResponse={movieResponse}
								/>
							);
						})}
					</SortableContext>
				</DndContext>
				<div className="flex items-center justify-center text-[14px] pt-8 w-[20%] lg:w-full">
					<button
						className={`${
							page === 1
								? "cursor-not-allowed opacity-50"
								: "bg-[#88c52c] opacity-700 hover:bg-[#6c9c25]"
						} text-white font-bold py-2 px-4 rounded-full shadow-md mr-2 transition duration-300 ease-in-out`}
						onClick={handlePrev}
						disabled={page === 1}
					>
						Prev
					</button>
					{Array.from({length: movieTotalPage}, (_, i) => (
						<button
							key={i + 1}
							onClick={() => setPage(i + 1)}
							className={`${
								page === i + 1
									? "bg-[#88c52c] opacity-700 hover:bg-[#6c9c25] text-white"
									: "text-white hover:text-black hover:bg-gray-200"
							} font-bold py-2 px-4 rounded-full shadow-md mr-2 transition duration-300 ease-in-out`}
						>
							{i + 1}
						</button>
					))}
					<button
						onClick={handleNext}
						disabled={page === movieTotalPage}
						className={`${
							page === 12
								? "cursor-not-allowed opacity-50"
								: "bg-[#88c52c] opacity-700 hover:bg-[#6c9c25]"
						} text-white font-bold py-2 px-4 rounded-full shadow-md mr-2 transition duration-300 ease-in-out`}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboardPage;
