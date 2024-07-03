import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import images from '../ImportedPictures'

function Menu({ showMenu, openMenu, setShowMenu}) {
	const menuRef = useRef()

	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setShowMenu(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [menuRef])

	return (
		<>
			<motion.div
				ref={menuRef}
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
						onClick={openMenu}
					/>
				</div>
			</motion.div>
		</>
	)
}

export default Menu
