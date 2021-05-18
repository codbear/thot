import { Divider, List } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';

import { NavItem } from '../NavItem';

const MainNav = () => {
  return (
    <>
      <List aria-label="Bibliothèque">
        <NavItem primary="Bibliothèque" to="/" icon={<HomeOutlinedIcon />} />
        <NavItem primary="Recherche" to="/search" icon={<SearchOutlinedIcon />} />
      </List>
      <Divider />
      <List aria-label="Métadonnées">
        <NavItem primary="Auteurs" to="/metas/authors" icon={<PeopleAltOutlinedIcon />} />
        <NavItem primary="Genres" to="/metas/genres" icon={<BookmarksOutlinedIcon />} />
        <NavItem primary="Éditeur" to="/metas/publishers" icon={<StoreOutlinedIcon />} />
      </List>
      <Divider />
      <List aria-label="Paramètres">
        <NavItem primary="Paramètres" to="/my/settings" icon={<SettingsOutlinedIcon />} />
        <NavItem primary="Mon compte" to="/my/account" icon={<AccountBoxOutlinedIcon />} />
      </List>
    </>
  );
};

export default MainNav;
