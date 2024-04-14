import { useState } from 'react'
import { useProducts } from '../../context/productsContext'
import { Box, Button, Typography } from '@mui/material'
import { primaryrRose, primButtonText, unslectedFilter } from '../../muiStyesProps'

import { Filter } from '../../models/filter'

export const SidebarNav = (): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState<any>()
  const isCategorySelected = (value: any) => selectedCategory === value

  const { filters, setSelectedFilters, selectedFilters } = useProducts()

  const handleSelectFilters = (code: string, value: string) => {
    setSelectedFilters({})
    return setSelectedFilters({
      [code]: [value],
    })
  }

  const isFilterSelected = (val: string) =>
    Object.values(selectedFilters).some((filter: any) => filter?.includes(val))

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      minWidth={'220px'}
      p={2}
      m={2}
      sx={{ background: unslectedFilter }}
    >
      {filters?.slice(0, 10).map(
        ({ name, global_name, options, type, code }: Filter) =>
          type === 'multiselect' && (
            <Box key={name}>
              <Box display={'flex'}>
                <Box>
                  <Button
                    variant="text"
                    onClick={() => setSelectedCategory(name)}
                    sx={{
                      color: isCategorySelected(name) ? primaryrRose : unslectedFilter,
                      '&.MuiButtonBase-root': isCategorySelected(name)
                        ? primaryrRose
                        : primButtonText,
                    }}
                  >
                    {global_name}
                  </Button>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    ml={4}
                    mr={2}
                  >
                    {isCategorySelected(name) &&
                      options?.slice(0, 10).map(({ value, name }) => (
                        <Button
                          variant="text"
                          sx={{
                            '&.MuiButtonBase-root': {
                              color: isFilterSelected(value) ? primaryrRose : primButtonText,
                            },

                            height: { sx: '50px', md: '30px' },
                          }}
                          key={value}
                          onClick={() => handleSelectFilters(code, value)}
                        >
                          <Typography variant="body2">{name}</Typography>
                        </Button>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )
      )}
    </Box>
  )
}
