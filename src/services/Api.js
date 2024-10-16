
export async function getNews(searchTerm='', sortBy = 'popularity') {

  let url = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}&apiKey=1a68519024e045978f0b5366bc6d2723`; 

  // so we can see results on both if there is a searched term or the case we entered the page.

  if (searchTerm) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&sortBy=${sortBy}&apiKey=1a68519024e045978f0b5366bc6d2723`;  
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&sortBy=${sortBy}&apiKey=1a68519024e045978f0b5366bc6d2723`;
  }

  // taking the data
  const response = await fetch(url); 

  console.log("fetched resp.: ", response);
  
  if (!response.ok) {
    throw new Error('response error');  
  }
  
  // turning data to json
  const data = await response.json();
  console.log("API data: ",data);
  return data;

}