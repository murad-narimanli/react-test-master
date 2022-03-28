import { render } from "react-dom";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "./styles.css";

import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
