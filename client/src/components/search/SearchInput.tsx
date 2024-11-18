import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
const SearchInput: React.FC = () => {
  return (
    <>
      <TextField
        placeholder="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position={"start"}>
              <IconButton sx={{ color: "gray" }}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          width: "90%",
          maxWidth: "749px",
          boxShadow: "5px 5px 5px gray",
          borderRadius: "15px",
          px: 2,
          py: 1,
          my: 5,
          mx: "auto",
          "& .MuiOutlinedInput-root": {
            color: "black",
            "& fieldset": {
              border: "none",
            },
          },
        }}
      />
    </>
  );
};

export default SearchInput;
