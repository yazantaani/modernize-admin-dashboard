"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { fetchUserShipments } from "@/app/redux/App/shipmentSlice";
import SearchBar from "../users/SearchBar"; // Assume SearchBar is a reusable component

const Shipments = () => {
  const dispatch = useAppDispatch();
  const { userShipments, loading, error } = useAppSelector(
    (state) => state.shipment
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch shipments on component mount
  useEffect(() => {
    dispatch(fetchUserShipments());
  }, [dispatch]);

  // Filter shipments based on the search query
  const filteredShipments = userShipments.filter(
    (shipment) =>
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.originAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destinationAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered shipments
  const paginatedShipments = filteredShipments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%", margin: "0 auto", py: 3 }}>
      {/* Header with Title, SearchBar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Shipments List
        </Typography>
        <Box display="flex" gap={2}>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shipments..."
          />
        </Box>
      </Box>

      {/* Loading state */}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error state */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Table */}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Tracking Number</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Origin Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Destination Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Current Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Estimated Delivery Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Carrier ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedShipments.map((shipment) => (
                <TableRow key={shipment.shipmentId}>
                  <TableCell>{shipment.shipmentId}</TableCell>
                  <TableCell>{shipment.trackingNumber}</TableCell>
                  <TableCell>{shipment.originAddress}</TableCell>
                  <TableCell>{shipment.destinationAddress}</TableCell>
                  <TableCell>{shipment.currentStatus}</TableCell>
                  <TableCell>{shipment.currentLocation}</TableCell>
                  <TableCell>{shipment.estimatedDeliveryDate}</TableCell>
                  <TableCell>{shipment.carrierId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredShipments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(Number(event.target.value))
        }
      />
    </Box>
  );
};

export default Shipments;
