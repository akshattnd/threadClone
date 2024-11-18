import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CloseOutlined, PermMediaOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
const AddPost = () => {
  const [text, setText] = useState<string>("");
  const [media, setMedia] = useState<string>("");
  const mediaRef = useRef<HTMLInputElement>(null);
  const handleClose = () => {};
  const handleMediaRef = () => {
    mediaRef.current?.click();
  };
  const _700 = useMediaQuery("(min-width:700px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _300 = useMediaQuery("(min-width:300px)");
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth
      fullScreen={_700 ? false : true}
    >
      <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
        <CloseOutlined />
      </Box>
      <DialogTitle textAlign={"center"} mb={5}>
        {" "}
        new Threads..
      </DialogTitle>
      <DialogContent>
        <Stack direction={"row"} gap={2} mb={5}>
          <Avatar src="" alt="" />
          <Stack>
            <Typography variant="h6" fontWeight={"bold"} fontSize={"1rem"}>
              {" "}
              akshattandon__
            </Typography>
            <textarea
              cols={_500 ? 40 : 25}
              rows={2}
              placeholder="start a thread.."
              autoFocus
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>

            {media && (
              <img
                src={media}
                id={"url-img"}
                className="max-w-[400px] max-h-fit"
              />
            )}
            <IconButton
              onClick={handleMediaRef}
              className="text-left  w-10 h-10"
            >
              <PermMediaOutlined />
            </IconButton>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              placeholder="browse"
              ref={mediaRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                const url = URL.createObjectURL(file!);
                setMedia(url);
              }}
            />
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontSize={"1rem"} color={"gray"}>
            {" "}
            anyone can reply{" "}
          </Typography>
          <Button
            size={"large"}
            sx={{
              bgcolor: "GrayText",
              color: "white",
              borderRadius: "10px",
              ":hover": {
                bgcolor: "gray",
                cursor: "pointer",
              },
            }}
          >
            post
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
