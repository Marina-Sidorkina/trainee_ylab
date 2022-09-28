import React, {useState, useRef, useCallback, useEffect} from 'react';

function useInfiniteScroll() {
  const [page, setPage] = useState(0);
  const elementRef = useRef(null);

  const callback = useCallback(([target]) => {
    if (target.isIntersecting) setPage((prev) => prev + 1);
  }, []);

  const refElement = <div ref={elementRef}/>

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '40px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(callback, option);
    if (elementRef.current) observer.observe(elementRef.current);

  }, [callback]);

  return { page, setPage, refElement };
}

export default useInfiniteScroll;
