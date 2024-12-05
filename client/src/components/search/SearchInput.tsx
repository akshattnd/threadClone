import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";

const SearchInput: React.FC = () => {
  const { darkMode } = useSelector(({ service }: RootState) => service);
  return (
    <TextField
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              sx={{
                color: darkMode ? "white" : "gray",
              }}
              aria-label="search"
            >
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" }, // Responsive width
        maxWidth: "749px",
        paddingTop: "1rem",
        height: "4rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        borderRadius: "15px",
        backgroundColor: darkMode ? "black" : "white",
        my: 5,
        mx: "auto",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "inherit",
          color: darkMode ? "white" : "black",
          "& fieldset": {
            border: "none", // Removes default border
          },
        },
        "& .MuiInputBase-input": {
          padding: "10px 12px", // Adjusted padding for better alignment
        },
      }}
    />
  );
};

export default SearchInput;
