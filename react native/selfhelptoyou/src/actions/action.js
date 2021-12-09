import { CHANGE_BACKGROUNDCOLOR, CHANGE_SHOWIMAGE, CHANGE_TEXTCOLOR, CHANGE_SHOWFACE, USE_DEFAULT } from "./types";

export const change_backgroudcolor = color => (
     {
       type: CHANGE_BACKGROUNDCOLOR,
       data: color,
     }
  );

export const change_textcolor = color => (
    {
      type: CHANGE_TEXTCOLOR,
      data: color,
    }
 );  

export const change_showimage = b => (
    {
      type: CHANGE_SHOWIMAGE,
      data: b,
    }
 );

 export const change_showface = b => (
  {
    type: CHANGE_SHOWFACE,
    data: b,
  }
);

export const use_default = () => (
  {
    type: USE_DEFAULT,
  }
);




