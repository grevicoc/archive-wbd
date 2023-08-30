export function getAPI(url) {
  return new Promise(function (resolve, reject) {
      const objXMLHttpRequest = new XMLHttpRequest();

      objXMLHttpRequest.onreadystatechange = function () {
          if (objXMLHttpRequest.readyState === 4) {
              if (objXMLHttpRequest.status == 200) {
                  resolve(objXMLHttpRequest.responseText);
              } else {
                  reject('Error Code: ' +  objXMLHttpRequest.status + ' Error Message: ' + objXMLHttpRequest.statusText);
              }
          }
      }

      objXMLHttpRequest.open('GET', url);
      objXMLHttpRequest.send();
  });
}