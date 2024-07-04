import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import images from '../../ImportedPictures'
import Wrapper from '../../layout/Wrapper'
import supabase from '../../supabase/config'
import Menu from '../../shared/Menu'

function SecondFoods({
	setSelectedCard,
	selectedCard,
	addToMenu,
	handleIncrement,
	handleDecrement,
	setQuantity,
	quantity,
}) {
	const [secondFood, setSecondFood] = useState([])
	const [selectedOption, setSelectedOption] = useState('por')
	const swiperRef = useRef(null)

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
			<div className='font-Poppins mt-10 mx-4 xl:mx-0'>
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
							<div
								className='relative h-[280px] w-[250px] mx-auto rounded-lg border border-gray-200 overflow-hidden'
								onClick={() => handleCardClick(card)}
							>
								<motion.img
									whileHover={{ scale: 1.07 }}
									src={card.cardpicture}
									alt={card.cardname}
									className='w-full h-[60%] object-cover rounded-t-lg cursor-pointer'
								/>
								<div className='p-6'>
									<h3 className='text-[17px] font-semibold mb-2'>
										{card.cardname}
									</h3>
									<div className='flex items-center justify-between mt-4'>
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

			<dialog id='secondfood-modal' className='modal font-Poppins'>
				<div className='modal-box bg-[#fffffffe]'>
					<img
						src={images.close}
						alt='close'
						className='w-[30px] absolute right-0 top-0 cursor-pointer'
						onClick={handleCloseModal}
					/>

					{selectedCard && (
						<>
							<img
								src={selectedCard.cardpicture}
								alt={selectedCard.cardname}
								className='w-full h-[200px] object-cover rounded-t-lg'
							/>
							<h4 className='text-lg font-semibold mt-4'>
								{selectedCard.cardname}
							</h4>
							<p className='text-sm mt-2'>{selectedCard.carddescreption}</p>
							{selectedCard.firstprice !== null &&
								selectedCard.secondprice !== null && (
									<div className='flex flex-col'>
										<div className='flex gap-2'>
											<input
												type='radio'
												name='option'
												id='por'
												checked={selectedOption === 'por'}
												onChange={() => handleOptionChange('por')}
											/>
											<label htmlFor='por'>1 por</label>
										</div>
										<div className='flex gap-2'>
											<input
												type='radio'
												name='option'
												id='kg'
												checked={selectedOption === 'kg'}
												onChange={() => handleOptionChange('kg')}
											/>
											<label htmlFor='kg'>1 kg</label>
										</div>
									</div>
								)}
							<p className='text-lg font-bold text-red-500 mt-4'>
								{calculateTotalPrice()} so'm
							</p>
							<div className='flex items-center gap-[10px]'>
								<button className='text-[35px]' onClick={handleDecrement}>
									-
								</button>
								<span className='text-[35px]'>{quantity}</span>
								<button className='text-[35px]' onClick={handleIncrement}>
									+
								</button>
								<img
									src={images.shoppingBag}
									alt='bag'
									className='w-[30px] cursor-pointer ml-[50px]'
									onClick={() => addToMenu(selectedCard)}
								/>
							</div>
						</>
					)}
				</div>
			</dialog>
			<Menu
				showMenu={false} // Set to true to display the menu
				openMenu={() => {}} // Implement openMenu if needed
				setShowMenu={() => {}} // Implement setShowMenu if needed
				selectedCard={selectedCard}
				menuItems={secondFood} // Adjust to pass relevant menu items
				selectedOption={selectedOption} // Pass selectedOption
				calculateTotalPrice={calculateTotalPrice()} // Pass calculated price
			/>
		</Wrapper>
	)
}

export default SecondFoods
