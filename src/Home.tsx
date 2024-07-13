import React, { useEffect, useState } from "react";
import { Menu, MenuItem, MenuList } from "../index";


const Home: React.FC = () => {
  const [state, setState] = useState(true);

  function Trigger() {
    return <p>open 1111111111111111111111111111111111111111</p>;
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('Menu closed');
  //     setState(false);
  //   }, 3000);
  // }, []);

  useEffect(() => {
    console.log(`OUT - ${state}`);
  }, [state]);

  return (
    <div className="Home w-full h-full min-h-screen bg-[#888] p-[200px]">
      <Menu trigger={<Trigger />} animation="slide" direction="bottom" className={'uvc-menu--fancy'} id="fsdfsdsfd" statePriority="outer" state={state} stateSetter={setState}>
        <p>hello</p>

        <MenuList className="w-fit">
          <MenuItem id="haha">Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>

      <button onClick={() => setState(!state)}>independent</button>

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