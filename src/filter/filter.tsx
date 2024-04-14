import React from 'react'
import { useProducts } from '../context/productsContext'
import { Filter, SelectedFilters } from '../models/filter'
import { sortFiltersByType } from '../helpers/filterHelpers'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import {
  primButtonBg,
  primButtonHoverBg,
  primButtonText,
  primaryrRose,
  unslectedFilter,
} from '../muiStyesProps'

export const FilterComponent = (): React.ReactElement => {
  const { filters, setSelectedFilters, selectedFilters } = useProducts()

  const handleSelectFilters = (code: string, value: string) => {
    const isCodeInFilter = Object.keys(selectedFilters).includes(code)
    const isValueInCode = selectedFilters[code]?.includes(value)

    if (!isCodeInFilter || !isValueInCode) {
      setSelectedFilters({
        ...selectedFilters,
        [code]: [...(selectedFilters[code] || []), value],
      })
    } else {
      const filterValue = {
        ...selectedFilters,
        [code]: selectedFilters[code].filter((item: string) => item !== value),
      }
      return setSelectedFilters(
        Object.entries(filterValue).reduce((acc: SelectedFilters, [key, value]: [string, any]) => {
          if (value.length > 0) {
            acc[key] = value
          }
          return acc
        }, {})
      )
    }
  }

  const isFilterSelected = (val: string) =>
    Object.values(selectedFilters).some((filter: any) => filter?.includes(val))

  return (
    <>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
        {sortFiltersByType(filters)?.map(
          ({ global_name, options, type, code }: Filter) =>
            type === 'checkbox' && (
              <Box display={'flex'} ml={2}>
                {options.map(({ value }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isFilterSelected(value)}
                          color="default"
                          sx={{
                            color: isFilterSelected(value) ? primaryrRose : primButtonHoverBg,
                          }}
                        />
                      }
                      label={global_name}
                      onClick={() => handleSelectFilters(code, value)}
                      sx={{
                        marginLeft: '2px',
                      }}
                    />
                  </FormGroup>
                ))}
              </Box>
            )
        )}
      </Box>
      <Box>
        {sortFiltersByType(filters)?.map(
          ({ name, global_name, options, type, code }: Filter) =>
            type === 'multiselect' && (
              <>
                <Box display={'flex'} flexDirection={{ md: 'row', sx: 'column' }}>
                  <Box key={name}>
                    <Box p={2}>
                      <Typography variant="h6">{global_name}</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} ml={4} mr={2}>
                      {/* .slice(0, 10) */}
                      {options?.slice(0, 10).map(({ value, name, count }) => (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: isFilterSelected(value)
                              ? primaryrRose
                              : unslectedFilter,
                            '&.MuiButtonBase-root': primButtonText,
                            '&:hover': {
                              backgroundColor: isFilterSelected(value)
                                ? primaryrRose
                                : primButtonBg,
                            },
                            m: 1,
                            height: { sx: '50px', md: '30px' },
                          }}
                          key={value}
                          onClick={() => handleSelectFilters(code, value)}
                        >
                          <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            key={name}
                          >
                            <Typography variant="body1">{name}</Typography>
                            <Typography variant="caption" ml={2}>
                              {count}
                            </Typography>
                          </Box>
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Divider variant="middle" sx={{ marginTop: '10px' }} />
              </>
            )
        )}
      </Box>
    </>
  )
}
