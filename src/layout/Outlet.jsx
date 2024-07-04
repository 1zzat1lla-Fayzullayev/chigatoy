import React, { useState, useEffect } from 'react'
import FirstFoods from '../components/foods/FirstFoods'
import Salats from '../components/foods/Salats'
import SecondFoods from '../components/foods/SecondFoods'
import Header from '../components/Header'
import Main from '../components/Main'
import MarqueeFood from '../components/MarqueeFood'
import Shashlik from '../components/foods/Shashlik'
import Menu from '../shared/Menu'

function Outlet() {
	const [selectedCard, setSelectedCard] = useState(null)
	const [menuItems, setMenuItems] = useState([])
	const [quantity, setQuantity] = useState(1)
	const [showMenu, setShowMenu] = useState(false)

	const addToMenu = card => {
		if (!menuItems.find(item => item.cardname === card.cardname)) {
			setMenuItems([...menuItems, card])
		}
	}

	useEffect(() => {
		const savedCard = localStorage.getItem('selectedCard')
		if (savedCard) {
			setSelectedCard(JSON.parse(savedCard))
		}
	}, [])

	useEffect(() => {
		if (selectedCard) {
			localStorage.setItem('selectedCard', JSON.stringify(selectedCard))
		} else {
			localStorage.removeItem('selectedCard')
		}
	}, [selectedCard])

	const handleIncrement = () => {
		setQuantity(prevQuantity => prevQuantity + 1)
	}

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity(prevQuantity => prevQuantity - 1)
		}
	}

	const calculateTotalPrice = () => {
		return selectedCard ? selectedCard.cardprice * quantity : 0
	}

	const openMenu = () => {
		setShowMenu(true)
	}

	return (
		<div className='absolute top-0 -z-10 h-full w-full bg-white'>
			<div className='absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]'></div>
			<Header
				selectedCard={selectedCard}
				setSelectedCard={setSelectedCard}
				menuItems={menuItems}
			/>
			<Main />
			<MarqueeFood />
			<Salats
				setSelectedCard={setSelectedCard}
				selectedCard={selectedCard}
				addToMenu={addToMenu}
				handleIncrement={handleIncrement}
				handleDecrement={handleDecrement}
				calculateTotalPrice={calculateTotalPrice}
				setQuantity={setQuantity}
				quantity={quantity}
			/>
			<FirstFoods
				setSelectedCard={setSelectedCard}
				selectedCard={selectedCard}
				addToMenu={addToMenu}
				handleIncrement={handleIncrement}
				handleDecrement={handleDecrement}
				calculateTotalPrice={calculateTotalPrice}
				setQuantity={setQuantity}
				quantity={quantity}
			/>
			<SecondFoods
				setSelectedCard={setSelectedCard}
				selectedCard={selectedCard}
				addToMenu={addToMenu}
				handleIncrement={handleIncrement}
				handleDecrement={handleDecrement}
				setQuantity={setQuantity}
				quantity={quantity}
			/>

			<Shashlik
				setSelectedCard={setSelectedCard}
				selectedCard={selectedCard}
				addToMenu={addToMenu}
				handleIncrement={handleIncrement}
				handleDecrement={handleDecrement}
				calculateTotalPrice={calculateTotalPrice}
				setQuantity={setQuantity}
				quantity={quantity}
			/>

			{showMenu && (
				<Menu
					showMenu={showMenu}
					openMenu={openMenu}
					setShowMenu={setShowMenu}
					selectedCard={selectedCard}
					menuItems={menuItems}
					selectedOption={selectedOption}
					calculateTotalPrice={calculateTotalPrice}
					handleIncrement={handleIncrement}
					handleDecrement={handleDecrement}
				/>
			)}
		</div>
	)
}

export default Outlet
