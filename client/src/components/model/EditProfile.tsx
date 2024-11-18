import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { CloseOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
const EditProfile = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const [img, setImg] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {};
  const handleImg = () => {
    imgRef.current?.click();
  };
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
        Edit profile
      </DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          <Avatar
            src={img ? img : ""}
            alt=""
            sx={{ width: 96, height: 96, alignSelf: "center" }}
          />
          <Button
            size={"large"}
            sx={{
              border: "2px solid gray",
              borderRadius: "10px",
              width: 96,
              height: 40,
              alignSelf: "center",
              my: 2,
              ":hover": { cursor: "pointer" },
            }}
            onClick={handleImg}
          >
            {" "}
            Change
          </Button>{" "}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imgRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              const url = URL.createObjectURL(file!);
              setImg(url);
            }}
          />
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            fontSize={"1.2rem"}
            my={2}
          >
            username
          </Typography>
          <input type="text" value={"akshattandon"} readOnly />
        </Stack>
        <Stack gap={1}>
          {" "}
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            fontSize={"1.2rem"}
            my={2}
          >
            email
          </Typography>
          <input type="text" value={"akshattandon"} readOnly />
        </Stack>
        <Stack gap={1}>
          {" "}
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            fontSize={"1.2rem"}
            my={2}
          >
            Bio
          </Typography>{" "}
          <input
            type="text"
            placeholder="write bio"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </Stack>
        <Button
          size={"large"}
          fullWidth
          sx={{
            border: "2px solid gray",
            borderRadius: "10px",
            bgcolor: "GrayText",
            color: "white",
            my: 2,
            fontSize: "1.2rem",
            ":hover": {
              bgcolor: "gray",
              cursor: "pointer",
            },
          }}
        >
          {" "}
          update
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
