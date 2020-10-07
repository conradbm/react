import React from 'react';
import { Link } from 'react-router-dom'
// <ArticlesList> -> Resources for <ArticlesListPage> and when article selected, updates page content with articles and <Link> to article

const ArticlesList = ({articles}) => {
    return(
        <>
            {articles.map((article,i) => (
                <Link className="article-list-item" key={i} to={`/article/${article.name}`}>
                    <h3>{article.name}</h3>
                    <p>{article.content[0].substring(0,150)}...</p>
                </Link>
            ))}
        </>
    )
}

export default ArticlesList;