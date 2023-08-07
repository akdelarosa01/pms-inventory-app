import { Link } from "react-router-dom";
import { MenuList, MenuItem } from "@chakra-ui/react";

const AdjustmentSubMenu = (props:any) => {
    const subMenu = props.subMenu;
    // const menuName = props.menuName;
    const fontSz = props.fontSize;

    return (
        <div>
            <MenuList fontSize={fontSz}>
                <MenuItem key={subMenu[3].name} as={Link} to={subMenu[3].href}>{subMenu[3].name}</MenuItem>
                <MenuItem key={subMenu[4].name} as={Link} to={subMenu[4].href}>{subMenu[4].name}</MenuItem>
            </MenuList>
		</div>
    );
}

export default AdjustmentSubMenu