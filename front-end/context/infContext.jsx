import React, { createContext, useState } from "react";
import Pic0 from "../assets/pics/pic0.jpg";
import Pic1 from "../assets/pics/pic1.jpg";
import Pic2 from "../assets/pics/pic2.jpg";
import Pic3 from "../assets/pics/pic3.jpg";
import Pic4 from "../assets/pics/pic4.jpg";
import Pic5 from "../assets/pics/pic5.jpg";
import Pic6 from "../assets/pics/pic6.jpg";
import Pic7 from "../assets/pics/pic7.jpg";
import Pic8 from "../assets/pics/pic8.jpg";
import Pic9 from "../assets/pics/pic9.jpg";
import Pic10 from "../assets/pics/pic10.jpg";
import Pic11 from "../assets/pics/pic11.jpg";
import Pic12 from "../assets/pics/pic12.jpg";
import Pic13 from "../assets/pics/pic13.jpg";
import Pic14 from "../assets/pics/pic14.jpg";
import Pic15 from "../assets/pics/pic15.jpg";

const data = [
  { img: Pic0, name: "Nicole Correa", age: 24, id: "0" },
  { img: Pic1, name: "Lennox Bullock", age: 22, id: "1" },
  { img: Pic2, name: "Louisa Ferreira", age: 26, id: "2" },
  { img: Pic3, name: "Rudy Beasley", age: 23, id: "3" },
  { img: Pic4, name: "Arwa Tillman", age: 20, id: "4" },
  { img: Pic5, name: "Sasha Cooke", age: 28, id: "5" },
  { img: Pic6, name: "Sofia Woolley", age: 21, id: "6" },
  { img: Pic7, name: "Beverly Gray", age: 30, id: "7" },
  { img: Pic8, name: "Momina Petty", age: 21, id: "8" },
  { img: Pic9, name: "Samantha Horne", age: 28, id: "9" },
  { img: Pic10, name: "Stacy Jensen", age: 29, id: "10" },
  { img: Pic11, name: "Leela Kane", age: 23, id: "11" },
  { img: Pic12, name: "Darcey Roman", age: 21, id: "12" },
  { img: Pic13, name: "Ophelia Bowers", age: 25, id: "13" },
  { img: Pic14, name: "Monica Drummond", age: 26, id: "14" },
  { img: Pic15, name: "Lara Croft", age: 22, id: "15" },
];

const InfluencersContext = createContext(null);

function InfluencersProvider({ children }) {
  const [influencers, setInfluencers] = useState(data);
  const influencersValue = React.useMemo(
    () => ({ influencers, setInfluencers }),
    [influencers, setInfluencers]
  );
  return (
    <InfluencersContext.Provider value={influencersValue}>
      {children}
    </InfluencersContext.Provider>
  );
}

export { InfluencersContext, InfluencersProvider };
