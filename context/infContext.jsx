import React, { createContext, useState } from "react";

const InfluencersContext = createContext(null);

function InfluencersProvider({ children }) {
  const [influencers, setInfluencers] = useState(null);
  return (
    <InfluencersContext.Provider value={{ influencers, setInfluencers }}>
      {children}
    </InfluencersContext.Provider>
  );
}

export { InfluencersContext, InfluencersProvider };
