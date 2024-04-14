import axios from 'axios'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Product } from '../models/product'
import { Filter, SelectedFilters } from '../models/filter'

type ProductsContext = {
  products: any
  setProducts: any
  filters: any
  setFilters: any
  selectedFilters: any
  setSelectedFilters: any
}

const ProductsData = createContext<ProductsContext>({
  products: [],
  setProducts() {},
  filters: [],
  setFilters() {},
  selectedFilters: '',
  setSelectedFilters() {},
})

type Props = {
  children: React.ReactNode
}

const ProductsProvider = ({ children }: Props): React.ReactElement => {
  const Api = 'https://gymbeam.sk/rest/V1/gb/catalog/products?category_ids[]=2416'

  const [products, setProducts] = useState<Product[]>()
  const [filters, setFilters] = useState<Filter[]>()
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({})

  console.log(filters, products)

  const handleGetProducts = useCallback(() => {
    axios({
      method: 'get',
      url: Api,
      headers: {
        ' Content-Type': ' application/json',
      },
    })
      .then((response) => {
        setProducts(response.data.items)
        setFilters(response.data.filters)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    handleGetProducts()
  }, [])

  const handleGetProductsByFilter = useCallback(() => {
    axios({
      method: 'get',
      url: Api,
      headers: {
        ' Content-Type': ' application/json',
      },
      params: selectedFilters,
    })
      .then((response) => {
        setProducts(response.data.items)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [selectedFilters])

  useEffect(() => {
    handleGetProductsByFilter()
  }, [selectedFilters])

  const providerValue: ProductsContext = {
    products,
    setProducts,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
  }

  return <ProductsData.Provider value={providerValue}>{children}</ProductsData.Provider>
}

const useProducts = (): ProductsContext => useContext<ProductsContext>(ProductsData)

export default ProductsProvider
export { ProductsData, useProducts }
