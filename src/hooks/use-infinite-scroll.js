import React, {useState, useRef, useCallback, useEffect} from 'react';
import qs from "@src/utils/search-params";

function useInfiniteScroll(initial) {
  const urlParams = qs.parse(window.location.search);
  const initialPage = urlParams.page && initial ? Number(urlParams.page) - 1 : 0
  const [page, setPage] = useState(initialPage);
  const elementRef = useRef(null);

  const callback = useCallback(([target]) => {
    if (target.isIntersecting) setPage((prev) => prev + 1);
  }, []);

  const refElement = <div ref={elementRef}/>

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(callback, option);
    if (elementRef.current) observer.observe(elementRef.current);

  }, [callback]);

  return { page, setPage, refElement };
}

export default useInfiniteScroll;
