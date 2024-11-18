import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

export const ProfileBar = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      direction={"row"}
      mx="auto"
      justifyContent={"space-between"}
      px={1}
      py={2}
      boxShadow={"5px  5px 5px  gray"}
      width={_700 ? "80%" : "90%"}
      borderRadius={"15px"}
      sx={{ ":hover": { cursor: "pointer" } }}
    >
      <Stack direction={"row"} gap={2}>
        <Avatar src="" alt="profile" />
        <Stack>
          <Typography variant="h6" fontWeight={"bold"} fontSize={"1rem"}>
            Akshat
          </Typography>
          <Typography variant="caption" fontSize={"1.1rem"} color="gray">
            checking bio
          </Typography>
          <Typography variant="caption" fontSize={"1rem"}>
            3 followers
          </Typography>
        </Stack>
      </Stack>
      <Button
        sx={{
          border: "1px solid gray",
          color: "black",
          height: "40px",
          p: "2",
          ":hover": {
            cursor: "pointer",
            backgroundColor: "#d3d3d3",
          },
          margin: "1rem .5rem",
        }}
      >
        Follow
      </Button>
    </Stack>
  );
};
