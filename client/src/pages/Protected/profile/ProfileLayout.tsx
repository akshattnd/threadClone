import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Instagram } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel } from "../../../rtk/slice";
import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../../rtk/store";

const ProfileLayout = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(({ service }: RootState) => service);
  return (
    <>
      <Stack
        gap={1}
        width={{ xs: "90%", sm: "600px", md: "800px" }}
        maxWidth="800px" // Prevents the layout from exceeding 800px
        p={2}
        m={2}
        mx="auto"
      >
        {/* Header Section */}
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack gap={1}>
            <Typography
              variant="h2"
              sx={{ color: darkMode ? "white" : "black" }}
              fontWeight="bold"
              fontSize={{ xs: "1.5rem", sm: "2rem" }}
            >
              akshattandon__
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography
                variant="h2"
                fontSize={{ xs: "1rem", sm: "1.1rem" }}
                sx={{ color: darkMode ? "lightgray" : "gray" }}
              >
                akshattandon__
              </Typography>
              <Chip
                label="threads.net"
                size="small"
                sx={{
                  color: darkMode ? "gray" : "gray",
                  fontSize: ".8rem",
                  backgroundColor: darkMode ? "#F1F0E8" : "#d1D2D2",
                }}
              />
            </Stack>
          </Stack>
          <Avatar src="" alt="" sx={{ width: 60, height: 60 }} />
        </Stack>

        {/* Bio Section */}
        <Typography
          variant="subtitle2"
          sx={{ color: darkMode ? "white" : "black" }}
        >
          This is bio!
        </Typography>

        {/* Followers and Icon Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="subtitle2"
            color={darkMode ? "lightgray" : "gray"}
          >
            19 followers
          </Typography>
          <IconButton size="large">
            <Instagram sx={{ color: darkMode ? "white" : "gray" }} />
          </IconButton>
        </Stack>

        {/* Edit Profile Button */}
        <Button
          sx={{
            mx: "auto",
            width: "100%",
            maxWidth: "800px",
            border: darkMode ? "1px solid white" : "1px solid black",
            color: darkMode ? "white" : "black",
            borderRadius: ".8rem",
          }}
          onClick={() => dispatch(editProfileModel(true))}
        >
          Edit Profile
        </Button>

        {/* Navigation Links */}
        <Stack
          direction="row"
          justifyContent="space-evenly"
          my={5}
          py={2}
          borderBottom={darkMode ? "2px solid white" : "2px solid black"}
          fontSize={{ xs: "1rem", sm: "1.2rem" }}
          width="100%"
          maxWidth="800px"
          mx="auto"
          sx={{ color: darkMode ? "white" : "black" }}
        >
          <Link to="">Threads</Link>
          <Link to="replies/1">Replies</Link>
          <Link to="repost/1">Repost</Link>
        </Stack>
      </Stack>
      <Outlet />
    </>
  );
};

export default ProfileLayout;
