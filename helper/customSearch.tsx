import { useEffect, useState } from "react";

export const CustomSearch = (txt:string, delay = 1000) => {
    const [txtsearch, setTxtSearch] = useState(txt);
    useEffect(() => {
      const timer = setTimeout(() => {
        setTxtSearch(txt);
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }, [txt, delay]);
    
    return txtsearch;
  };