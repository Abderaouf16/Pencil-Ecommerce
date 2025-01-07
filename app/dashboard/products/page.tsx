import { db } from '@/server'
import React from 'react'
import placeHolder from '@/public/placeholder_small.jpg'
import { DataTable } from './dataTable'
import { columns } from './columns'

export default async function Products() {
  const products = await db.query.products.findMany({
    orderBy: (products, {desc}) => [desc(products.id)]
  })
  if(!products) throw Error('No products found')

    const dataTable = products.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        variant: [],
        image : placeHolder.src
      }
    })
    if(!dataTable) throw Error('No data found')

  return (
    <div> 
      <DataTable   columns={columns} data={dataTable}/>
    </div>
  )
}
