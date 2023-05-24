import { useEffect, useState } from "react";
import AuthUser from "../../hooks/AuthUser";
import Filter from "../Filter";
import Article from "../Article";
import { BeatLoader } from "react-spinners";

export default function News() {
  const { http } = AuthUser();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [byFilter, setByFilter] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const [articles, setArticles] = useState([]);

  const getNews = (curPage, refresh = false) => {
    setLoading(true);
    http
      .get("/news", {
        params: {
          page: curPage,
          search: keyword,
          from: startDate,
          to: endDate,
          category,
          source,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          setEnd(true);
        }
        if (refresh) {
          setArticles(res.data);
        } else {
          setArticles([...articles, ...res.data]);
        }
      })
      .catch((err) => {
        console.log("error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadMore = () => {
    setPage(page + 1);
    getNews(page + 1);
  };

  useEffect(() => {
    setEnd(false);
    setArticles([]);
    setPage(1);
    getNews(1, true);
  }, [keyword, startDate, endDate, category, source]);

  return (
    <>
      <Filter
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        category={category}
        setCategory={setCategory}
        source={source}
        setSource={setSource}
        byFilter={byFilter}
        setByFilter={setByFilter}
      />
      <div className="container mt-4">
        {articles.map((article, index) => {
          return (
            <div key={index}>
              <Article
                article={article}
                setCategory={setCategory}
                setSource={setSource}
              />
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center py-3">
        <BeatLoader color={"#ac8d83"} loading={loading} />
        {!loading && !end && (
          <button type="button" className="main-button" onClick={loadMore}>
            Load more
          </button>
        )}
      </div>
    </>
  );
}
