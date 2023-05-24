import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Feedbar from "./Feedbar/Feedbar";
import "react-datepicker/dist/react-datepicker.css";

export default function Filter({
  keyword,
  setKeyword,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  category,
  setCategory,
  source,
  setSource,
  byFilter,
  setByFilter,
}) {
  const [keyword_, setKeyword_] = useState(keyword);
  const [category_, setCategory_] = useState(category);
  const [source_, setSource_] = useState(source);
  const [isOpenFeedbar, setIsOpenFeedbar] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const toggleFeedbar = () => {
    if (!byFilter) {
      setCategory(category_);
      setSource(source_);
      setKeyword(keyword_);
      setByFilter(true);
    } else {
      setIsOpenFeedbar(!isOpenFeedbar);
    }
  };

  const closeFeedbar = () => {
    setIsOpenFeedbar(false);
  };

  const onFeedChange = ({ categories, sources, author }) => {
    setCategory(categories.join(" "));
    setSource(sources.join(" "));
    setKeyword(author);

    setByFilter(false);
  };

  return (
    <div className="container mt-4">
      <Feedbar
        isOpen={isOpenFeedbar}
        toggleBar={toggleFeedbar}
        closeBar={closeFeedbar}
        onFeedChange={onFeedChange}
      />
      <div className="d-flex">
        <div className="d-flex form-inputs flex-grow-1">
          <input
            className="form-control no-round-right"
            type="text"
            placeholder="Search by keyword..."
            value={keyword_}
            onChange={(e) => {
              setKeyword_(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                setKeyword(keyword_);
              }
            }}
            disabled={!byFilter}
          />
          <div className="input-group-text no-round-left">
            <i className="fas fa-search"></i>
          </div>
        </div>
        <button
          type="button"
          className={`second-button ${byFilter ? "" : "deactive"}`}
          onClick={toggleFeedbar}
        >
          Feed &nbsp;{!byFilter && <span>&times;</span>}
        </button>
      </div>
      <div className="row">
        <div className="col-sm-4 pt-2">
          <div className="d-flex">
            <div className="input-group-prepend">
              <span className="input-group-text no-round-right" id="">
                Date
              </span>
            </div>
            <div className="flex-grow-1">
              <DatePicker
                className="form-control no-round-left"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  handleDateChange(update);
                }}
                isClearable={true}
                disabled={!byFilter}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-4 pt-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text no-round-right" id="">
                Category
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              value={category_}
              onChange={(e) => {
                setCategory_(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setCategory(category_);
                }
              }}
              disabled={!byFilter}
            />
          </div>
        </div>

        <div className="col-sm-4 pt-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text no-round-right" id="">
                Source
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              value={source_}
              onChange={(e) => {
                setSource_(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setSource(source_);
                }
              }}
              disabled={!byFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
