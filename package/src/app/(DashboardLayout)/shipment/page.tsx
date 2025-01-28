'use client';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ShipmentList from '../components/shipments/ShipmentList';
const Shipment = () => {
  return (
    <PageContainer title="Users" description="Manage and view user data">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ShipmentList />
          </Grid>          
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Shipment;
