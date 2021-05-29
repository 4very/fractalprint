import React, { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [visitorId, setVisitorId] = useState("");

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorId(result.visitorId);
      });
  }, []);

  return (
    <div className="h-full w-full bg-red-600">
      {visitorId}
      
    </div>
  );
}

export default App;
