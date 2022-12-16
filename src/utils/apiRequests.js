const URL_API = "http://localhost:3131/"; //"https://openai4all.onrender.com/";

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
