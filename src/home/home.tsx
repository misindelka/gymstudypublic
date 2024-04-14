import { ProductsList } from './components/producstList/productsList'
import { Box } from '@mui/material'
import ProductsProvider from '../context/productsContext'
import { SidebarNav } from './sidebarNav/sidebarNav'

export const Home = (): React.ReactElement => {
  return (
    <Box display={'flex'} flexDirection={{ md: 'row', xs: 'column' }}>
      <ProductsProvider>
        <SidebarNav />
        <ProductsList />
      </ProductsProvider>
    </Box>
  )
}
