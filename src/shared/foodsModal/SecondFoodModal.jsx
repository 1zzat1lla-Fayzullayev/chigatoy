import React from 'react'
import images from '../../ImportedPictures'

function SecondFoodModal({
	handleCloseModal,
	selectedCard,
	decrement,
	quantity,
	increment,
	calculateTotalPrice,
	addToMenu,
	selectedOption,
	handleOptionChange,
}) {
	return (
		<>
			<dialog id='secondfood-modal' className='modal font-Poppins'>
				<div className='modal-box bg-[#fffffffe]'>
					<img
						src={images.close}
						alt='close'
						className='w-[30px] absolute right-0 top-0 cursor-pointer'
						onClick={handleCloseModal}
					/>
					{selectedCard && (
						<>
							<img
								src={selectedCard.cardpicture}
								alt={selectedCard.cardname}
								className='w-full h-[200px] object-cover rounded-t-lg'
							/>
							<h4 className='text-lg font-semibold mt-4'>
								{selectedCard.cardname}
							</h4>
							<p className='text-sm mt-2'>{selectedCard.carddescreption}</p>
							{selectedCard.firstprice !== null &&
								selectedCard.secondprice !== null && (
									<div className='flex flex-col'>
										<div className='flex gap-2'>
											<input
												type='radio'
												name='option'
												id='por'
												checked={selectedOption === 'por'}
												onChange={() => handleOptionChange('por')}
											/>
											<label htmlFor='por'>1 por</label>
										</div>
										<div className='flex gap-2'>
											<input
												type='radio'
												name='option'
												id='kg'
												checked={selectedOption === 'kg'}
												onChange={() => handleOptionChange('kg')}
											/>
											<label htmlFor='kg'>1 kg</label>
										</div>
									</div>
								)}
							<p className='text-lg font-bold text-red-500 mt-4'>
								{calculateTotalPrice()} so'm
							</p>
							<div className='flex items-center gap-[10px]'>
								<button className='text-[35px] select-none' onClick={decrement}>
									-
								</button>
								<span className='text-[35px] select-none'>{quantity}</span>
								<button className='text-[35px] select-none' onClick={increment}>
									+
								</button>
								<img
									src={images.shoppingBag}
									alt='bag'
									className='w-[30px] cursor-pointer ml-[50px] select-none'
									onClick={() => addToMenu(selectedCard)}
								/>
							</div>
						</>
					)}
				</div>
			</dialog>
		</>
	)
}

export default SecondFoodModal
