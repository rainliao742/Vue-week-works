let productModal = {};
let delProductModal = {};

const App = {
	data(){
		return{
			apiUrl:'https://vue3-course-api.hexschool.io/v2', // 請加入站點
			apiPath: 'rainliao', // 請加入個人 API Path			
			products: [], // 擺放遠端的資料用
			isNew: false,//預設新增為否
			temporaryObj: {
				imagesUrl: [],//放入多圖上傳用
			}, //當下選取的物件資料用
		}
	},	
	methods: {
		checkLogin(){
			axios.post(`${this.apiUrl}/api/user/check`)
			.then((res)=>{
				//有登入的話，就顯示getProducts的資料
				this.getProducts();
			})
			.catch((error)=>{
				//未登入或是嘗試直接進入此頁面會被導入login頁
				console.log(error.data.message);
				alert(error.data.message);
				location.href="login.html";
			})
		},		
		getProducts(){
			axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
			.then((res)=>{
				this.products = [ ...res.data.products];//讀取遠端data裡的products,並且淺拷貝,放入空陣列products
			})
			.catch((error)=>{
				//錯誤訊息
				console.log(error.data.message);
				alert(error.data.message);
			});
		},
			
		putItemsDetail(item){
			//點擊時將物件item資訊拷貝放入到temporaryObj
			this.temporaryObj = { ...item }
		},
		openModal(status, product){//status對照isNew,edit,delete  product對照item
			if(status === 'isNew'){
				this.temporaryObj = {
					imagesUrl:[],
				}//將內容顯示為空的
				this.isNew = true; //代表是新的一筆
				productModal.show();
			}else if(status === 'edit'){
				this.temporaryObj = { ...product }//淺拷貝或是深拷貝。以防傳參考，萬一被使用者修改到原來的資料
				productModal.show();
				this.isNew = false; //代表是舊的
			}else if(status === 'delete'){
				this.temporaryObj = { ...product }//淺拷貝或是深拷貝。
				delProductModal.show();
			}			
		},
		updateProduct(){ //新增與編輯共用
			let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
			let method = 'post'//新增資料使用post
			if(!this.isNew){
				url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temporaryObj.id}`;//編輯要帶入該品項的id
				method = 'put'//編輯資料使用put				
			}
			axios[method](url, { data: this.temporaryObj})//用中括號的方式帶入method的變數
			.then((res)=>{
				console.log(res);
				this.getProducts();
				productModal.hide();

			})
			.catch((error)=>{
				//錯誤訊息
				console.log(error.data.message);
				alert(error.data.message);
			});			
		},
		delProduct(){
			let url =`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temporaryObj.id}`;
			axios.delete(url)
			.then((res)=>{
				console.log(res);
				this.getProducts();
				delProductModal.hide();
			})
			.catch((error)=>{
				//錯誤訊息
				console.log(error.data.message);
				alert(error.data.message);
			});
		},
	},
	mounted(){
		// token 寫入至 headers 從login頁面來的cookie能夠持續使用此token // hexToken 必須跟 login頁面一樣設定為hexToken
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
		// 當下次載入頁面時，自動放入token
		axios.defaults.headers.common['Authorization'] = token;
		// 執行登入確認
		this.checkLogin();

		productModal = new bootstrap.Modal(document.getElementById('productModal'),{
			keyboard: false
		});
		delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'),{
			keyboard: false
		});
	}		
}

Vue.createApp(App).mount('#app');