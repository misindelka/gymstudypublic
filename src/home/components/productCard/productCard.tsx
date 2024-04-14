import React from 'react'
import { Card, CardMedia, Typography, Box } from '@mui/material'
import { RatingStars } from './components/ratingStars'

import { Product } from '../../../models/product'
import { primaryrRose } from '../../../muiStyesProps'

type Props = {
  product: Product
}

export const ProductCard = (props: Props): React.ReactElement => {
  return (
    <Box display={'flex'} flexDirection={'row'} mt={4}>
      <Card sx={{ maxWidth: 270, height: 470, margin: '10px' }}>
        <CardMedia
          component="img"
          height="300"
          image={props?.product?.thumbnail}
          alt={props.product.name}
        />
        <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
          <Box>
            <Typography ml={2} variant="h6" height={'70px'}>
              {props.product.name}
            </Typography>
          </Box>
          <RatingStars value={props?.product?.rating_summary} />
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
          >
            <Typography ml={2} color={primaryrRose}>
              start at:
            </Typography>
            <Typography ml={1} variant="h6" color={primaryrRose}>
              {props?.product?.formatted_price}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
