import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { app } from '../firebase/firebaseConfig'
import { collection, getFirestore } from 'firebase/firestore'

function Products({ addToBag }) {
	const [products, loading, error] = useCollection(
		collection(getFirestore(app), 'products'),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	)

	const handleAddToBag = product => {
		addToBag(product)
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-[100vh] overflow-y-hidden'>
				<span className='loading loading-ring loading-lg text-red-500'></span>
			</div>
		)
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div className='flex justify-center items-center flex-col font-Poppins pt-[100px]'>
			<h1 className='text-[25px] md:text-[40px] font-semibold my-[20px]'>
				Taomlar
			</h1>
			<div className='flex flex-wrap justify-center'>
				{products &&
					products.docs.map(product => (
						<div
							key={product.id}
							className='card card-compact m-4 bg-base-100 shadow-xl rounded-[10px]'
							style={{ maxWidth: '300px' }}
						>
							<figure>
								<img
									src={product.data().image}
									alt={product.data().name}
									className='rounded-[10px]'
									style={{ maxHeight: '200px' }}
								/>
							</figure>
							<div className='card-body'>
								<h2 className='card-title text-[30px] my-[5px]'>
									{product.data().name}
								</h2>
								{/* <p className='text-[gray] text-[17px]'>
									{product?.data().desc}
								</p> */}
								<p className='text-[19px] text-green-600 font-bold'>
									{product.data().price} so'm
								</p>
								<div className='w-full'>
									<button
										className='btn btn-primary w-full mt-[20px]'
										onClick={() => handleAddToBag(product.data())}
									>
										Savatga qo'shish
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default Products
