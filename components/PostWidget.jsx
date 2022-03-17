import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimiliarPosts } from '../services';

const PostWidget = ({ slug, categories }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimiliarPosts(slug, categories).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res));
    }
  }, [slug]);

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              className="rounded-full align-middle"
              alt={post.title}
              height="60px"
              width="60px"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-xs text-gray-500">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className="text-base">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
