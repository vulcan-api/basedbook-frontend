export default function getUserObject() {
  try {
    let pairs = document.cookie.split(";");
    const cookies: any = {};
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split("=");
      cookies[(pair[0] + "").trim()] = decodeURIComponent(
        pair.slice(1).join("=")
      );
    }
    return JSON.parse(cookies["user_info"]);
  } catch (err) {
    console.error(err);
    return {};
  }
}
