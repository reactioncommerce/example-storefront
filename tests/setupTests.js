import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";

configure({ adapter: new Adapter() });
