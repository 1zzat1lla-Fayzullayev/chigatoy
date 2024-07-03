import React from 'react'
import { motion } from 'framer-motion'
import images from '../ImportedPictures'

function Menu({ showMenu, openMenu }) {
	return (
		<>
			<motion.div
				initial={{ x: '100%' }}
				animate={{ x: showMenu ? '0%' : '100%' }}
				transition={{ type: 'spring', stiffness: 100, damping: 15 }}
				className='glass-effect w-[250px] md:w-[350px] h-screen fixed right-0 rounded-l-[10px] shadow-lg border-l-[2px] border-t-[2px] border-[#8d000e56] z-[99]'
			>
				<img
					src={images.close}
					alt='close'
					className='w-[40px] cursor-pointer'
					onClick={openMenu}
				/>
			</motion.div>
		</>
	)
}

export default Menu
