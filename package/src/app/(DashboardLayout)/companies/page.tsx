'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import CompaniesList from '../components/companies/CompaniesList';

const Users = () => {
  return (
    <PageContainer title="Users" description="Manage and view user data">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CompaniesList />
          </Grid>          
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Users;
