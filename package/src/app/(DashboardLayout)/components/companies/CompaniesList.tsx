'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  IconButton,
  Avatar,
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AddEditCompanyDialog from '../companies/AddEditCompanyDialog';
import ConfirmDeleteDialog from '../users/ConfirmDeleteDialog';
import SearchBar from '../users/SearchBar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Company {
  id: number;
  name: string;
  email: string;
  industry: string;
  logo: string;
  status: 'Active' | 'Inactive';
}

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      email: 'info@techsolutions.com',
      industry: 'Technology',
      logo: '/images/companies/2314025.jpg',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Green Energy Ltd.',
      email: 'contact@greenenergy.com',
      industry: 'Energy',
      logo: '/images/companies/38_GreenEnergy.jpg',
      status: 'Inactive',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<Company | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteCompanyId, setDeleteCompanyId] = useState<number | null>(null);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEditDialogOpen = (company: Company | null) => {
    setEditCompany(company);
    setIsAddEditDialogOpen(true);
  };

  const handleAddEditDialogClose = () => {
    setEditCompany(null);
    setIsAddEditDialogOpen(false);
  };

  const handleSaveCompany = (company: Company) => {
    if (company.id) {
      setCompanies((prev) => prev.map((c) => (c.id === company.id ? company : c)));
    } else {
      setCompanies((prev) => [...prev, { ...company, id: Date.now() }]);
    }
  };

  const handleDeleteDialogOpen = (id: number) => {
    setDeleteCompanyId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteCompanyId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCompanyId !== null) {
      setCompanies((prev) => prev.filter((company) => company.id !== deleteCompanyId));
    }
    handleDeleteDialogClose();
  };

  const handleStatusChange = (id: number, newStatus: 'Active' | 'Inactive') => {
    setCompanies((prev) =>
      prev.map((company) => (company.id === id ? { ...company, status: newStatus } : company))
    );
  };

  return (
    <Box sx={{ width: '100%', margin: '0 auto', py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Companies List
        </Typography>
        <Box display="flex" gap={2}>
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddEditDialogOpen(null)}
            startIcon={<AddCircleOutlineIcon />}
            sx={{ borderRadius: '8px', px: 4 }}
          >
            Add Company
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
              <TableCell>Logo</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                <Avatar
                    src={company.logo}
                    alt={company.name}
                    sx={{
                    width: 64,
                    height: 64, 
                    }}
                />               
                </TableCell>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>
                  <Select
                    value={company.status}
                    onChange={(e) => handleStatusChange(company.id, e.target.value as 'Active' | 'Inactive')}
                    size="small"
                    sx={{
                      backgroundColor: company.status === 'Active' ? '#e8f5e9' : '#ffebee',
                      color: company.status === 'Active' ? '#388e3c' : '#d32f2f',
                      fontWeight: 'bold',
                    }}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleAddEditDialogOpen(company)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteDialogOpen(company.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 30,50,100]}
        component="div"
        count={filteredCompanies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(Number(event.target.value))}
      />

      <AddEditCompanyDialog
        open={isAddEditDialogOpen}
        company={editCompany}
        onClose={handleAddEditDialogClose}
        onSave={handleSaveCompany}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default CompaniesList;
