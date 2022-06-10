/**
 * CustomHTTP Kütüphanesi
 * 
 * @versiyon 3.0.0
 * @yazarlar Brad Traversy - BA
 * @lisans MIT
 * 
 **/

 class CustomHTTP{
	
	// HTTP GET isteği oluşturma
	async get(url){
		
		const response = await fetch(url);
		const resData = await response.json();
		return resData;
	}

	// HTTP POST isteği oluşturma
	async post(url, data) {
		
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const resData = await response.json();
		return resData;
	}

	// HTTP PUT isteği oluşturma
	async put(url,data) {
		
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const resData = await response.json();
		return resData;
	}

	// HTTP DELETE isteği oluşturma
	async delete(url) {
		
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json'
			}
		});

		const resData = await ' Post Silindi.';
		return resData;
	}
}

export const http = new CustomHTTP();