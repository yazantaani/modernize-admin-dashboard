import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { addTrip, fetchTrips } from "@/app/redux/App/tripSlice";
import {
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBar from "../users/SearchBar"; // Reusable search bar component
import AddTripModal from "./AddTripModal";
const TripList = () => {
  const dispatch = useAppDispatch();
  const { trips, loading, error } = useAppSelector((state) => state.trip);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchTrips());
    }
  }, [dispatch]);

  const handleAddTrip = (newTrip: any) => {
    dispatch(addTrip(newTrip))
      .unwrap()
      .then(() => {
        alert("Trip added successfully!");
      })
      .catch((error) => {
        alert(`Failed to add trip: ${error}`);
      });
  };

  // Filter trips based on search query
  const filteredTrips = trips.filter(
    (trip) =>
      trip.fromLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.toLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ width: "100%", margin: "0 auto", py: 3 }}>
      {/* Header Row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold">
          Trip List
        </Typography>

        {/* Action Row (Search Bar + Add Button) */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips..."
          />

          {/* Add Trip Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setIsModalOpen(true)} // Open the modal
          >
            Add Trip
          </Button>
        </Box>
      </Box>

      {/* Add Trip Modal */}
      <AddTripModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onAddTrip={handleAddTrip} // Handle adding a trip
      />

      {/* Trip Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}> {/* Light gray background */}
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>From Location</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>To Location</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Trip Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Service Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price Per KG</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
                <TableRow key={trip.tripId}>
                  <TableCell>{trip.tripId}</TableCell>
                  <TableCell>{trip.fromLocation}</TableCell>
                  <TableCell>{trip.toLocation}</TableCell>
                  <TableCell>{trip.tripDate}</TableCell>
                  <TableCell>{trip.serviceType}</TableCell>
                  <TableCell>{trip.pricePerKg}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No trips found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TripList;
