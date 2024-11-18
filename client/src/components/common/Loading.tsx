import { Stack, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      flexDirection={"row"}
      minHeight={"50vh"}
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={15}
    >
      <CircularProgress sx={{ color: "gray" }} />
    </Stack>
  );
};

export default Loading;
