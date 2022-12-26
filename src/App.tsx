import { useEffect, useLayoutEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { HTMLFlipBook } from "./HTMLFlipBookForward";
import NavLeft from "./Navbar";
import PickBook from "./PickBook";
import { useBookStore } from "./store";

function App() {
  const book = useBookStore((state: any) => state.book);
  const [bookRef, setBookRef] = useState<any | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width <= 1000) setShowMobileWarning(true);
    else setShowMobileWarning(false);
  }, [width]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 50);

    return () => setIsLoading(false);
  }, [book]);

  return (
    <>
      {showMobileWarning ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 className="mb-3" style={{ color: "#fff", textAlign: "center" }}>
            App is not ready yet on small screens :(
          </h1>

          <h3 style={{ color: "#fff", textAlign: "center" }}>
            please open on a larger one
          </h3>
        </Container>
      ) : (
        <>
          <NavLeft />
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <PickBook bookRef={bookRef} />
            {!loading ? (
              // @ts-ignore
              <HTMLFlipBook
                width={350}
                height={450}
                showCover={true}
                maxShadowOpacity={0.2}
                setBookRef={setBookRef}
                book={book}
                scale={1}
              />
            ) : null}
          </Container>
        </>
      )}
    </>
  );
}

export default App;

{
  /*


<Document
        file={props.book || blank}
        className={props.className}
        style={props.style}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => {
          return (
            <Page
              key={`page_${index + 1}`}
              scale={scale}
              pageNumber={index + 1}
            />
          );
        })}
      </Document>
*/
}
