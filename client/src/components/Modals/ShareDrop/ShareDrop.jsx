import React, { forwardRef } from "react";
import "./share-drop.scss";

import {
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareDrop = ({ url }, ref) => {
  return (
    <ul ref={ref} className="share-drop">
      <li>
        <EmailShareButton url={url}>
          <EmailIcon round={true} size={32} />
          Email
        </EmailShareButton>
      </li>
      <li>
        <FacebookShareButton url={url}>
          <FacebookIcon round={true} size={32} />
          Facebook
        </FacebookShareButton>
      </li>
      <li>
        <TwitterShareButton url={url}>
          <TwitterIcon round={true} size={32} />
          Twitter
        </TwitterShareButton>
      </li>
      <li>
        <TelegramShareButton url={url}>
          <TelegramIcon round={true} size={32} />
          Telegram
        </TelegramShareButton>
      </li>
      <li>
        <WhatsappShareButton url={url}>
          <WhatsappIcon round={true} size={32} />
          Whatsapp
        </WhatsappShareButton>
      </li>
    </ul>
  );
};

export default forwardRef(ShareDrop);
