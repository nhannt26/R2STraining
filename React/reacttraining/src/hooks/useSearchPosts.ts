import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { PostModel } from "../types/post";
import useFetchPosts from "./useFetchPosts";
const useSearchPost = () => {
  const [searchText, setSearchText] = useState("");
  const { postIds, postsData } =
    useFetchPosts();
  const debounceSearch = useMemo(() => {
    return debounce(setSearchText, 300);
  }, []);
  const searchResults = useMemo(() => {
    if (!searchText) return postIds;
    return postIds.filter((id: PostModel["id"]) => {
      const title = postsData[id].title;
      return title.includes(searchText);
    });
  }, [postsData, postIds, searchText]);
  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);
  return {
    debounceSearch,
    searchResults
  }
};
export default useSearchPost;