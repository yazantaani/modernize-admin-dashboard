'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import UserList from '../components/users/UserList';
import UserStatistics from '../components/users/UserStatistics';
import UserActivity from '../components/users/UserActivity';

const Users = () => {
  return (
    <PageContainer title="Users" description="Manage and view user data">
      <Box>
        <Grid container spacing={3}>
          {/* User List takes full width */}
          <Grid item xs={12}>
            <UserList />
          </Grid>          
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Users;
