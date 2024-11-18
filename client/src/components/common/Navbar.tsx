import { Logo } from "./StyledComponents";
import {
  HomeOutlined,
  SearchOutlined,
  AddOutlined,
  FavoriteBorderOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

const Navbar = () => {
  return (
    <>
      <Logo to="/" title="Home" icon={<HomeOutlined fontSize="large" />}></Logo>
      <Logo
        to="search"
        title="Search"
        icon={<SearchOutlined fontSize="large" />}
      ></Logo>
      <Logo to="add" title="Add" icon={<AddOutlined fontSize="large" />}></Logo>
      <Logo
        to="activities"
        title="Activities"
        icon={<FavoriteBorderOutlined fontSize="large" />}
      ></Logo>
      <Logo
        to="profile"
        title="profile"
        icon={<PersonOutlineOutlined fontSize="large" />}
      ></Logo>
    </>
  );
};

export default Navbar;
