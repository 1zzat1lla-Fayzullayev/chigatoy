import React from 'react'
import { motion } from 'framer-motion'
import images from '../ImportedPictures'

function Menu({
	showMenu,
	openMenu,
	setShowMenu,
	selectedCard,
	menuItems,
	selectedOption,
	calculateTotalPrice,
}) {
	const handleCloseMenu = () => {
		setShowMenu(false)
	}

	return (
		<motion.div
			initial={{ x: '100%' }}
			animate={{ x: showMenu ? '0%' : '100%' }}
			transition={{ type: 'spring', stiffness: 100, damping: 15 }}
			className='glass-effect w-[250px] md:w-[350px] h-screen fixed right-0 rounded-l-[10px] shadow-lg border-l-[2px] border-t-[2px] border-[#8d000e56] z-[999]'
		>
			<div className='cursor-pointer'>
				<img
					src={images.close}
					alt='close'
					className='w-[40px]'
					onClick={handleCloseMenu}
				/>
			</div>

			<div className='mt-4'>
				<ul>
					{menuItems.map((item, index) => (
						<li key={index} className='border-b border-gray-200 py-2'>
							<p className='font-semibold'>{item.cardname}</p>
							<p className='text-red-500 font-semibold'>
								{item.cardprice} so'm
							</p>
						</li>
					))}
				</ul>
				{selectedCard && (
					<div className='mt-4'>
						<p className='font-semibold'>{selectedCard.cardname}</p>
						<p className='text-red-500 font-semibold'>
							{selectedOption === 'kg'
								? selectedCard.secondprice
								: selectedCard.cardprice}{' '}
							so'm per {selectedOption}
						</p>
						<p className='text-red-500 font-semibold'>
							Total Price: {calculateTotalPrice} so'm
						</p>
					</div>
				)}
			</div>
		</motion.div>
	)
}

export default Menu
