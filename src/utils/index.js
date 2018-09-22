const getBase64FromImage = (img) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};

const setItem = (key, value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    throw new Error('not supporting localStorage');
  }
};

const getItem = (key) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  } else {
    throw new Error('not supporting localStorage');
  }
};

export default {
  getBase64FromImage,
  setItem,
  getItem
}