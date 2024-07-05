import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import images from '../../ImportedPictures'
import Wrapper from '../../layout/Wrapper'
import supabase from '../../supabase/config'
import { useQuantity } from '../../context/useQuantity'
import SecondFoodModal from '../../shared/foodsModal/SecondFoodModal'

function SecondFoods({ setSelectedCard, selectedCard, addToMenu }) {
	const [secondFood, setSecondFood] = useState([])
	const [selectedOption, setSelectedOption] = useState('por')
	const swiperRef = useRef(null)

	const { quantity, increment, decrement, setQuantity } = useQuantity(1)

	useEffect(() => {
		fetchSecondFood()
	}, [])

	const fetchSecondFood = async () => {
		try {
			const { data, error } = await supabase.from('secondfood').select('*')
			if (error) {
				throw error
			} else {
				setSecondFood(data)
			}
		} catch (error) {
			console.error('Error fetching data:', error.message)
		}
	}

	const handleCardClick = card => {
		setSelectedCard(card)
		setQuantity(1)
		const modal = document.getElementById('secondfood-modal')
		if (modal) modal.showModal()
	}

	const handleCloseModal = () => {
		const modal = document.getElementById('secondfood-modal')
		if (modal) modal.close()
		setSelectedCard(null)
	}

	const handleOptionChange = option => {
		setSelectedOption(option)
	}

	const calculateTotalPrice = () => {
		if (!selectedCard) return '0'
		let pricePerUnit = parseFloat(
			selectedOption === 'kg' && selectedCard.secondprice !== null
				? selectedCard.secondprice
				: selectedCard.cardprice
		)
		let totalPrice = pricePerUnit * quantity
		return totalPrice % 1 === 0 ? totalPrice.toFixed(0) : totalPrice.toFixed(2)
	}

	return (
		<Wrapper>
			<div className='font-Poppins mt-10 mx-4 xl:mx-0 select-none'>
				<h2 className='text-3xl font-semibold mb-4 text-center xl:text-left'>
					Ikkinchi taom
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
					{secondFood.map((card, index) => (
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
			<SecondFoodModal
				addToMenu={addToMenu}
				decrement={decrement}
				handleCloseModal={handleCloseModal}
				increment={increment}
				quantity={quantity}
				selectedCard={selectedCard}
				calculateTotalPrice={calculateTotalPrice}
				selectedOption={selectedOption}
				handleOptionChange={handleOptionChange}
			/>
		</Wrapper>
	)
}

export default SecondFoods
