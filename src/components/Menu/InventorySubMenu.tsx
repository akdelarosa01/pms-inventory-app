import { Link } from "react-router-dom";
import { MenuList, MenuItem } from "@chakra-ui/react";

const InventorySubMenu = (props:any) => {
    const subMenu = props.subMenu;
    // const menuName = props.menuName;
    const fontSz = props.fontSize;

    return (
        <div>
            <MenuList fontSize={fontSz}>
                <MenuItem key={subMenu[0].name} as={Link} to={subMenu[0].href}>{subMenu[0].name}</MenuItem>
                <MenuItem key={subMenu[1].name} as={Link} to={subMenu[1].href}>{subMenu[1].name}</MenuItem>
                <MenuItem key={subMenu[2].name} as={Link} to={subMenu[2].href}>{subMenu[2].name}</MenuItem>
            </MenuList>
		</div>
    );
}

export default InventorySubMenu