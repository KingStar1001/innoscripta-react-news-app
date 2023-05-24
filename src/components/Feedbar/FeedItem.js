import React from "react";

export default function FeedItem({ value, removeItem }) {
  return (
    <div className="feed-item">
      {value}&nbsp;
      <span
        className="feed-close"
        onClick={() => {
          removeItem(value);
        }}
      >
        &times;
      </span>
    </div>
  );
}
