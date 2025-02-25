import { Link } from "react-router-dom";
import { Tooltip, Button } from "@mui/material";
import { LogoType } from "../../types/Types";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";

export const Logo: React.FC<LogoType> = ({ to, title, icon, onClick }) => {
  const { darkMode } = useSelector(({ service }: RootState) => service);
  return (
    <Tooltip title={title}>
      {to ? (
        <Link to={to} >
          {onClick ? (
            <Button
              color="inherit"
              size="large"
              onClick={onClick}
              sx={{
                ":hover": {
                  backgroundColor: darkMode ? "#616161" : "#e0e0e0",
                },
              }}
            >
              {icon}
            </Button>
          ) : (
            <Button
              color="inherit"
              size="large"
              sx={{
                ":hover": {
                  backgroundColor: darkMode ? "#616161" : "#e0e0e0",
                },
              }}
            >
              {icon}
            </Button>
          )}
        </Link>
      ) : (
        <>
          {onClick ? (
            <Button
              color="inherit"
              size="large"
              onClick={onClick}
              sx={{
                ":hover": {
                  backgroundColor: darkMode ? "#616161" : "#e0e0e0",
                },
              }}
            >
              {icon}
            </Button>
          ) : (
            <Button
              color="inherit"
              size="large"
              sx={{
                ":hover": {
                  backgroundColor: darkMode ? "#616161" : "#e0e0e0",
                },
              }}
            >
              {icon}
            </Button>
          )}
        </>
      )}
    </Tooltip>
  );
};
