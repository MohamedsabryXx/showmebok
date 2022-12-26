import React, { useEffect } from "react";
import { Book } from "epubjs";

function JSXBOOK() {
  useEffect(() => {
    const book = new Book("../alice.epub", {});
    const render = book.renderTo("book", {
      height: 500,
    });
    render.display();
  }, []);
  
  return <div id="book"></div>;
}

export default JSXBOOK;
