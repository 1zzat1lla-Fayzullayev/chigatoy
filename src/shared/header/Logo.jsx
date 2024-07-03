import React from 'react'
import images from '../../ImportedPictures'

function Logo() {
	return (
		<>
			<img
				src={images.logo}
				alt='logo'
				className='w-[50px] rounded-[10px] cursor-pointer'
			/>
		</>
	)
}

export default Logo
