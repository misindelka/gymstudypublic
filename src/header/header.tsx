import * as React from 'react'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { primaryrRose, primButtonBg, primButtonText, unslectedFilter } from '../muiStyesProps'
import { categories } from '../mocks/categories'
import { Button } from '@mui/material'

import './header.css'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'default',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export const Header = (): React.ReactElement => {
  const isCategorySlected = (value: string) => value === 'Sports nutrition'

  return (
    <Box>
      <Box sx={{ flexGrow: 1, mb: '20px' }}>
        <AppBar position="static" sx={{ background: unslectedFilter }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, minWidth: '120px' }}
            >
              <img className="logo" src="./assets/GB_Logo.jpeg" alt="LOGO" />
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
            <AccountCircleOutlinedIcon sx={{ color: 'black', mr: '20px' }} />
            <ShoppingBagOutlinedIcon sx={{ color: 'black' }} />
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        display={'flex'}
        flexDirection={{ md: 'row', xs: 'column' }}
        justifyContent={'space-around'}
        ml={1}
      >
        {categories?.map((category) => (
          <Button
            variant="contained"
            sx={{
              backgroundColor: isCategorySlected(category.name) ? primaryrRose : unslectedFilter,
              '&.MuiButtonBase-root': primButtonText,
              '&:hover': {
                backgroundColor: isCategorySlected(category.name) ? primaryrRose : primButtonBg,
              },
              m: 1,
              height: { sx: '50px', md: '30px' },
              maxWidth: '400px',
            }}
            key={category.name}
            onClick={() => null}
          >
            {category.name}
          </Button>
        ))}
      </Box>
    </Box>
  )
}
