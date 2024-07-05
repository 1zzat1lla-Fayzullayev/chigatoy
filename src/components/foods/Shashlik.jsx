import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import images from '../../ImportedPictures'
import Wrapper from '../../layout/Wrapper'
import supabase from '../../supabase/config'
import ShashlikModal from '../../shared/foodsModal/ShashlikModal'

function Shashlik({
	setSelectedCard,
	selectedCard,
	addToMenu,
	calculateTotalPrice,
	increment,
	decrement,
	quantity,
	setQuantity,
}) {
	const [shashlik, setShashlik] = useState([])
	const swiperRef = useRef(null)

	const fetchShashlik = async () => {
		try {
			const { data, error } = await supabase.from('shashlik').select('*')
			if (error) {
				throw error
			} else {
				setShashlik(data)
			}
		} catch (error) {
			console.error('Error fetching data:', error.message)
		}
	}

	useEffect(() => {
		fetchShashlik()
	}, [])

	const handleCardClick = card => {
		setSelectedCard(card)
		setQuantity(1)
		const modal = document.getElementById('shashlik-modal')
		if (modal) modal.showModal()
	}

	const handleCloseModal = () => {
		const modal = document.getElementById('shashlik-modal')
		if (modal) modal.close()
	}

	return (
		<Wrapper>
			<div className='font-Poppins mt-10 mx-4 xl:mx-0 select-none pb-[100px]'>
				<h2 className='text-3xl font-semibold mb-4 text-center xl:text-left'>
					Shashlik
				</h2>
				<Swiper
					modules={[Autoplay]}
					spaceBetween={30}
					slidesPerView={4}
					className='mySwiper'
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					navigation={{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
					}}
					onSwiper={swiper => (swiperRef.current = swiper)}
				>
					{shashlik.map((card, index) => (
						<SwiperSlide key={index}>
							<div className='relative h-[280px] w-[250px] mx-auto rounded-lg border border-gray-200 overflow-hidden'>
								<motion.img
									whileHover={{ scale: 1.07 }}
									src={card.cardpicture}
									alt={card.cardname}
									className='w-full h-[50%] object-cover rounded-t-lg cursor-pointer'
									onClick={() => handleCardClick(card)}
								/>
								<div className='p-4'>
									<h3 className='text-[17px] font-semibold mb-2'>
										{card.cardname}
									</h3>
									<div className='flex items-center justify-between absolute bottom-0 w-[88%] pb-[10px]'>
										<p className='text-lg font-bold text-red-500'>
											{card.cardprice} so'm
										</p>
										<img
											src={images.shoppingBag}
											alt='bag'
											className='w-[30px] cursor-pointer'
											onClick={() => addToMenu(card)}
										/>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
					<div
						className='swiper-button-next text-white bg-[#8c000e8e] rounded-full flex items-center justify-center p-8'
						onClick={() => swiperRef.current.slideNext()}
					></div>
					<div
						className='swiper-button-prev text-white bg-[#8c000e8e] rounded-full flex items-center justify-center p-8'
						onClick={() => swiperRef.current.slidePrev()}
					></div>
				</Swiper>
			</div>

			<ShashlikModal
				addToMenu={addToMenu}
				decrement={decrement}
				handleCloseModal={handleCloseModal}
				increment={increment}
				quantity={quantity}
				selectedCard={selectedCard}
				calculateTotalPrice={calculateTotalPrice}
			/>
		</Wrapper>
	)
}

export default Shashlik
