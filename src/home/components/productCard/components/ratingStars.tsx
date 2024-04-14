import { Box, Typography, Rating } from '@mui/material'
import React from 'react'
import { primaryrRose } from '../../../../muiStyesProps'

type Props = {
  value: number
}

export const RatingStars = ({ value }: Props): React.ReactElement => {
  return (
    <div>
      <Box
        sx={{ display: 'flex', flexDirection: 'row' }}
        component="fieldset"
        borderColor="transparent"
      >
        <Rating
          sx={{
            '& .MuiRating-iconFilled': {
              color: primaryrRose,
            },
          }}
          name="customized-10"
          precision={0.1}
          max={5}
          value={value / 2 / 10}
          readOnly
        />
        <Typography ml={1}>{value} %</Typography>
      </Box>
    </div>
  )
}
