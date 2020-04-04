import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

const App = () => {
  const [articles, setArticles] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [resultsTitle, setResultsTitle] = useState();

  const apiKey = "3bea504462b949c285dad781d0c837e9";

  const toggleDarkMode = () => {
    const page = document.body;
    const title = document.querySelector(".header-title");
    const date = document.querySelector(".header-date");
    page.classList.toggle("dark-mode");
    title.classList.toggle("dark-mode");
    date.classList.toggle("dark-mode");
  };

  useEffect(() => {
    getTodaysDate();
    handleClickTopStories();
  }, []);

  const getTodaysDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date();
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = weekdays[date.getDay()];
    const dayNumberString = date.toString();
    const dayNumber = [dayNumberString.slice(8, 10)];
    const todaysDate = `${day} ${month} ${dayNumber}, ${year}`;
    setCurrentDate(todaysDate);
  };

  const handleClickTopStories = async () => {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    setArticles(data.data.articles);
    setResultsTitle("Top Stories");
  };

  const handleClickTech = async () => {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`
    );
    setArticles(data.data.articles);
    setResultsTitle("Tech");
  };

  const handleClickBusiness = async () => {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
    );

    setArticles(data.data.articles);
    setResultsTitle("Business");
  };

  const handleClickSports = async () => {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`
    );

    setArticles(data.data.articles);
    setResultsTitle("Sports");
  };

  const handleClickEntertainment = async () => {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${apiKey}`
    );

    setArticles(data.data.articles);
    setResultsTitle("Entertainment");
  };

  const handleClickHealth = async () => {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`
    );

    setArticles(data.data.articles);
    setResultsTitle("Health");
  };

  const handleClickScience = async () => {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=${apiKey}`
    );

    setArticles(data.data.articles);
    setResultsTitle("Science");
  };

  const handleSearch = (event) => {
    let searchBarInput = event.target.value;

    if (event.keyCode === 13) {
      const handleSearchQuery = async () => {
        const data = await axios.get(
          `https://newsapi.org/v2/everything?q=${searchBarInput}&apiKey=${apiKey}`
        );
        setArticles(data.data.articles);
        setResultsTitle(searchBarInput);
      };
      handleSearchQuery();
    }
  };

  return (
    <div>
      {articles ? (
        <div>
          <div className="header">
            <h1 className="header-title">NEWS NOW</h1>
            <h6 className="header-date">{currentDate}</h6>
            <button className="header-subscribe">Subscribe</button>
            {/* <button onClick={toggleDarkMode} className="header-toggle">
              Toggle Night Mode
            </button> */}
            <input
              id="searchbar"
              className="header-searchbar"
              type="text"
              placeholder="Search News Here..."
              onKeyDown={handleSearch}
            />
            <div className="header-buttons">
              <button className="header-button" onClick={handleClickTopStories}>
                Top Stories
              </button>
              <button className="header-button" onClick={handleClickTech}>
                Technology
              </button>
              <button className="header-button" onClick={handleClickBusiness}>
                Business
              </button>
              <button className="header-button" onClick={handleClickSports}>
                Sports
              </button>
              <button
                className="header-button"
                onClick={handleClickEntertainment}
              >
                Entertainment
              </button>
              <button className="header-button" onClick={handleClickHealth}>
                Health
              </button>
              <button className="header-button" onClick={handleClickScience}>
                Science
              </button>
            </div>
          </div>

          <div className="page-title-container">
            <h2 className="page-title">{resultsTitle}</h2>
          </div>
          <div className="info-body">
            {articles.map((item) => (
              <div className="full-article">
                <div className="article" key={item.publishedAt}>
                  <a
                    className="item-title-anchor"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.url}
                  >
                    <h5 className="item-source">{item.source.name}</h5>
                    <h1 className="item-title">{item.title}</h1>
                  </a>
                  <p>{item.content}</p>
                </div>
                <div className="article-image">
                  {/* <a target="_blank" rel="noopener noreferrer" href={item.url}> */}
                  <img className="article-image" src={item.urlToImage} />
                  {/* </a> */}
                </div>
              </div>
            ))}
            {/* <footer>
              THIS IS THE FOOTER asdas dayNumberString s asd sad asd a da dsa
              sdasaadsa sdfasdfasd fasd fasd
            </footer> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
