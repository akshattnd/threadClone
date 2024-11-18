import { Stack } from "@mui/material";
import { ProfileBar } from "../../components/search/ProfileBar";
import SearchInput from "../../components/search/SearchInput";
// 1 Search bar
// 2 search profile section
const Search = () => {
  return (
    <>
      <SearchInput />
      <Stack gap={1} mb={`1`} width={"90%"} maxWidth={"749px"} mx={"auto"}>
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
      </Stack>
    </>
  );
};

export default Search;
