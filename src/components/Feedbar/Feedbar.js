import React, { useState, useEffect } from "react";
import FeedItem from "./FeedItem";
import Current from "../../hooks/Current";

export default function Feedbar({ isOpen, toggleBar, closeBar, onFeedChange }) {
  const { feed, loadFeed, updateFeed } = Current();

  const [curSource, setCurSource] = useState("");
  const [sources, setSources] = useState([]);

  const [curCategory, setCurCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [curAuthor, setCurAuthor] = useState("");

  useEffect(() => {
    loadFeed();
  }, []);

  useEffect(() => {
    const {
      categories: feed_categoreis = [],
      sources: feed_sources = [],
      author: feed_author,
    } = feed;
    setCategories(feed_categoreis);
    setSources(feed_sources);
    setCurAuthor(feed_author);
  }, [feed]);

  const onApplyFilter = () => {
    closeBar();
    updateFeed({
      sources: sources.join(","),
      categories: categories.join(","),
      author: curAuthor,
    });
    onFeedChange({ sources, categories, author });
  };

  const addSource = () => {
    if (!sources.includes(curSource)) {
      sources.push(curSource);
    }
    setCurSource("");
  };

  const removeSource = (value) => {
    if (sources.includes(value)) {
      setSources(sources.filter((val) => val !== value));
    }
  };

  const addCategory = () => {
    if (!categories.includes(curCategory)) {
      categories.push(curCategory);
    }
    setCurCategory("");
  };

  const removeCategory = (value) => {
    if (categories.includes(value)) {
      setCategories(categories.filter((val) => val !== value));
    }
  };

  const sourcesContent = () => {
    return (
      <div className="m-4">
        <div className="sub-title mb-3">Sources</div>
        <input
          className="form-control"
          type="text"
          value={curSource}
          onChange={(e) => {
            setCurSource(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              addSource();
            }
          }}
        />
        <div className="d-flex mt-4 flex-wrap">
          {sources.map((source, index) => {
            return (
              <FeedItem
                key={`source-${index}`}
                value={source}
                removeItem={removeSource}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const categoriesContent = () => {
    return (
      <div className="m-4">
        <div className="sub-title mb-3">Categories</div>
        <input
          className="form-control"
          type="text"
          value={curCategory}
          onChange={(e) => {
            setCurCategory(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              addCategory();
            }
          }}
        />
        <div className="d-flex mt-4 flex-wrap">
          {categories.map((category, index) => {
            return (
              <FeedItem
                key={`category-${index}`}
                value={category}
                removeItem={removeCategory}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const authorContent = () => {
    return (
      <div className="m-4">
        <div className="sub-title mb-3">Author</div>
        <input
          className="form-control"
          type="text"
          value={curAuthor}
          onChange={(e) => {
            setCurAuthor(e.target.value);
          }}
        />
      </div>
    );
  };

  const { author } = feed;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="d-flex align-items-center m-3">
        <div className="title">Personalized Feed</div>
        <button
          type="button"
          className="circle-button ml-auto"
          onClick={toggleBar}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      {sourcesContent()}
      {categoriesContent()}
      {authorContent()}
      <div className="d-flex justify-content-center p-3">
        <button type="button" className="main-button" onClick={onApplyFilter}>
          Apply Filter
        </button>
      </div>
    </div>
  );
}
