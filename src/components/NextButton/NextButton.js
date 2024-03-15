import "./nextButton.css";

export default function NextButton({next}) {
  return (
    <button className="btn" onClick={next}>
      Next
    </button>
  );
}
