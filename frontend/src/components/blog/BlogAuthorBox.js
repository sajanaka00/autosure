import React from 'react';
import Avatar from '../../assets/images/avatars/avatar1.jpg';

const DEFAULT_AVATAR = Avatar;

const BlogAuthorBox = ({ author }) => {
    if (!author) return null;

    return (
        <div className="luxury-author-box">
            <div className="author-header">
                <div className="author-avatar-large">
                    {author.avatar ? (
                        <img
                            src={DEFAULT_AVATAR}
                            alt={author.name}
                            onError={(e) => e.target.src = DEFAULT_AVATAR} // Simple fallback
                        />
                    ) : (
                        author.name[0]
                    )}
                </div>
                <div className="author-title-group">
                    <h3>{author.name}</h3>
                    <p>Editorial Lead</p>
                </div>
            </div>
            <p className="author-bio">{author.bio || "Regular contributor focusing on luxury performance and urban mobility."}</p>
        </div>
    );
};

export default BlogAuthorBox;
