import Cookies from "js-cookie";

export default function getUserObject() {
  const user = Cookies.get('user_info');
  if(user)
    return JSON.parse(user);
  return {};
}
