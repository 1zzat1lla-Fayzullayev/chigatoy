import React from 'react'

function List() {
	return (
		<>
			<ul className='sm:flex items-center gap-[40px] hidden'>
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

export default List
