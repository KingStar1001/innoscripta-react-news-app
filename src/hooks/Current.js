import { useState } from "react";
import AuthUser from "./AuthUser";

var initialFeed = {
  sources: [],
  categories: [],
  author: "",
};

export default function Current() {
  const { http } = AuthUser();
  const [feed, setFeed] = useState(initialFeed);

  const loadFeed = () => {
    http.get("/feed").then((res) => {
      if (res.status === 200) {
        saveFeed(res.data);
      }
    });
  };

  const updateFeed = ({ categories, sources, author }) => {
    http
      .patch("/feed", {
        categories,
        sources,
        author,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFeed(res.data);
        }
      });
  };

  const saveFeed = (_feed) => {
    if (_feed) {
      sessionStorage.setItem("feed", JSON.stringify(_feed));

      setFeed(_feed);
    }
  };

  const getFeed = () => {
    const feedString = sessionStorage.getItem("feed");
    if (feedString) {
      return JSON.parse(feedString);
    }
    return {};
  };

  return {
    feed,
    loadFeed,
    updateFeed,
  };
}
