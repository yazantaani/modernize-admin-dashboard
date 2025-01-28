import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { fetchPortCodes } from "@/app/redux/App/portSlice";
import { MenuItem } from "@mui/material";

const AddTripModal = ({ open, onClose, onAddTrip }: any) => {
  const dispatch = useAppDispatch();
  const { ports, loading } = useAppSelector((state) => state.ports);

  const [tripData, setTripData] = useState({
    companyId: "",
    fromLocation: "",
    toLocation: "",
    tripDate: "",
    serviceType: "",
    pricePerKg: "",
  });

  const handlePortSearch = (search: string) => {
    if (search) {
      dispatch(fetchPortCodes(search)); // Trigger API to fetch ports dynamically
    }
  };

  const handleSubmit = () => {
    if (
      !tripData.companyId ||
      !tripData.fromLocation ||
      !tripData.toLocation ||
      !tripData.tripDate ||
      !tripData.serviceType ||
      !tripData.pricePerKg
    ) {
      alert("All fields are required.");
      return;
    }
    onAddTrip(tripData); // Send trip data to parent component
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Trip</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          {/* Company ID */}
          <TextField
            label="Company ID"
            name="companyId"
            value={tripData.companyId}
            onChange={(e) =>
              setTripData({ ...tripData, companyId: e.target.value })
            }
            fullWidth
          />

          {/* From Location */}
          <Autocomplete
            freeSolo
            options={ports.map(
              (port) => `${port.port_name} (${port.port_code})`
            )}
            loading={loading}
            onInputChange={(e, value) => handlePortSearch(value)}
            onChange={(e, value) =>
              setTripData({ ...tripData, fromLocation: value || "" })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="From Location"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                  >
                    {loading && <CircularProgress size={20} />}
                    {params.InputProps.endAdornment}
                  </Box>
                  ),
                }}
              />
            )}
          />

          {/* To Location */}
          <Autocomplete
            freeSolo
            options={ports.map(
              (port) => `${port.port_name} (${port.port_code})`
            )}
            loading={loading}
            onInputChange={(e, value) => handlePortSearch(value)}
            onChange={(e, value) =>
              setTripData({ ...tripData, toLocation: value || "" })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="To Location"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                  >
                    {loading && <CircularProgress size={20} />}
                    {params.InputProps.endAdornment}
                  </Box>
                  ),
                }}
              />
            )}
          />

          {/* Trip Date */}
          <TextField
            label="Trip Date"
            name="tripDate"
            value={tripData.tripDate}
            onChange={(e) =>
              setTripData({ ...tripData, tripDate: e.target.value })
            }
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Service Type */}
          <TextField
            select
            label="Service Type"
            name="serviceType"
            value={tripData.serviceType}
            onChange={(e) =>
                setTripData({ ...tripData, serviceType: e.target.value })
            }
            fullWidth
            >
            <MenuItem value="land">Land</MenuItem>
            <MenuItem value="sea">Sea</MenuItem>
            <MenuItem value="air">Air</MenuItem>
            </TextField>

          {/* Price Per KG */}
          <TextField
            label="Price Per KG"
            name="pricePerKg"
            value={tripData.pricePerKg}
            onChange={(e) =>
              setTripData({ ...tripData, pricePerKg: e.target.value })
            }
            fullWidth
            type="number"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Trip
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTripModal;
