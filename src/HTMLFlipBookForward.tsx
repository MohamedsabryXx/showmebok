import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// @ts-ignore
import { PageFlip } from "page-flip";
import { IFlipSetting, IEventProps } from "./settings";
// @ts-ignore
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useBookStore } from "./store";
const blank = "../blank.pdf";
interface IProps extends IFlipSetting, IEventProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  renderOnlyPageLengthChange?: boolean;
  book: any;
  setBookRef: any;
  scale: number;
}
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const HTMLFlipBookForward = React.forwardRef(
  (props: IProps, ref: React.ForwardedRef<PageFlip>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pageFlip, setPAgeFlip] = useState<PageFlip | null>(null);
    const [numPages, setNumPages] = useState(0);

    const pdfRef = useRef();
    useImperativeHandle(ref, () => ({
      pageFlip: () => pageFlip,
    }));

    const removeHandlers = useCallback(() => {
      const flip = pageFlip;
      if (flip) {
        flip.off("flip");
        flip.off("changeOrientation");
        flip.off("changeState");
        flip.off("init");
        flip.off("update");
      }
    }, []);

    useEffect(() => {
      const setHandlers = () => {
        const flip = pageFlip;
        setPAgeFlip(pageFlip);
        if (flip) {
          if (props.onFlip) {
            flip.on("flip", (e: unknown) => props.onFlip?.(e));
          }

          if (props.onChangeOrientation) {
            flip.on("changeOrientation", (e: unknown) =>
              props.onChangeOrientation?.(e)
            );
          }

          if (props.onChangeState) {
            flip.on("changeState", (e: unknown) => props.onChangeState?.(e));
          }

          if (props.onInit) {
            flip.on("init", (e: unknown) => props.onInit?.(e));
          }

          if (props.onUpdate) {
            flip.on("update", (e: unknown) => props.onUpdate?.(e));
          }
        }
      };

      if (document.querySelectorAll(".react-pdf__Page").length) {
        removeHandlers();
        if (pageFlip) {
          if (!pageFlip.getFlipController()) {
            pageFlip.loadFromHTML(
              document.querySelectorAll(".react-pdf__Page")
            );
          } else {
            pageFlip.updateFromHtml(
              document.querySelectorAll(".react-pdf__Page")
            );
          }
        }
        setHandlers();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
      if (document.querySelector(".react-pdf__Document")) {
        setPAgeFlip(
          new PageFlip(document.querySelector(".react-pdf__Document"), props)
        );
      } else {
      }
    }, [isLoading]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
      setNumPages(numPages);
      setIsLoading(false);
    }

    return (
      <Document
        file={props.book ? props.book : blank}
        className={props.className}
        style={props.style}
        ref={pdfRef}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => {
          return (
            <Page
              key={`page_${index + 1}`}
              scale={props.scale}
              pageNumber={index + 1}
            />
          );
        })}
      </Document>
    );
  }
);

export const HTMLFlipBook = React.memo(HTMLFlipBookForward);
