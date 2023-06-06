function MessagesHeader() {
  return (
    <div style={{ border: "1px solid black" }}>
      <div style={{ display: "flex", padding: "10px", flexWrap: "wrap" }}>
        <div style={{ width: "400px", border: "1px solid black" }}>
          {" "}
          app Name{" "}
        </div>
        <div style={{ width: "200px", border: "1px solid black" }}>
          {" "}
          Favorite Button{" "}
        </div>
        <div style={{ width: "500px", border: "1px solid black" }}>
          {" "}
          Chat Search{" "}
        </div>
        <div style={{ width: "500px", border: "1px solid black" }}>
          {" "}
          description{" "}
        </div>
        <div style={{ width: "500px", border: "1px solid black" }}> count </div>
      </div>
    </div>
  );
}

export default MessagesHeader;
