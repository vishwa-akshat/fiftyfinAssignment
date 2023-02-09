import Form from "components/Form";

import PatternImage from "images/img-pattern.png";

import "./style.scss";

export default function LoginPage() {
  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="logo-wrapper">Untitled UI</div>
        <Form />
      </div>
      <div className="image-wrapper">
        <img className="image" src={PatternImage} alt="pattern" />
      </div>
    </div>
  );
}
