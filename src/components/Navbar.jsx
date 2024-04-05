import React, { useState, useEffect } from 'react'
import logo from '../assets/chigatoy.jpg'
import shopBag from '../assets/shopping-bag.png'
import close from '../assets/close-svgrepo-com.svg'
import ShopBAG from '../shared/ShopBAG'
import { List } from '../arrays/ListUL'

function Navbar({ bag }) {
	const [showBag, setShowBag] = useState(false)
	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		setCartItems(bag.map(item => ({ ...item, quantity: 1 })))
	}, [bag])

	const handleShowBag = () => {
		setShowBag(!showBag)
	}

	const increaseQuantity = index => {
		const updatedCartItems = [...cartItems]
		updatedCartItems[index].quantity++
		setCartItems(updatedCartItems)
	}

	const decreaseQuantity = index => {
		const updatedCartItems = [...cartItems]
		if (updatedCartItems[index].quantity > 1) {
			updatedCartItems[index].quantity--
			setCartItems(updatedCartItems)
		}
	}

	return (
		<>
			<div className='navbar bg-base-100 font-Poppins fixed w-full z-[999]'>
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

						<div className='navbar-center'>
							<ul
								tabIndex={0}
								className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
							>
								{List.map(list => (
									<li key={list.title}>
										<a>{list.title}</a>
									</li>
								))}
							</ul>
						</div>
					</div>
					<img
						src={logo}
						alt='logo'
						className='w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-full'
					/>
				</div>
				<div className='navbar-center hidden lg:flex'>
					<ul className='menu menu-horizontal px-1'>
						{List.map(list => (
							<li key={list.title}>
								<a>{list.title}</a>
							</li>
						))}
					</ul>
				</div>
				<div className='navbar-end'>
					<img
						src={shopBag}
						alt='bag'
						className='w-10 h-10 md:w-12 md:h-12 cursor-pointer'
						onClick={handleShowBag}
					/>
				</div>
				{showBag && (
					<ShopBAG
						close={close}
						decreaseQuantity={decreaseQuantity}
						handleShowBag={handleShowBag}
						increaseQuantity={increaseQuantity}
						cartItems={cartItems}
					/>
				)}
			</div>
		</>
	)
}

export default Navbar
