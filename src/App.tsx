import React, { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

function App() {
  const [visitorId, setVisitorId] = useState("");

  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        setVisitorId(result.visitorId);
      });
  }, []);

  console.log(visitorId)

  return (
    <div className="h-128 w-128 bg-red-600">
      
      
    </div>
  );
}

export default App;
