import { Stack } from "@mui/material";
import { ProfileBar } from "../../components/search/ProfileBar";
import SearchInput from "../../components/search/SearchInput";
import { useSelector } from "react-redux";
import { RootState } from "../../rtk/store";
// 1 Search bar
// 2 search profile section 
const Search = () => {
  const { searchUsers } = useSelector((state: RootState) => state.service);

  return (
    <>
      <SearchInput />
      <Stack gap={1} mb={`1`} width={"90%"} maxWidth={"749px"} mx={"auto"}>
        {searchUsers && searchUsers.length > 0 && searchUsers.map((e: any) => {
          return <ProfileBar key={e._id} e={e} />
        })}
      </Stack>
    </>
  );
};

export default Search;
