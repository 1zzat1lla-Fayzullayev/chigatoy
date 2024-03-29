import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { app, db } from '../firebase/firebaseConfig'
import { collection, getFirestore } from 'firebase/firestore'

function Products() {
	const [products] = useCollection(collection(getFirestore(app), 'products'), {
		snapshotListenOptions: { includeMetadataChanges: true },
	})

	return (
		<div className='flex justify-center items-center flex-col font-Poppins'>
			<h1 className='text-[25px] md:text-[40px] font-semibold my-[20px]'>
				Taomlar
			</h1>
			<div className='flex flex-wrap justify-center'>
				{products &&
					products.docs.map(product => (
						<div
							key={product.id}
							className='card card-compact m-4 bg-base-100 shadow-xl rounded-[20px]'
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
								<h2 className='card-title'>{product.data().name}</h2>
								<p>{product.data().desc}</p>
								<div className='card-actions justify-end'>
									<button className='btn btn-primary'>Harid qilish</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default Products
