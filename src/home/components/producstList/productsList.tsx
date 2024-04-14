import { ProductCard } from '../productCard/productCard'
import { useProducts } from '../../../context/productsContext'

import { Product } from '../../../models/product'
import { FilterComponent } from '../../../filter/filter'
import { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { primButtonBg, primButtonHoverBg, primButtonText } from '../../../muiStyesProps'

export const ProductsList = (): React.ReactElement => {
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const { products, setSelectedFilters } = useProducts()

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={{ md: 'flex-end', xs: 'center' }}
        m={2}
        mr={{ md: 8 }}
      >
        <Button
          variant="contained"
          sx={{
            maxWidth: '200px',
            background: primButtonBg,
            '&.MuiButtonBase-root': primButtonText,
            '&:hover': {
              backgroundColor: primButtonHoverBg,
            },
            mr: 2,
          }}
          onClick={() => setShowFilters(!showFilters)}
        >
          Show All Filters
        </Button>
        <Button
          variant="contained"
          sx={{
            maxWidth: '150px',
            background: primButtonBg,
            '&.MuiButtonBase-root': primButtonText,
            '&:hover': {
              backgroundColor: primButtonHoverBg,
            },
          }}
          onClick={() => setSelectedFilters({})}
        >
          RESET FILTERS
        </Button>
      </Box>

      {showFilters ? (
        <FilterComponent />
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems={'center'}>
          {products?.map((product: Product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </Grid>
      )}
    </Box>
  )
}
