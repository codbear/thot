import { ReactElement } from 'react';
import Link from 'next/link';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

interface NavItemProps {
  icon?: ReactElement;
  primary: string;
  to: string;
}

const defaultProps = {
  icon: null,
};

const NavItem = ({ icon, primary, to }: NavItemProps) => (
  <li>
    <Link href={to}>
      <ListItem button component="a">
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </Link>
  </li>
);

NavItem.defaultProps = defaultProps;

export default NavItem;
