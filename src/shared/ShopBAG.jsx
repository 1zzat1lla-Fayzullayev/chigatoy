// ShopBAG.js
import React from 'react'

function ShopBAG({
	handleShowBag,
	close,
	increaseQuantity,
	decreaseQuantity,
	cartItems,
}) {
	return (
		<div>
			<div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 shadow-2xl z-[9999]'>
				<div className='absolute top-0 right-0 h-full w-3/5 md:w-2/6 bg-white  overflow-y-auto transform translate-x-0 transition duration-400 ease-in-out'>
					<div onClick={handleShowBag}>
						<img
							src={close}
							alt='close svg'
							className='w-10 h-10 cursor-pointer absolute top-3 right-3'
						/>
					</div>
					<div className='mt-[100px] flex justify-center items-center flex-col gap-5'>
						{cartItems && cartItems.length > 0 ? (
							cartItems.map((product, index) => (
								<div
									key={index}
									className='flex flex-col mx-[5px] bg-base-300 p-1 md:p-5 rounded-[10px]'
								>
									<p className='text-[20px] md:text-[25px] font-semibold'>
										{product.name}
									</p>
									<img
										src={product.image}
										alt={product.name}
										className='w-[350px] rounded-[10px] object-cover'
									/>
									<div className='flex justify-between items-center gap-2 mt-[10px]'>
										<button
											className='btn p-3 md:text-[20px] bg-green-500 text-white hover:bg-green-700'
											onClick={() => increaseQuantity(index)}
										>
											+
										</button>
										<p className='md:text-[18px] font-bold'>
											{product.price * product.quantity} so'm
										</p>
										<button
											className='btn p-3 md:text-[20px] bg-red-500 text-white hover:bg-red-700'
											onClick={() => decreaseQuantity(index)}
										>
											-
										</button>
									</div>
								</div>
							))
						) : (
							<p>Hali hech qanday taom qo'shmadingiz :)</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ShopBAG
