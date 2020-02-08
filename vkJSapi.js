const request = require('request');

class API {
	init(accessToken, apiVersion=5.103) {
		this.accessToken = accessToken;
		this.apiVersion = apiVersion;
		this.isInit = true;
	}

	getResponce(methodName, data={}, callback=()=>{}) {
		if (!this.isInit) {
			throw new APIError('API not initialized.');
		}

		const options = {
			url: 'https://api.vk.com/method/' + methodName,
			method: 'POST',
			form: Object.assign({
				access_token: this.accessToken,
				v: this.apiVersion
			}, data),
			json: true
		};

		request(options, (error, responce, body) => {
			if (error) {
				throw new APIError(error.message);
			}
			if (body.error) {
				throw new APIError(body.error.error_msg);
			}
			callback(body);
		});
	}
}

class APIError {
	constructor(message) {
		this.name = 'APIError';
		this.message = message;
	}
}

module.exports = new API();