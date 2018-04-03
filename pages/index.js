import withData from "./../lib/apollo/withData";
import Header from "./../components/Header";
import Profile from "./../components/Profile";

const Shop = () => (
  <div>

    <Profile />
  </div>
);

export default withData(Shop);
