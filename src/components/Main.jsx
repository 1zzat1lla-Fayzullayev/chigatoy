import React from 'react'
import Wrapper from '../layout/Wrapper'
import images from '../ImportedPictures'

function Main() {
	return (
		<>
			<Wrapper>
				<div className='mt-[150px] flex justify-center items-center lg:gap-[150px] flex-col md:flex-row'>
					<div className='px-[20px] lg:px-0 max-w-[400px] w-full flex flex-col gap-[30px] font-Poppins'>
						<h1 className='text-[20px] md:text-[30px] lg:text-[40px] leading-[1.2] font-bold text-[#8c000e]'>
							Eng Mazali Milliy Taomlarga Xush Kelibsiz!
						</h1>
						<p className='text-[16px] md:text-[17px] lg:text-[18px] text-gray-700'>
							Sizni milliy taomlarimizning boy ta'mlari va an'analari bilan
							tanishtirishdan mamnunmiz.
						</p>
					</div>
					<img
						src={images.shashlik}
						alt='shashlik'
						className='w-[250px] mt-[10px] md:mt-0 mx-auto md:mx-0 md:w-[350px] z-[10]'
					/>
				</div>
			</Wrapper>
		</>
	)
}

export default Main
