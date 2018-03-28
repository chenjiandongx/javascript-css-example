const ajaxJson = (url, { method = 'GET', data = null } = {}) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        method = method.toUpperCase();
        let urlEncode = [];
        if (data && method === 'GET') {
            for (let [key, value] of Object.entries(data)) {
                urlEncode.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
            urlEncode = '?' + urlEncode.join('&');
        }
        xhr.open(method, url + urlEncode);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (method === 'GET') {
            xhr.send(null);
        } else if (method === 'POST') {
            xhr.send(data);
        }

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (200 <= this.status < 300) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
}

const url = 'http://example.com';
ajaxJson(url)
    .then(data => console.log(data))
    .catch(err => console.log(err));