import React from 'react'
import MobileList from './MobileList'
import images from '../../ImportedPictures'

function MobileHeader({ openNavbar }) {
	return (
		<>
			<header className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white z-[100]'>
				<img
					src={images.close}
					alt='close'
					className='w-[40px] absolute right-3 top-5'
					onClick={openNavbar}
				/>
				<div className='flex justify-center items-center h-full'>
					<MobileList />
				</div>
			</header>
		</>
	)
}

export default MobileHeader
