// import serviceInstance from "../axios";
import axios from 'axios';

const serviceInstance = axios.create(
  {
    baseURL : "https://us-central1-daily-status-tracker.cloudfunctions.net/v1"
  }
);

 const get = async (path, params) => {
  const response = await serviceInstance.get(path, buildGETRequest(params));
  if (response.status !== 200) {
    if(response.status === 401){
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    throw new Error(response.data);
  }
  return response.data;
};

 const post = async (path, requestBody) => {
    const response = await serviceInstance.post(path, requestBody, buildHeader());
    if (response.status.toString().startsWith("20")) {
      return response.data;
    }
    throw new Error(response.data);
};

export const put = async (path, requestBody) => {
  const response = await serviceInstance.put(path, requestBody, buildHeader());
  // refreshSession(response);
  if (!response.status.toString().startsWith("20")) {
    throw new Error(response.data);
  }
  return response.data;
};

export const deleteResource = async (path) => {
  const response = await serviceInstance.delete(
    path,
    buildHeader()
  );
  if (response.status !== 204) {
    throw new Error(response.data);
  }
  return response.data;
};

const buildHeader = () => {
  const authoriation = localStorage.getItem("auth_token");
  const user = localStorage.getItem("user");

  if (authoriation && user) {
    const headerReq = {
      headers: {
        Authorization: authoriation,
        uniquekey: JSON.parse(user).uid,
      },
    };

    return headerReq;
  }
};

const buildGETRequest = (param) => {
  const authoriation = localStorage.getItem("auth_token");
  const user = localStorage.getItem("user");
  let headerReq;
  if (authoriation && user) {
    headerReq = {
      headers: {
        Authorization: authoriation,
        uniquekey: JSON.parse(user).uid,
      },
    };
  }
if(param){
  return { ...headerReq, params: param };
}
return { ...headerReq};
};


const serviceClient = {
  post,
  get,
  put,
  deleteResource
};


export default serviceClient;