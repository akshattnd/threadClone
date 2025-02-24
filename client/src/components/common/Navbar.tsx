import { Logo } from "./StyledComponents";
import {
  HomeOutlined,
  SearchOutlined,
  AddOutlined,
  FavoriteBorderOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addPostModel } from "../../rtk/slice";

const Navbar = () => {
  const dispatch = useDispatch();


  return (
    <>
      <Logo to="/" title="Home" icon={<HomeOutlined fontSize="large" />} />
      <Logo
        to="/search"
        title="Search"
        icon={<SearchOutlined fontSize="large" />}
      />
      <Logo
        title="Add"
        icon={<AddOutlined fontSize="large" />}
        onClick={() => {
          dispatch(addPostModel(true));
        }}
      />
      <Logo
        to="/profile"
        title="Profile"
        icon={<PersonOutlineOutlined fontSize="large" />}
      />
    </>
  );
};

export default Navbar;
