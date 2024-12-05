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
import { CloseOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel } from "../../rtk/slice";
import { RootState } from "../../rtk/store";

const EditProfile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md")); // For screens 768px and above

  const [img, setImg] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const imgRef = useRef<HTMLInputElement>(null);

  const { openEditProfileModel, darkMode } = useSelector(
    (state: RootState) => state.service
  );

  const handleClose = () => {
    dispatch(editProfileModel(false));
  };

  const handleImgChange = () => {
    imgRef.current?.click();
  };

  return (
    <Dialog
      open={openEditProfileModel}
      onClose={handleClose}
      fullWidth
      fullScreen={!isMediumScreen} // Fullscreen for small screens
      PaperProps={{
        sx: {
          bgcolor: darkMode ? "#121212" : "#fff", // Background color
          color: darkMode ? "#f1f1f1" : "#000", // Text color
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
        sx={{
          mb: 4,
          color: darkMode ? "#f1f1f1" : "#000", // Title color
        }}
      >
        Edit Profile
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent>
        <Stack gap={3}>
          {/* Avatar Section */}
          <Avatar
            src={img || ""}
            alt="Profile Avatar"
            sx={{
              width: 96,
              height: 96,
              alignSelf: "center",
              mb: 2,
            }}
          />
          <Button
            variant="outlined"
            sx={{
              width: 120,
              alignSelf: "center",
              borderRadius: "8px",
              borderColor: darkMode ? "#f1f1f1" : "gray",
              color: darkMode ? "#f1f1f1" : "gray",
              ":hover": {
                bgcolor: darkMode ? "#333" : "gray",
                color: "#fff",
              },
            }}
            onClick={handleImgChange}
          >
            Change
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={imgRef}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setImg(url);
              }
            }}
          />

          {/* Username */}
          <Stack>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: darkMode ? "#e0e0e0" : "#000" }}
            >
              Username
            </Typography>
            <input
              type="text"
              value="akshattandon"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: `1px solid ${darkMode ? "#444" : "gray"}`,
                backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
                color: darkMode ? "#f1f1f1" : "#000",
              }}
            />
          </Stack>

          {/* Email */}
          <Stack>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: darkMode ? "#e0e0e0" : "#000" }}
            >
              Email
            </Typography>
            <input
              type="text"
              value="akshattandon@gmail.com"
              readOnly
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: `1px solid ${darkMode ? "#444" : "gray"}`,
                backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
                color: darkMode ? "#f1f1f1" : "#000",
              }}
            />
          </Stack>

          {/* Bio */}
          <Stack>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: darkMode ? "#e0e0e0" : "#000" }}
            >
              Bio
            </Typography>
            <textarea
              placeholder="Write your bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: `1px solid ${darkMode ? "#444" : "gray"}`,
                backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                color: darkMode ? "#f1f1f1" : "#000",
              }}
            />
          </Stack>

          {/* Update Button */}
          <Button
            fullWidth
            size="large"
            sx={{
              borderRadius: "8px",
              bgcolor: darkMode ? "#333" : "gray",
              color: "white",
              ":hover": { bgcolor: darkMode ? "#444" : "black" },
              mt: 4,
              fontSize: "1rem",
            }}
          >
            Update
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
