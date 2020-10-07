import React from 'react';
import articles from './article-content'
import ArticlesList from '../components/ArticlesList';
// <ArticlesList> -> Loop through articles from article-content.js to populate the page, 
//                   each contains a <Link> which updates the page body <Route> in <Router>
//                   When article is selected, the URL updates for the <Route> in App.js.
//                   Probably the most important part, is now the information selected is available to
//                   <ArticlePage> which updates the page body, parsing the url for data articles matching
//                   the prior selected from list. This is how information is passed from one page to the next
//                   on select.

const ArticlesListPage = () => {
    return(
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles} />
        </>
    )
}

export default ArticlesListPage;