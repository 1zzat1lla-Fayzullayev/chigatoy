import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import images from '../ImportedPictures'

function Menu({
	showMenu,
	setShowMenu,
	menuItems,
	handleClear,
	handleDecrement,
	handleIncrement,
	quantity,
	calculateTotalPrice,
}) {
	const handleCloseMenu = () => {
		setShowMenu(false)
	}

	console.log(calculateTotalPrice)

	useEffect(() => {
		const menuContainer = document.getElementById('menuContainer')
		if (menuContainer) {
			menuContainer.scrollTop = menuContainer.scrollHeight
		}
	}, [menuItems])

	return (
		<motion.div
			initial={{ x: '100%' }}
			animate={{ x: showMenu ? '0%' : '100%' }}
			transition={{ type: 'spring', stiffness: 100, damping: 15 }}
			className='glass-effect w-[250px] md:w-[350px] h-screen fixed right-0 rounded-l-[10px] shadow-lg border-l-[2px] border-t-[2px] border-[#8d000e56] z-[999] font-Poppins'
		>
			<div className='flex justify-between items-center'>
				<div className='cursor-pointer'>
					<img
						src={images.close}
						alt='close'
						className='w-[40px]'
						onClick={handleCloseMenu}
					/>
				</div>

				<p className='cursor-pointer text-yellow-500' onClick={handleClear}>
					Tozalash
				</p>
			</div>

			<div id='menuContainer' className='mt-4 overflow-y-auto'>
				{menuItems.length === 0 ? (
					<p className='text-center text-red-500 font-bold text-[30px] h-full flex justify-center items-center mt-[60%]'>
						¯\_(ツ)_/¯
					</p>
				) : (
					<ul>
						{menuItems.map((item, index) => (
							<li key={index} className='border-b border-gray-200 py-2'>
								<p className='font-semibold'>{item.cardname}</p>
								<p className='text-red-500 font-semibold'>
									{calculateTotalPrice} so'm
								</p>

								<div className='flex items-center gap-[10px]'>
									<button className='text-[35px]' onClick={handleDecrement}>
										-
									</button>
									<span className='text-[35px]'>{quantity}</span>
									<button className='text-[35px]' onClick={handleIncrement}>
										+
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</motion.div>
	)
}

export default Menu
