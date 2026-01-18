import React from 'react';

const BlogComments = ({ comments }) => {
    return (
        <div id="comments" className="luxury-comments">
            <h2>The Conversation</h2>
            <div className="comments-grid">
                {comments?.map((comment, i) => (
                    <div key={i} className="luxury-comment-bubble">
                        <div className="c-header">
                            <strong>{comment.author}</strong>
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                ))}
                {(!comments || comments.length === 0) && (
                    <p className="placeholder-text">Share your thoughts on this editorial.</p>
                )}
            </div>

            <form className="luxury-comment-form">
                <textarea placeholder="Write a response..." rows={3} />
                <button type="submit">Post Response</button>
            </form>
        </div>
    );
};

export default BlogComments;
