import React, {useState, useEffect} from 'react';
import articles from './article-content';
import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
import 'whatwg-fetch';
// for internet explorer support
// npm install --save whatwg-fetch
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

// <ArticlePage> -> Accessible by <Link> updating to <Route> in <Router> from <ArticlesListPage> or other article found here.
//                  Will update page body.
//                  Passes a "match" argument based on the <Route> to this URL from /article/:name in App.js. This maps the 
//                  name property to the match.params.name.
//                  Importantly, we must parse the URL for the right article in data, update content accordingly, then 
//                  recommend all other articles that are not the same as the one selected as a posterior choice below.

const ArticlePage = ({match}) => {

    // Set a state for the article values
    const [articleInfo, setArticleInfo] = useState({upvotes:0, comments:[]});
    
    const name = match.params.name;
    const article = articles.find(article => article.name === name);

    
    // useEffect hook
    // Run when the component mounts and updates
    // Only updates when `name` changes
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`)
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchData();
        
    }, [name]);
    
    const otherArticles = articles.filter(article => article.name !== name)

    if (!article) return <NotFoundPage></NotFoundPage>

    return(
        <>
            <h1>{article.title}</h1>
            <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}></UpvotesSection>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
            <CommentsList comments={articleInfo.comments}></CommentsList>
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}></AddCommentForm>

            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles}></ArticlesList>
        </>
    )
}

export default ArticlePage;