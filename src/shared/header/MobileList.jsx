import React from 'react'

function MobileList() {
	return (
		<>
			<ul className='flex items-center justify-center gap-[20px] flex-col'>
				<li className='cursor-pointer font-Poppins hover:text-[#8C000F] transition-all ease-in-out'>
					Asosiy
				</li>
				<li className='cursor-pointer font-Poppins hover:text-[#8C000F] transition-all ease-in-out'>
					Taomlar
				</li>
				<li className='cursor-pointer font-Poppins hover:text-[#8C000F] transition-all ease-in-out'>
					Aloqa
				</li>
			</ul>
		</>
	)
}

export default MobileList
