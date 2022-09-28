import React, {useState, useRef, useCallback, useEffect} from 'react';

function useInfiniteScroll() {
  const [page, setPage] = useState(0);
  const elementRef = useRef(null);

  const callback = useCallback(([target]) => {
    if (target.isIntersecting) setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(callback, option);
    if (elementRef.current) observer.observe(elementRef.current);

  }, [callback]);

  return { elementRef, page, setPage };
}

export default useInfiniteScroll;
