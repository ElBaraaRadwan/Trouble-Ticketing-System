export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export function base64ToFile(base64, fileName, mimetype) {
  return fetch(base64)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new File([buffer], fileName), { type: mimetype });
}
