import React from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
}) => {
  return (
    <Box>
      <TextField
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: '#888' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: 250,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ddd',
            },
            '&:hover fieldset': {
              borderColor: '#ccc',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
