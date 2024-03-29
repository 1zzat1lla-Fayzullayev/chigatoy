import React, { useState } from 'react'
import logo from '../assets/chigatoy.jpg'
import bag from '../assets/shopping-bag.png'
import close from '../assets/close-svgrepo-com.svg'

function Navbar() {
	const [showBag, setShowBag] = useState(false)

	const handleShowBag = () => {
		setShowBag(!showBag)
	}

	return (
		<>
			<div className='navbar bg-base-100 font-Poppins'>
				<div className='navbar-start'>
					<div className='dropdown'>
						<div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
						>
							<li>
								<a>Asosiy</a>
							</li>
							<li>
								<a>Taomlar</a>
							</li>
							<li>
								<a>Aloqa</a>
							</li>
						</ul>
					</div>
					<img
						src={logo}
						alt='logo'
						className='w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-full'
					/>
				</div>
				<div className='navbar-center hidden lg:flex'>
					<ul className='menu menu-horizontal px-1'>
						<li>
							<a>Asosiy</a>
						</li>
						<li>
							<a>Taomlar</a>
						</li>
						<li>
							<a>Aloqa</a>
						</li>
					</ul>
				</div>
				<div className='navbar-end'>
					<img
						src={bag}
						alt='bag'
						className='w-10 h-10 md:w-12 md:h-12 cursor-pointer'
						onClick={handleShowBag}
					/>
				</div>
				{showBag && (
					<div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 shadow-2xl'>
						<div className='absolute top-0 right-0 h-full w-3/5 md:w-2/6 bg-white  overflow-y-auto transform translate-x-0 transition duration-400 ease-in-out'>
							<div onClick={handleShowBag}>
								<img
									src={close}
									alt='close svg'
									className='w-10 h-10 cursor-pointer absolute top-3 right-3'
								/>
							</div>
							{/* Add your bag content here */}
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Navbar
