const URL_API = "https://openai4all.onrender.com/";

export const imageRequest = (message = "") => {
  
  if (message !== "") {
    return {
      method: "POST",
      url: URL_API + "v1/createImage",
      headers: { "Content-Type": "application/json" },
      data: { message }
    };
  } else return false;
};
