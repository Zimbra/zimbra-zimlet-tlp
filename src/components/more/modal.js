import { createElement } from 'preact';
import { withIntl } from '../../enhancers';
import { ModalDialog } from '@zimbra-client/components';
import style from './style';

const TLPModal = ({ onClose, onAction, context, zimletStrings, props }) => {
   console.log(props);
   return (
      <ModalDialog
         title={zimletStrings.menuItem}
         cancelButton={false}
         onAction={onAction}
         onClose={onClose}
         actionLabel="buttons.ok"
      >
         <p>{zimletStrings.tlpDescription} <span style='color:blue; text-decoration:underline; cursor:pointer' onClick={e => handleLinkClick(zimletStrings.tlpHelpLink)}>{zimletStrings.tlpHelpLink}</span>.<br /><hr />{zimletStrings.modalText}<br /><br />
            <div onClick={e => setTLP([props, "[TLP:RED]", zimletStrings])} className={style.tlpButton} style="color: #ff0033; background: #000">{zimletStrings.redDescription}</div><br />
            <div onClick={e => setTLP([props, "[TLP:AMBER]", zimletStrings])} className={style.tlpButton} style="color: #ffc000; background: #000">{zimletStrings.amberDescription}</div><br />
            <div onClick={e => setTLP([props, "[TLP:GREEN]", zimletStrings])} className={style.tlpButton} style="color: #3f0; background: #000">{zimletStrings.greenDescription}</div><br />
            <div onClick={e => setTLP([props, "[TLP:WHITE]", zimletStrings])} className={style.tlpButton} style="color: #fff; background: #000">{zimletStrings.whiteDescription}</div><br />
         </p>
      </ModalDialog>
   );
};

function handleLinkClick(tlpHelpLink) {
   window.open(tlpHelpLink);
}

function setTLP(args) {
   const props = args[0];
   const TLPDesignation = args[1];
   const zimletStrings = args[2];

   const subjectRegex = /\[TLP:RED\]\s|\[TLP:AMBER\]\s|\[TLP:GREEN\]\s/gm
   let subject = props.getSubject();
   subject = subject.replaceAll(subjectRegex, "");

   if (TLPDesignation == "[TLP:WHITE]") {
      props.setSubject(subject);
   }
   else {
      props.setSubject(TLPDesignation + " " + subject);
   }

   let content = window.parent.tinyMCE.activeEditor.getContent();
   const contentRegex = /<div><span style=".*">\[TLP:.*\] .*<\/span><\/div>/m
   content = content.replace(contentRegex, "");
   
   switch (TLPDesignation) {
      case "[TLP:RED]":
         window.parent.tinyMCE.activeEditor.setContent("<span style='color: #ff0033; background: #000; padding:3px;'>" + zimletStrings.redDescription + "</span>" + content);
         break;
      case "[TLP:AMBER]":
         window.parent.tinyMCE.activeEditor.setContent("<span style='color: #ffc000; background: #000; padding:3px;'>" + zimletStrings.amberDescription + "</span>" + content);
         break;
      case "[TLP:GREEN]":
         window.parent.tinyMCE.activeEditor.setContent("<span style='color: #3f0; background: #000; padding:3px;'>" + zimletStrings.greenDescription + "</span>" + content);
         break;
      case "[TLP:WHITE]":
         window.parent.tinyMCE.activeEditor.setContent(content);
         break;
   }

}

export default withIntl()(TLPModal);
