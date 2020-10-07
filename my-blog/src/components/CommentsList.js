import React from 'react';

const CommentsList = ({comments}) => {
    return(
            <>
                <h3>Comments</h3>
                {comments.map((comment,i) => (
                    <div className="comment" key={i}>
                        <h4>{comment.username}</h4>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </>
    )
};

export default CommentsList;