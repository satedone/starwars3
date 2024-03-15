import Header from "../Header";
import NextButton from "../NextButton";
import ItemDescription from "../ItemDescription/ItemDescription.js";
import React, { useState, useEffect } from "react";
import { getData } from "../../services/swDataHandler";

const imageUrlBase = 'https://starwars-visualguide.com/assets/img/';

function App() {
  const [data, setData] = useState({});
  const [entity, setEntity] = useState("people");
  const [id, setId] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getData(id, entity);
      setData(data);
    })();
  }, [id, entity]);

  function nextObj() {
    setId((id) => id + 1);
  }

  return (
    <div className="app">
      {/* <Header switchEntity={setEntity} />
      <NextButton next={nextObj} /> */}
      <ItemDescription
        imgUrl={`${imageUrlBase}${
          entity === "people" ? "characters" : entity
        }/${id}.jpg`}
        data={data}
      />
    </div>
  );
}

export default App;
