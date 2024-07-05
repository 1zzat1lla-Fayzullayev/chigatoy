import React from 'react'
import Wrapper from '../layout/Wrapper'
import Marquee from 'react-fast-marquee'
import marqueeArr from '../data/MarqueeArr'
import { motion } from 'framer-motion'

function MarqueeFood() {
	return (
		<>
			<div className='mt-[100px] select-none'>
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
								className='flex flex-col gap-[5px] font-Poppins items-center m-[30px] cursor-pointer'
							>
								<motion.img
									whileHover={{ scale: 1.1 }}
									src={slide.picture}
									alt={slide.title}
									className='w-[150px] rounded-[20px] h-[120px] object-cover'
								/>
								<span className='text-black text-[15px] font-semibold text-center'>
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
