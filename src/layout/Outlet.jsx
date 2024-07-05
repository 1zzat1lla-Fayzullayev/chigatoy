import React, { useState } from 'react'
import FirstFoods from '../components/foods/FirstFoods'
import Salats from '../components/foods/Salats'
import SecondFoods from '../components/foods/SecondFoods'
import Header from '../components/Header'
import Main from '../components/Main'
import MarqueeFood from '../components/MarqueeFood'
import Shashlik from '../components/foods/Shashlik'
import Menu from '../shared/Menu'
import { useLocalStorage } from '../context/useLocalStorage'
import { useQuantity } from '../context/useQuantity'

function Outlet() {
	const [selectedCard, setSelectedCard] = useLocalStorage(
		'selectedCard',
		null
	)
	const [menuItems, setMenuItems, clearMenuItems] = useLocalStorage(
		'menuItems',
		[]
	)
	const { quantity, increment, decrement, setQuantity } = useQuantity(1)
	const [showMenu, setShowMenu] = useState(false)

	const addToMenu = card => {
		if (!menuItems.find(item => item.cardname === card.cardname)) {
			setMenuItems([...menuItems, card])
		}
	}

	const handleClear = () => {
		clearMenuItems()
    	console.log('aa')
	}

	const calculateTotalPrice = () => {
		if (!selectedCard) return '0'
		return (selectedCard.cardprice * quantity).toFixed(2)
	}

	return (
		<div className='absolute top-0 -z-10 h-full w-full bg-white'>
			<div className='absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]'></div>
			<Header selectedCard={selectedCard} setSelectedCard={setSelectedCard} menuItems={menuItems}
			/> <Main />
			<MarqueeFood />
			<Salats setSelectedCard={setSelectedCard} selectedCard={selectedCard} addToMenu={addToMenu} increment={increment} decrement={decrement} calculateTotalPrice={calculateTotalPrice} setQuantity={setQuantity} quantity={quantity} />
			<FirstFoods setSelectedCard={setSelectedCard} selectedCard={selectedCard} addToMenu={addToMenu} increment={increment} decrement={decrement} calculateTotalPrice={calculateTotalPrice} setQuantity={setQuantity} quantity={quantity} />
			<SecondFoods setSelectedCard={setSelectedCard} selectedCard={selectedCard} addToMenu={addToMenu} increment={increment} decrement={decrement} setQuantity={setQuantity} quantity={quantity} />
			<Shashlik setSelectedCard={setSelectedCard} selectedCard={selectedCard} addToMenu={addToMenu} increment={increment} decrement={decrement} calculateTotalPrice={calculateTotalPrice} setQuantity={setQuantity} quantity={quantity} />
			{showMenu && (
			<Menu showMenu={showMenu} setShowMenu={setShowMenu} menuItems={menuItems} handleClear={handleClear} handleDecrement={decrement} handleIncrement={increment} calculateTotalPrice={calculateTotalPrice} />
			)}
		</div>
	)
}

export default Outlet
