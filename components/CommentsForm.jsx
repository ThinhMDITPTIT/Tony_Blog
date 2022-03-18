import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const commentElement = useRef();
  const nameElement = useRef();
  const emailElement = useRef();
  const storeLocalDataElement = useRef();
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    content: null,
    storeLocalData: false,
  });

  useEffect(() => {
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeLocalData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email')
          ? true
          : false,
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleCommentSubmit = () => {
    setError(false);
    // Use Destructuring
    const { value: content } = commentElement.current;
    const { value: name } = nameElement.current;
    const { value: email } = emailElement.current;
    const { checked: storeLocalData } = storeLocalDataElement.current;
    if (!content || !name || !email) {
      setError(true);
      return;
    }
    // Use Destructuring
    const commentObject = {
      name,
      email,
      content,
      slug,
    };

    // Inside Next.js => must use 'window.localStorage' instead of just 'localStorage' like in ReactJS
    if (storeLocalData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObject).then((res) => {
      if (res.createComment) {
        if (!storeLocalData) {
          formData.name = '';
          formData.email = '';
        }
        formData.content = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowSuccessMsg(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Comments Form
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          value={formData.content || ''}
          onChange={onInputChange}
          ref={commentElement}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="content"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          value={formData.name || ''}
          onChange={onInputChange}
          ref={nameElement}
          type="text"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          value={formData.email || ''}
          onChange={onInputChange}
          ref={emailElement}
          type="text"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            checked={formData.storeLocalData || false}
            onChange={onInputChange}
            ref={storeLocalDataElement}
            type="checkbox"
            id="storeLocalData"
            name="storeLocalData"
            value="true"
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeLocalData"
          >
            Save the email and name for the next comment!.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required!.</p>
      )}
      <div className="mt-5">
        <div className="flex w-full justify-end">
          <button
            className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
            type="button"
            onClick={handleCommentSubmit}
          >
            Send
          </button>
        </div>
        {showSuccessMsg && (
          <div className="flex w-full justify-end">
            <span className="mt-3 text-xl font-semibold text-green-500">
              Comment have been sent to review!.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
