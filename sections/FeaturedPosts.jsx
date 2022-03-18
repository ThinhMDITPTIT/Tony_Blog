import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  // Use this to fix `React does not recognize the `carouselState` prop on a DOM element` error
  const ArrowFix = (arrowProps) => {
    const { carouselState, children, ...restArrowProps } = arrowProps;
    return <span {...restArrowProps}> {children} </span>;
  };

  const customLeftArrow = (
    <div className="arrow-btn absolute left-0 cursor-pointer rounded-full bg-pink-600 py-3 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-full text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="arrow-btn absolute right-0 cursor-pointer rounded-full bg-pink-600 py-3 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-full text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );

  return (
    <div className="mb-8">
      <Carousel
        infinite
        customLeftArrow={<ArrowFix>{customLeftArrow}</ArrowFix>}
        customRightArrow={<ArrowFix>{customRightArrow}</ArrowFix>}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded &&
          featuredPosts.map((post, index) => (
            <FeaturedPostCard key={index} post={post} />
          ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
