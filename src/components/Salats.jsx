import React, { useEffect, useState, useRef } from 'react'
import Wrapper from '../layout/Wrapper'
import supabase from '../supabase/config'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react'

function Salats() {
	const [salat, setSalat] = useState([])
	const swiperRef = useRef(null) // Ref for Swiper instance

	const fetchSalat = async () => {
		try {
			const { data, error } = await supabase.from('salat').select('*')
			if (error) {
				throw error
			} else {
				setSalat(data)
			}
		} catch (error) {
			console.error('Error fetching data:', error.message)
		}
	}

	useEffect(() => {
		fetchSalat()
	}, [])

	return (
		<Wrapper>
			<div className='font-Poppins mt-10 mx-[20px] xl:mx-0'>
				<h2 className='text-3xl font-semibold mb-4'>Salatlar</h2>
				<Swiper
					spaceBetween={30}
					slidesPerView={4}
					className='mySwiper'
					navigation={{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}}
					breakpoints={{
						300: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 3,
						},
						1024: {
							slidesPerView: 4,
						},
					}}
					onSwiper={swiper => (swiperRef.current = swiper)}
				>
					{salat.map((card, index) => (
						<SwiperSlide key={index}>
							<div className='h-[400px] rounded-lg shadow-2xl'>
								<img
									src={card.cardpicture}
									alt={card.cardname}
									className='w-full h-64 object-cover rounded-t-lg'
								/>
								<div className='p-6'>
									<h3 className='text-lg font-semibold mb-2'>
										{card.cardname}
									</h3>
									<p className='text-lg font-bold text-red-500'>
										{card.cardprice} so'm
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
					<div
						className='swiper-button-next text-white bg-[#8c000e8e] rounded-full flex items-center justify-center p-[30px]'
						onClick={() => swiperRef.current.slideNext()}
					></div>
					<div
						className='swiper-button-prev text-white bg-[#8c000e8e] rounded-full flex items-center justify-center p-[30px]'
						onClick={() => swiperRef.current.slidePrev()}
					></div>
				</Swiper>
			</div>
		</Wrapper>
	)
}

export default Salats
