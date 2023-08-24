import { useContext } from "react";
import PostsContext from "../contexts/PostsContext";
import UserContext from "../contexts/UserContext";

export function useAllContexts() {
  const { trending, setTrending, allPosts, setAllPosts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  return { trending, setTrending, allPosts, setAllPosts, user };
}