import { Form, InputGroup } from "react-bootstrap";
import React from "react";
import { useBookStore } from "./store";

function SeachBook() {
  const storeBook = useBookStore((state: any) => state.storeBook);
  const book = useBookStore((state: any) => state.book);
  const addFile = (event: any): void => {
    const file = "https://cors-anywhere.herokuapp.com/" + event.target.value;
    if (file.includes(".pdf")) storeBook(file);
  };

  return (
    <InputGroup className="mb-3" style={{ width: 700 }}>
      <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
      <Form.Control
        placeholder="Please enter some PDF url"
        onChange={addFile}
        aria-label="PDF"
      />
    </InputGroup>
  );
}

export default SeachBook;
