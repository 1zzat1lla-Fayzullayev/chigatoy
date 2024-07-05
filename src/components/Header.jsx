import React, { useState } from 'react'
import Logo from '../shared/header/Logo'
import List from '../shared/header/List'
import images from '../ImportedPictures'
import Wrapper from '../layout/Wrapper'
import MobileHeader from '../shared/header/MobileHeader'
import Menu from '../shared/Menu'

function Header({ selectedCard, menuItems }) {
	const [showMobileHeader, setShowMobileHeader] = useState(false)
	const [showMenu, setShowMenu] = useState(false)

	const handleOpenNavbar = () => {
		setShowMobileHeader(!showMobileHeader)
	}

	const handleShowMenu = () => {
		setShowMenu(!showMenu)
	}

	return (
		<>
			<header className='glass-effect py-[5px] px-[5px] rounded-[5px] fixed w-full z-[100] select-none'>
				<Wrapper>
					<div className='flex justify-between items-center px-[10px] md:px-0'>
						<Logo />
						<List />
						<div className='flex items-center gap-[20px]'>
							<div className='relative'>
								<img
									src={images.shoppingBag}
									alt='shopping-bag'
									className='w-[30px] cursor-pointer'
									onClick={handleShowMenu}
								/>
								<div className='absolute top-[-5px] right-[-5px] w-[15px] h-[15px] rounded-full bg-[#0080004a] text-center flex justify-center items-center font-bold text-[#8C000E] text-[11px]'>
									{menuItems.length}
								</div>
							</div>
							<div
								className='flex flex-col items-center gap-[7px] cursor-pointer sm:hidden mt-[3px]'
								onClick={handleOpenNavbar}
							>
								<div className='bg-black w-[30px] h-[2px]'></div>
								<div className='bg-black w-[30px] h-[2px]'></div>
								<div className='bg-black w-[30px] h-[2px]'></div>
							</div>
						</div>
					</div>
				</Wrapper>
			</header>

			{showMobileHeader && <MobileHeader openNavbar={handleOpenNavbar} />}
			<Menu
				showMenu={showMenu}
				openMenu={handleShowMenu}
				setShowMenu={setShowMenu}
				selectedCard={selectedCard}
				menuItems={menuItems}
			/>
		</>
	)
}

export default Header
