import Cookies from "js-cookie";

export default function getUserObject() {
  const user = Cookies.get('user_info');
  if(user)
    return JSON.parse(user);
  console.log('NO COOKIES!');
  return {};
}

const updateMains = (dark: boolean) => {

  const mainColor = dark ? 'light-' : 'black-';
  for(let i = 1; i < 5; i++) {
    setVariable(`main-${i}00`, mainColor+i+'00'); 
  }
  setVariable(`main-500`, mainColor+'500'); 
}

const setVariable = (name: string, value: string, isDirect?: boolean) => {
    document.documentElement.style.setProperty(`--${name}`, isDirect? value : `var(--${value})`);
}

const setLight = () => {
  setVariable('bg-clr', 'light');
  setVariable('txt-clr', 'dark');
  updateMains(false);
}

const setDark = () => {
  setVariable('bg-clr', 'dark');
  setVariable('txt-clr', 'light');
  updateMains(true);
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

  if(user.theme) {
    user.theme = false;
    setLight();
  }
  else {
    user.theme = true;
    setDark();
  }

  Cookies.set('user_info', JSON.stringify(user));
}
