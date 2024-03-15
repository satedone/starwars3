import "./header.css";

export default function Header({ switchEntity }) {
  return (
    <div className="header">
      <h1>Star Wars API</h1>
      <ul className="nav">
        <li onClick={() => switchEntity("people")} className="navItem">
          People
        </li>
        <li onClick={() => switchEntity("planets")} className="navItem">
          Planets
        </li>
        <li onClick={() => switchEntity("starships")} className="navItem">
          Starships
        </li>
      </ul>
    </div>
  );
}
