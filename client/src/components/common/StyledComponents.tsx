import { Link } from "react-router-dom";
import { Tooltip, Button } from "@mui/material";
import { LogoType } from "../../types/Types";

export const Logo: React.FC<LogoType> = ({ to, title, icon }) => {
  return (
    <Tooltip title={title}>
      <Link to={to}>
        <Button color="inherit" size="large">
          {icon}
        </Button>
      </Link>
    </Tooltip>
  );
};
