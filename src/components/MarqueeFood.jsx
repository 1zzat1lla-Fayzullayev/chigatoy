import React from 'react'
import Wrapper from '../layout/Wrapper'
import Marquee from 'react-fast-marquee'
import marqueeArr from '../data/MarqueeArr'

function MarqueeFood() {
	return (
		<>
			<div className='mt-[100px]'>
				<Wrapper>
					<Marquee
						direction='left'
						autoFill='true'
						pauseOnHover='true'
						speed={100}
					>
						{marqueeArr.map(slide => (
							<div
								key={slide.title}
								className='flex flex-col font-Poppins items-center m-[30px] cursor-pointer'
							>
								<img
									src={slide.picture}
									alt={slide.title}
									className='w-[150px] rounded-[20px] h-[120px] object-cover'
								/>
								<span className='text-black text-[15px] text-center'>
									{slide.title}
								</span>
							</div>
						))}
					</Marquee>
				</Wrapper>
			</div>
		</>
	)
}

export default MarqueeFood
