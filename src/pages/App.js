import React, { useState, useEffect } from 'react';
import { getNews as fetchNews } from '../services/Api';  
import '../styles/App.css'; 
import news_icon from '../assets/news_icon.png'; 

function App() { 

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortBy, setSortBy] = useState('popularity');

  // const currentDate = new Date().toDateString();
  // lists news when the page opens
  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };  
    getNews();
  }, []);

  // searches news with term given to it and sort type
  const searchNews = async () => {
    try {
      const response = await fetchNews(searchTerm, sortBy);  
      setArticles(response.articles); 
    } catch (error) {
    
      console.error("error fetching searchNews.: ", error);
    }
  };

  // since there is no button to say search, I created that
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchNews();
    } 
  };

  return (
    <div className="App">
      <header className="App-header">  
        <div id="App-nav"> 
          <img id="App-icon" src={news_icon} alt="News Icon" /> 
          <h2 id="App-name">USA News</h2> 
          <div id="App-search">
            <input type="text" id="Search-text" value={searchTerm} placeholder=" Search"onChange={(e) => setSearchTerm(e.target.value)}  onKeyPress={handleKeyPress}/>
            
            <select id="Sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>  
              <option value="popularity">Popularity</option>
              <option value="relevancy">Relevancy</option> 
              <option value="publishedAt">Published At</option>
            </select>   
            
            <input type="button" id="Search-button" value="Search"onClick={searchNews}/> 
          </div>  
        </div>

        {/* So we can display news) */}
        <div id="output">
          {articles.map((article, index) => (
            <div key={index} id="Output-container" style={{  }}>
              <img style={{ float: 'left', width: '170px', height: '110px', borderRadius: '7px'}} src={article.urlToImage} id="Output-img" alt={article.title} />
              <div id="Output-content">
                <h1 id="Output-title">{article.title}</h1>
                <p id="Output-source">{article.source.name}</p>
                <hr/>
                <p id="Output-desc">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>   
            </div>
          ))}
        </div>  
      </header>
    </div>
  );
}

export default App;

