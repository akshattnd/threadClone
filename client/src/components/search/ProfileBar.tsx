import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";
import { Link } from "react-router-dom";

export const ProfileBar = ({ e }: { e: any }) => {
  const { darkMode } = useSelector(({ service }: RootState) => service);
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      direction={"row"}
      mx="auto"
      justifyContent={"space-between"}
      px={2}
      py={2}
      boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
      width={_700 ? "80%" : "90%"}
      borderRadius={"15px"}
      alignItems="center"
      bgcolor={darkMode ? "black" : "white"}
      sx={{
        ":hover": {
          cursor: "pointer",
          backgroundColor: darkMode ? "#1A1A1A" : "#f9f9f9",
        },
        transition: "background-color 0.3s ease",
      }}
    >
      <Stack direction={"row"} gap={2} alignItems="center">
        <Avatar src={e ? e.profileImg : ""} alt={e ? e.username : ""} />
        <Stack spacing={0.5}>
          <Link to={`profile/threads/${e._id}`}>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              color={darkMode ? "white" : "gray"}
              fontSize={"1rem"}
            >
              {e ? e.username : " "}
            </Typography>
          </Link>
          <Typography
            variant="caption"
            fontSize={"1rem"}
            color={darkMode ? "white" : "gray"}
          >
            {e ? e.bio : " "}
          </Typography>
          <Typography
            variant="caption"
            fontSize={"0.9rem"}
            color={darkMode ? "whitesmoke" : "textSecondary"}
          >
            {e ? e.followers.length : 0} followers
          </Typography>
        </Stack>
      </Stack>
      <Link to={`profile/threads/${e._id}`} className="cursor-pointer">
        <Button
          sx={{
            border: "1px solid gray",
            color: darkMode ? "whitesmoke" : "black",

            height: "36px",
            px: 3,
            borderRadius: "20px",
            textTransform: "capitalize",
            ":hover": {
              backgroundColor: "#e0e0e0",
            },
            backgroundColor: darkMode ? "black" : "white",
          }}
        >
          Follow
        </Button>
      </Link>
    </Stack>
  );
};
