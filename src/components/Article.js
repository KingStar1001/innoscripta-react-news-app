import React from "react";
import { Link } from "react-router-dom";

export default function Article({ article, setCategory, setSource }) {
  const { title, author, category, pub_date, source, url } = article;
  const formattedDate = (date) => {
    return `${date.getFullYear()}:${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}:${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="article py-2">
      <Link className="article-title" target="_blank" to={url}>
        {title}
      </Link>
      <div className="row align-items-center mt-2">
        <div className="col-sm-6 d-flex">
          {category !== "" && (
            <div
              className="article-category"
              onClick={() => {
                setCategory(category);
              }}
            >
              {category}
            </div>
          )}
          {source !== "" && (
            <div
              className="article-source"
              onClick={() => {
                setSource(source);
              }}
            >
              {source}
            </div>
          )}
        </div>
        <div className="col-sm-6 d-sm-flex">
          <div className="ml-sm-auto"></div>
          {author !== "" && (
            <div className="article-author">
              Author:&nbsp;<span className="article-author-name">{author}</span>
            </div>
          )}
          {pub_date !== "" && (
            <div className="article-publish">
              Published at:&nbsp;
              <span className="article-publish-date">
                {formattedDate(new Date(pub_date))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
