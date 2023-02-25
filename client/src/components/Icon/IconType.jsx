import { newGuid } from "utils/guid";
import { ReactComponent as Add } from "assets/svg/add.svg";
import { ReactComponent as Attach } from "assets/svg/attach.svg";
import { ReactComponent as User } from "assets/svg/bx_user.svg";
import { ReactComponent as Comment } from "assets/svg/Comment.svg";
import { ReactComponent as Compass } from "assets/svg/compass.svg";
import { ReactComponent as Contact } from "assets/svg/contact.svg";
import { ReactComponent as Home } from "assets/svg/Home.svg";
import { ReactComponent as Favorite } from "assets/svg/favorite.svg";
import { ReactComponent as FavoriteFill } from "assets/svg/FavoriteFill.svg";
import { ReactComponent as Messanger } from "assets/svg/Messanger.svg";
import { ReactComponent as Posts } from "assets/svg/posts.svg";
import { ReactComponent as Save } from "assets/svg/Save.svg";
import { ReactComponent as SaveFill } from "assets/svg/SaveFill.svg";
import { ReactComponent as Smille } from "assets/svg/smille.svg";
import { ReactComponent as Video } from "assets/svg/Video.svg";
import { ReactComponent as Dots } from "assets/svg/Dots.svg";
import { ReactComponent as Copy } from "assets/svg/Copy.svg";
import { ReactComponent as Edit } from "assets/svg/Edit.svg";
import { ReactComponent as Trash } from "assets/svg/Trash.svg";
import { ReactComponent as Volume } from "assets/svg/Volume.svg";
import { ReactComponent as VolumeMuted } from "assets/svg/VolumeMuted.svg";
import { ReactComponent as Call } from "assets/svg/Call.svg";

export const IconType =
  "Add" |
  "Volume" |
  "VolumeMuted" |
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
  "SaveFill" |
  "Video" |
  "Dots" |
  "Copy" |
  "Edit" |
  "Trash" |
  "Call" |
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
  ["FavoriteFill", <FavoriteFill key={newGuid()} />],
  ["Messanger", <Messanger key={newGuid()} />],
  ["Posts", <Posts key={newGuid()} />],
  ["Save", <Save key={newGuid()} />],
  ["SaveFill", <SaveFill key={newGuid()} />],
  ["Smille", <Smille key={newGuid()} />],
  ["Video", <Video key={newGuid()} />],
  ["Dots", <Dots key={newGuid()} />],
  ["Copy", <Copy key={newGuid()} />],
  ["Edit", <Edit key={newGuid()} />],
  ["Trash", <Trash key={newGuid()} />],
  ["Volume", <Volume key={newGuid()} />],
  ["VolumeMuted", <VolumeMuted key={newGuid()} />],
  ["Call", <Call key={newGuid()} />],
]);
