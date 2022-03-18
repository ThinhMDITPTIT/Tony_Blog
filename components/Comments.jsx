import React, { useState, useEffect } from 'react';
import moment from 'moment';
// Lib use to parse HTML String to JSX element to show in React
import parse from 'html-react-parser';
import { getComments } from '../services';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((res) => setComments(res));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
          <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              className="mb-4 border-b border-gray-100 pb-4"
              key={comment.createdAt}
            >
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="w-full whitespace-pre-line text-gray-600">
                {parse(comment.content)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
