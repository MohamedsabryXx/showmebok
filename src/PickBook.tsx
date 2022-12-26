import { Form, InputGroup } from "react-bootstrap";
import React from "react";
import { useBookStore } from "./store";

function PickBook(props: any) {
  const storeBook = useBookStore((state: any) => state.storeBook);
  const addFile = (event: any): void => {
    storeBook(event.target.files[0]);
  };

  return (
    <InputGroup className="mb-3" style={{ width: 700 }}>
      <Form.Control
        aria-label="PDF"
        type="file"
        accept=".pdf"
        onChange={addFile}
      />
    </InputGroup>
  );
}

export default PickBook;
