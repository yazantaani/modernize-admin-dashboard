'use client';

import React, { use, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Co2Icon from "@mui/icons-material/Co2";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { fetchTripDetails } from "@/app/redux/App/tripSlice";
import FlightIcon from "@mui/icons-material/Flight"; 

const TripDetails = () => {
  const { tripId } = useParams(); // Get tripId from the URL params
  const dispatch = useAppDispatch();
  const { tripDetails, loading, error } = useAppSelector((state) => state.trip); // Access Redux state

  useEffect(() => {
    if (tripId) {
      dispatch(fetchTripDetails(Number(tripId))); // Dispatch thunk to fetch trip details
    }
  }, [tripId, dispatch]);

  const formatDuration = (minutes: number) => {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    return `${days}d ${hours}h`;
  };

  const calculateTotalCO2 = () => {
    if (!tripDetails || !tripDetails.details) return "0.00";
    const total = tripDetails.details.reduce(
      (sum, detail) => sum + parseFloat(detail.CO2Emissions),
      0
    );
    return total.toFixed(2);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!tripDetails) return <Alert severity="warning">No trip details found</Alert>;
  if (!tripDetails.details || tripDetails.details.length === 0)
    return <Alert severity="info">No journey details available.</Alert>;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{ mb: 3 }}
        variant="outlined"
        color="primary"
      >
        Back to Trips
      </Button>

      {/* Trip Overview */}
      <Card
  sx={{
    mb: 4,
    p: 3,
    borderRadius: 4,
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(135deg, #6A5ACD, #1E90FF)", // Gradient background
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    position: "relative", // Enable relative positioning for child elements
  }}
>
  {/* Service Type Chip */}
  <Chip
    label={tripDetails.serviceType.toUpperCase()}
    sx={{
      fontWeight: "bold",
      fontSize: "0.85rem",
      background: "rgba(255, 255, 255, 0.2)",
      color: "white",
      borderRadius: 2,
      paddingX: 1.5,
      position: "absolute", // Position chip in top-right corner
      top: 16,
      right: 16,
    }}
  />

  {/* Trip Route */}
  <Typography
    variant="h4"
    sx={{
      fontWeight: "bold",
      mb: 1,
      letterSpacing: 1,
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Subtle text shadow
    }}
  >
    {tripDetails.fromLocation} → {tripDetails.toLocation}
  </Typography>

  {/* Trip Details */}
  <Box sx={{ mt: 2 }}>
    <Typography
      variant="body1"
      sx={{
        fontSize: "1rem",
        fontWeight: 500,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
        mb: 1,
      }}
    >
      <strong>Trip Date:</strong> {new Date(tripDetails.tripDate).toLocaleDateString()}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontSize: "1rem",
        fontWeight: 500,
        color: "#FFD700", 
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
       <strong>Total CO₂ Emissions:</strong> {calculateTotalCO2()} kg
    </Typography>
  </Box>
</Card>

      {/* Journey Breakdown */}
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        Journey Breakdown
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {tripDetails.details.map((detail) => (
        <Card
          key={detail.detailId}
          sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: 3,
            overflow: "hidden",
            border: `3px solid ${
              detail.vehicleType === "ship"
                ? "#1976d2"
                : detail.vehicleType === "truck"
                ? "#4caf50"
                : "#f57c00" // Orange for air
            }`,
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor:
                    detail.vehicleType === "ship"
                      ? "#1976d2"
                      : detail.vehicleType === "truck"
                      ? "#4caf50"
                      : "#f57c00", // Orange for air
                }}
              >
                {detail.vehicleType === "ship" ? (
                  <DirectionsBoatIcon />
                ) : detail.vehicleType === "truck" ? (
                  <LocalShippingIcon />
                ) : (
                  <FlightIcon /> // Plane icon for air
                )}
              </Avatar>
            }
            title={`Step ${detail.sequenceNumber}: ${detail.departureLocation} → ${detail.arrivalLocation}`}
            subheader={new Date(detail.estimatedArrival).toLocaleDateString()}
            titleTypographyProps={{ variant: "h6" }}
            subheaderTypographyProps={{ color: "text.secondary" }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" color="text.secondary">
                  {detail.routeDescription}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", fontWeight: 500 }}
                  >
                    <ScheduleIcon fontSize="medium" /> Duration: {formatDuration(detail.estimatedTimeMinutes)}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", fontWeight: 500 }}
                  >
                    <Co2Icon fontSize="medium" /> {detail.CO2Emissions} kg CO₂
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", fontWeight: 500, color: "text.secondary" }}
                  >
                    <strong>Vehicle:</strong> {detail.vehicleModel} ({detail.vehicleType})
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1rem", fontWeight: 500, color: "text.secondary" }}
                  >
                    <strong>Carrier:</strong> {detail.carrierCompany}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* Footer */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">Total Steps: {tripDetails.details.length}</Typography>
      </Box>
    </Box>
  );
};

export default TripDetails;