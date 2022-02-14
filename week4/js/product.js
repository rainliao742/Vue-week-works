import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from './pagination.js';//匯入分頁功能

let productModal = {};
let delProductModal = {};
const apiUrl = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const apiPath =  'rainliao'; // 請加入個人 API Path

const app = createApp ({
	components:{
		pagination //註冊分頁功能
	},
	data(){
		return{
			url: 'https://vue3-course-api.hexschool.io/v2',
			products: [], // 擺放遠端的資料用
			isNew: false,//預設新增的資料 值為否
			temporaryObj: {
				imagesUrl: [],//放入多圖上傳用
			}, //當下選取的物件資料用
			pagination:{},//分頁使用的空物件
		}
	},	
	methods: {
		checkLogin(){
			// token 寫入至 headers 從login頁面來的cookie能夠持續使用此token // hexToken 必須跟 login頁面一樣設定為hexToken
			const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
			// 當下次載入頁面時，自動放入token
			axios.defaults.headers.common['Authorization'] = token;	

			axios.post(`${apiUrl}/api/user/check`)
			.then((res)=>{
				//有登入的話，就顯示getProducts的資料
				this.getProducts();
			})
			.catch((error)=>{				
				console.log(error.data.message);
				alert(error.data.message);
				//未登入或是嘗試直接進入此頁面會被導入login頁
				location.href="login.html";
			})
		},		
		getProducts(page = 1){ //參數預設值 query, param
			const url = `${apiUrl}/api/${apiPath}/admin/products/?page=${page}`;//用?+參數的方式,顯示每個分頁
			axios.get(url)
			.then((res)=>{
				this.products = res.data.products;//讀取遠端data裡的products,並且淺拷貝,放入空陣列products
				this.pagination = res.data.pagination;//讀取遠端data裡的pagination
			})
			.catch((error)=>{
				//錯誤訊息
				console.log(error.data.message);
				alert(error.data.message);
			});
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
	},
	mounted(){

		// 執行登入確認
		this.checkLogin();

		productModal = new bootstrap.Modal(document.getElementById('productModal'),{
			keyboard: false
		});
		delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'),{
			keyboard: false
		});
	}		
})
//元件新增與編輯功能
app.component('productModal', {
	props:['temporaryObj','isNew'],
	template: '#templateForProductModal',
	methods:{
		updateProduct(){ //新增與編輯共用
			let url = `${apiUrl}/api/${apiPath}/admin/product`;
			let method = 'post';//新增資料使用post
			if(!this.isNew){
			//假設不是新的一筆,就顯示編輯用的URL跟method
				url = `${apiUrl}/api/${apiPath}/admin/product/${this.temporaryObj.id}`;//編輯要帶入該品項的id
				method = 'put'//編輯資料使用put				
			}
			axios[method](url, { data:this.temporaryObj})//用中括號的方式帶入method的變數
			.then((res)=>{
				console.log(res);
				//this.getProducts(); <= 外層使用的getProducts(更新頁面資料)方法,不能在內層使用
				this.$emit('get-products');
				productModal.hide();

			})
			.catch((error)=>{
				//錯誤訊息
				console.log(error.data.message);
				alert(error.data.message);
			});			
		},		
	}
})
//元件刪除功能
app.component('delProductModal', {
	props: ['temporaryObj'],
	template: '#templateDelProductModal',
	methods: {
		delProduct(){
			axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.temporaryObj.id}`)
				.then((res) => {
					delProductModal.hide(); //關閉互動視窗
					this.$emit('get-products'); //重新取得產品列表
				})
				.catch((error)=>{
				//錯誤訊息
				console.log(error.data.message);
				alert(error.data.message);
			});
		}
	},
})


app.mount('#app');