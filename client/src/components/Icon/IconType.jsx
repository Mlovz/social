import { newGuid } from "utils/guid";
import { ReactComponent as Add } from "assets/svg/add.svg";
import { ReactComponent as Attach } from "assets/svg/attach.svg";
import { ReactComponent as User } from "assets/svg/bx_user.svg";
import { ReactComponent as Comment } from "assets/svg/Comment.svg";
import { ReactComponent as Compass } from "assets/svg/compass.svg";
import { ReactComponent as Contact } from "assets/svg/contact.svg";
import { ReactComponent as Home } from "assets/svg/Home.svg";
import { ReactComponent as Favorite } from "assets/svg/favorite.svg";
import { ReactComponent as Messanger } from "assets/svg/Messanger.svg";
import { ReactComponent as Posts } from "assets/svg/posts.svg";
import { ReactComponent as Save } from "assets/svg/Save.svg";
import { ReactComponent as Smille } from "assets/svg/smille.svg";

export const IconType =
  "Add" |
  "Attach" |
  "User" |
  "Comment" |
  "Compass" |
  "Contact" |
  "Home" |
  "Favorite" |
  "Messanger" |
  "Posts" |
  "Save" |
  "Smille";

export const iconTypes = new Map([
  ["Add", <Add key={newGuid()} />],
  ["Attach", <Attach key={newGuid()} />],
  ["User", <User key={newGuid()} />],
  ["Comment", <Comment key={newGuid()} />],
  ["Compass", <Compass key={newGuid()} />],
  ["Contact", <Contact key={newGuid()} />],
  ["Home", <Home key={newGuid()} />],
  ["Favorite", <Favorite key={newGuid()} />],
  ["Messanger", <Messanger key={newGuid()} />],
  ["Posts", <Posts key={newGuid()} />],
  ["Save", <Save key={newGuid()} />],
  ["Smille", <Smille key={newGuid()} />],
]);
