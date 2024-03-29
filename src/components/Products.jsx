import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { app, db } from '../firebase/firebaseConfig'
import { collection, getFirestore } from 'firebase/firestore'

function Products() {
	const [products] = useCollection(collection(getFirestore(app), 'products'), {
		snapshotListenOptions: { includeMetadataChanges: true },
	})

	return (
		<div>
			<h1>Products</h1>
			<div className='products'>
				{products &&
					products.docs.map(product => (
						<div key={product.id} className='product'>
							<h2>{product.data().name}</h2>
							<p>{product.data().desc}</p>
							<img src={product.data().image} alt={product.data().name} />
						</div>
					))}
			</div>
		</div>
	)
}

export default Products
