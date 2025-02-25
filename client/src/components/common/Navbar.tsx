import { Logo } from "./StyledComponents";
import {
  HomeOutlined,
  SearchOutlined,
  AddOutlined,
  PersonOutlineOutlined,

} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../rtk/slice";
import { RootState } from "../../rtk/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const { myProfile } = useSelector((state: RootState) => state.service);
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
        to={`/profile/threads/${myProfile.user?._id}`}
        title="Profile"
        icon={<PersonOutlineOutlined fontSize="large" />}
      />
    </>
  );
};

export default Navbar;
