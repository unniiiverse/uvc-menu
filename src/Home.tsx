import React from "react";
import { Menu, MenuItem } from "../index";


const Home: React.FC = () => {
  function Trigger() {
    return <p>open 1111111111111111111111111111111111111111</p>;
  }

  return (
    <div className="Home w-full h-full min-h-screen bg-[#888] p-[200px]">
      <Menu trigger={<Trigger />} animation="slide" direction="bottom" align="stretch" menuClassName={'uvc-menu--fancy'}>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </Menu>

      {/* <Menu trigger={<Trigger />} animation="slide" direction="left" menuClassName={'uvc-menu--fancy'}>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </Menu>

      <Menu trigger={<Trigger />} animation="slide" direction="right" menuClassName={'uvc-menu--fancy'}>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </Menu>

      <Menu trigger={<Trigger />} animation="slide" direction="bottom" align="center" menuClassName={'uvc-menu--fancy'}>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </Menu> */}
    </div>
  );
};

export default Home;