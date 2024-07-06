import React, { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import images from '../ImportedPictures'

function Menu({
	showMenu,
	setShowMenu,
	menuItems,
	updateMenuItem,
	handleClear,
}) {
	const handleCloseMenu = () => {
		setShowMenu(false)
	}

	useEffect(() => {
		const menuContainer = document.getElementById('menuContainer')
		if (menuContainer) {
			menuContainer.scrollTop = menuContainer.scrollHeight
		}
	}, [menuItems])

	const handleIncrement = index => {
		if (typeof updateMenuItem === 'function') {
			updateMenuItem(index, 1)
		} else {
			console.error('updateMenuItem is not a function', updateMenuItem)
		}
	}

	const handleDecrement = index => {
		if (typeof updateMenuItem === 'function') {
			updateMenuItem(index, -1)
		} else {
			console.error('updateMenuItem is not a function', updateMenuItem)
		}
	}

	const calculateItemTotal = item => {
		return ((item.cardprice || 0) * (item.quantity || 1)).toFixed(2)
	}

	return (
		<motion.div
			initial={{ x: '100%' }}
			animate={{ x: showMenu ? '0%' : '100%' }}
			transition={{ type: 'spring', stiffness: 100, damping: 15 }}
			className='glass-effect w-[250px] md:w-[350px] h-screen fixed right-0 rounded-l-[10px] shadow-lg border-l-[2px] border-t-[2px] border-[#8d000e56] z-[999] font-Poppins overflow-y-auto select-none'
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
									{calculateItemTotal(item)} so'm
								</p>
								<div className='flex items-center gap-[10px]'>
									<button
										className='text-[35px]'
										onClick={() => handleDecrement(index)}
									>
										-
									</button>
									<span className='text-[35px]'>{item.quantity || 1}</span>
									<button
										className='text-[35px]'
										onClick={() => handleIncrement(index)}
									>
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
