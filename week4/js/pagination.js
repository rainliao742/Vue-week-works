export default{
	props:['pages'],//用props帶入pages參數
	template:`
	<nav aria-label="Page navigation example">
		<ul class="pagination">
			<!--切換class,當有足夠前一頁的資料時才會顯示可以點擊-->
			<li class="page-item" :class="{ disabled: !pages.has_pre }">
				<a class="page-link" href="#" aria-label="Previous" @click="$emit('get-product', pages.current_page - 1)">
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<!--複製頁碼功能--><!--切換class,點擊當前是頁面的時候會增加效果-->
			<li class="page-item" 
			v-for="page in pages.total_pages" :key="page + 'number'" 
			:class="{ active: page === pages.current_page}">
				<a class="page-link" href="#" 
				@click="$emit('get-product',page)"
				>{{page}}</a>
			</li>
			<!--切換class,當有足夠下一頁的資料時才會顯示可以點擊-->
			<li class="page-item" :class="{ disabled: !pages.has_next }">
				<a class="page-link" href="#" aria-label="Next" @click="$emit('get-product',pages.current_page + 1)">
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>`,
}



