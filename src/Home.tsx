import React from "react";
import { Menu, MenuItem } from "../index";


const Home: React.FC = () => {
  function Trigger() {
    return <p>open</p>
  }

  return (
    <div className="Home w-full h-full min-h-screen bg-[#888]">
      <Menu trigger={<Trigger />} animation="slideDown" menuClassName={'uvc-menu--fancy'}>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </Menu>

      <Menu trigger={<Trigger />} animation="slideDown" menuClassName={'uvc-menu--fancy'}>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </Menu>

      <Menu trigger={<Trigger />} animation="slideDown" menuClassName={'uvc-menu--fancy'}>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </Menu>
    </div>
  );
};

export default Home;