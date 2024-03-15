import "./itemDescription.css";

export default function ItemDescription({ imgUrl, data }) {
  const { name, ...otherData } = data;

  return (
    <div className="itemDescription">
      <img
        className="itemImage"
        alt="illustration"
        src={imgUrl}
        onError={(e) =>
          (e.target.src = process.env.PUBLIC_URL + "starofdeath.jpg")
        }
      />
      <h3>{name}</h3>

      {Object.entries(otherData).map(([key, value]) => {
        return (
          <li className="descItem" key={key}>
            {" "}
            {key} : {value}
          </li>
        );
      })}
    </div>
  );
}