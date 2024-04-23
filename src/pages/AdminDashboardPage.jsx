import React, {useCallback, useEffect, useContext, useState} from "react";
import {AuthContext} from "../authContext";
import {useNavigate} from "react-router-dom";
import MkdSDK from "../utils/MkdSDK";
import toy from "../assets/images/sdkImage.png";
import {FaArrowUpLong} from "react-icons/fa6";

const AdminDashboardPage = () => {
	const [movieResponse, setMovieResponse] = useState([]);
	const [movieTotalPage, setMovieTotalPage] = useState(null);
	const navigate = useNavigate();
	const {dispatch} = useContext(AuthContext);
	let [page, setPage] = useState(1);

	const handleLogout = () => {
		dispatch({type: "LOGOUT"});

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

	useEffect(() => {
		apiVideo(page);
	}, [page]);
	const handlePrev = () => {
		setPage(() => page - 1);
	};
	const handleNext = () => {
		setPage(() => page + 1);
	};

	return (
		<div className="w-full flex justify-center items-center text-7xl text-gray-700  ">
			<div className=" w-full lg:w-[50%]  bg-[#111111] px-[16px] lg:px-[112px] pt-4 pb-32">
				<div className="flex flex-col gap-32">
					<div className="flex justify-between">
						<p className="text-[#FFFFFF] text-[48px] font-[900]">App</p>
						<div className="text-[16px] ">
							<button
								onClick={handleLogout}
								className="px-8 py-4 bg-[#9BFF00] rounded-[2rem] "
							>
								Logout
							</button>
						</div>
					</div>
					<div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-center">
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
				{movieResponse.map((data) => {
					return (
						<div
							key={data.id}
							className="flex justify-between items-center mt-8  w-full px-4 py-2  rounded-[1rem]  border border-gray-500 border-opacity-50  text-[16px]  "
						>
							<p className="p-4">{data?.like}</p>
							<div className="w-[70%] lg:w-[55%]  flex  items-center gap-4">
								<img className="w-32 h-12 object-contain" src={toy} alt="" />
								<p className="text-[16px] text-gray-300 opacity-40 pr-4 font-100">
									{data?.title}
								</p>
							</div>

							<div className="w-[15%] lg:w-[5%]  flex gap-2 items-center ">
								<img className="rounded-full h-8 w-8" src={toy} alt="" />
								<div className="text-[#9BFF00] opacity-40 ">
									{data?.username}
								</div>
							</div>
							<div className="w-[15%] lg:w-[40%] flex justify-end items-center ">
								<div className="flex gap-2 ">
									<p className="text-gray-300 opacity-40">{data?.like}</p>
									<FaArrowUpLong className="text-[#9BFF00] opacity-40 font-100" />
								</div>
							</div>
						</div>
					);
				})}
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
