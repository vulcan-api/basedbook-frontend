import Cookies from "js-cookie";

export default function getUserObject() {
  const user = Cookies.get('user_info');
  if(user)
    return JSON.parse(user);
  console.log('NO COOKIES!');
  return {};
}

// const updateMains = (dark: boolean) => {
//   for(let i = 1; i < 5; i++) {
//     const add2Color = dark ? '#c2c8e0' : '#17181C';
//     setVariable(`main-${i}00`, add2Color+(i*2)+'0', true); 
//     setVariable(`add2-${i}00`, add2Color+(i*2)+'0', true);
//   }
// }

// const getVariable = (name: string) => {
//   return document.documentElement.style.getPropertyValue(`--${name}`);
// }

// const setVariable = (name: string, value: string, isDirect?: boolean) => {
//     document.documentElement.style.setProperty(`--${name}`, isDirect? value : `var(--${value})`);
// }

const setLight = () => {
  //setVariable('bg-clr', 'light');
  //setVariable('txt-clr', 'dark');
  //updateMains(false);
}

const setDark = () => {
  //setVariable('bg-clr', 'dark');
  //setVariable('txt-clr', 'light');
  //updateMains(true);
}

export function executeTheme() {
  if(getTheme() === true)
    setDark();
}

export function getTheme(): boolean {
  return getUserObject().theme;
}

export function toggleTheme() {
  const user = getUserObject();

  if(user.theme === true) {
    user.theme = false;
    setLight();
  }
  else {
    user.theme = true;
    setDark();
  }

  Cookies.set('user_info', JSON.stringify(user));
}