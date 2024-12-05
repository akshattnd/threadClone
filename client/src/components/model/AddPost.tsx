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
  useTheme,
} from "@mui/material";
import { CloseOutlined, PermMediaOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../rtk/slice";
import { RootState } from "../../rtk/store";

const AddPost = () => {
  const { openAddPostModel, darkMode } = useSelector(
    (state: RootState) => state.service
  );
  const [text, setText] = useState<string>("");
  const [media, setMedia] = useState<string>("");
  const mediaRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md")); // 768px and above

  const handleClose = () => {
    dispatch(addPostModel(false));
  };

  const handleMediaRef = () => {
    mediaRef.current?.click();
  };

  return (
    <div>
      <Dialog
        open={openAddPostModel}
        onClose={handleClose}
        fullWidth
        fullScreen={!isMediumScreen} // Fullscreen for small screens
        PaperProps={{
          sx: {
            bgcolor: darkMode ? "#121212" : "#fff", // Background based on darkMode
            color: darkMode ? "#f1f1f1" : "#000", // Text color based on darkMode
          },
        }}
      >
        {/* Close Button */}
        <Box position="absolute" top={20} right={20} onClick={handleClose}>
          <IconButton sx={{ color: darkMode ? "#f1f1f1" : "#000" }}>
            <CloseOutlined />
          </IconButton>
        </Box>

        {/* Dialog Title */}
        <DialogTitle
          textAlign="center"
          mb={2}
          sx={{
            color: darkMode ? "#f1f1f1" : "#000", // Adjust title color
          }}
        >
          New Thread
        </DialogTitle>

        {/* Dialog Content */}
        <DialogContent>
          {/* User and Input Section */}
          <Stack direction="row" gap={2} mb={4} alignItems="flex-start">
            <Avatar src="" alt="User Avatar" />
            <Stack flexGrow={1} gap={2}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: darkMode ? "#e0e0e0" : "#000" }}
              >
                akshattandon__
              </Typography>
              <textarea
                rows={3}
                placeholder="Start a thread..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  width: "100%",
                  resize: "none",
                  padding: "8px",
                  borderRadius: "4px",
                  border: `1px solid ${darkMode ? "#444" : "gray"}`,
                  fontSize: "1rem",
                  backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#f1f1f1" : "#000",
                }}
              />

              {/* Image Preview */}
              {media && (
                <Box
                  component="img"
                  src={media}
                  alt="Preview"
                  sx={{
                    mx: "auto",
                    maxWidth: isMediumScreen ? 400 : "80%",
                    borderRadius: "8px",
                    mt: 1,
                  }}
                />
              )}

              {/* Media Upload Button */}
              <IconButton
                onClick={handleMediaRef}
                sx={{
                  height: "3.4rem",
                  width: "3.4rem",
                  color: darkMode ? "#f1f1f1" : "#000",
                  ":hover": { color: darkMode ? "#fff" : "#333" },
                }}
              >
                <PermMediaOutlined />
              </IconButton>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                ref={mediaRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setMedia(url);
                  }
                }}
              />
            </Stack>
          </Stack>

          {/* Footer Section */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: darkMode ? "#a1a1a1" : "gray" }}
            >
              Anyone can reply
            </Typography>
            <Button
              size="large"
              sx={{
                bgcolor: darkMode ? "#333" : "gray",
                color: "white",
                borderRadius: "8px",
                ":hover": { bgcolor: darkMode ? "#444" : "black" },
              }}
            >
              Post
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPost;
