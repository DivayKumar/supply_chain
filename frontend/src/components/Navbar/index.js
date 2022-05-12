import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/' activeStyle>
			Add Product
		</NavLink>
		<NavLink to='/allproduct' activeStyle>
			All Product
		</NavLink>
		<NavLink to='/searchproduct' activeStyle>
			Search Product
		</NavLink>
		<NavLink to='/transferproduct' activeStyle>
			Transfer Product
		</NavLink>
		<NavLink to='/history' activeStyle>
			History
		</NavLink>

		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>

	</Nav>
	</>
);
};

export default Navbar;
