import React from 'react';
import { Heart, MessageCircle, Bookmark, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';

const StaticActionBar = ({ liked, onLike, likes, commentsCount }) => {
    return (
        <div className="static-blog-stats-bar">
            <div className="glass-inner">
                <button className={`action-item ${liked ? 'active' : ''}`} onClick={onLike}>
                    <Heart size={20} fill={liked ? "#ff4b4b" : "none"} color={liked ? "#ff4b4b" : "currentColor"} />
                    <span className="count">{likes + (liked ? 1 : 0)}</span>
                </button>
                <div className="action-divider" />
                <a href="#comments" className="action-item">
                    <MessageCircle size={20} />
                    <span className="count">{commentsCount}</span>
                </a>
                <div className="action-divider" />
                <button className="action-item">
                    <Bookmark size={20} />
                </button>
                <div className="action-divider" />
                <div className="share-group-mini">
                    <ShareButton icon={Facebook} />
                    <ShareButton icon={Twitter} />
                    <ShareButton icon={LinkIcon} />
                </div>
            </div>
        </div>
    );
};

const ShareButton = ({ icon: Icon }) => (
    <button className="mini-share-btn">
        <Icon size={16} />
    </button>
);

export default StaticActionBar;
