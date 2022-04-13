<template>
  <div class="container">
    <div
      style="
        min-height: 400px;
        background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
        background-position: center center;
      "
    ></div>
    <div class="mt-5 mb-7">
      <div class="row">
        <div class="col-md-12 d-flex flex-wrap justify-content-center">
          <h2 class="mb-3 text-center">訂單送出成功!</h2>
          <h5 class="w-100 1h-sm" >感謝您的購買:</h5>
          <p class="2h-sm py-2" style="line-height:1.6em;">
            我們將於7-10個工作天，宅配到您府上。若為特殊藝術品，包材包覆會更加緊密，切勿重摔。
            拆封時請錄影、或拍照記錄，若有問題，可致電<span class="text-danger">0800-099063</span>服務電話或是電子信箱：<span class="text-danger">van-go@gallery.com.tw</span>
            誠摯邀請您進入到藝術的世界，也替畫家門，誠摯的感謝您購買此藝術品。
          </p>
          <router-link class="btn btn-outline-dark me-2 px-4 rounded-0 mb-4" to="/" >
            回首頁
          </router-link>
        </div>
        <!-- <div class="col-md-6">
          <div class="card rounded-0 py-4">
            <div class="card-header border-bottom-0 bg-white px-4 py-0">
              <h2>Order Detail</h2>
            </div>
            <div class="card-body px-4 py-0">
              <ul class="list-group list-group-flush">
                <li class="list-group-item px-0">
                  <div class="d-flex mt-2">
                    <img
                      src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                      alt=""
                      class="me-2"
                      style="width: 60px; height: 60px; object-fit: cover"
                    />
                    <div class="w-100 d-flex flex-column">
                      <div class="d-flex justify-content-between fw-bold">
                        <h5>Lorem ipsum</h5>
                        <p class="mb-0">x10</p>
                      </div>
                      <div class="d-flex justify-content-between mt-auto">
                        <p class="text-muted mb-0"><small>NT$12,000</small></p>
                        <p class="mb-0">NT$12,000</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="list-group-item px-0">
                  <div class="d-flex mt-2">
                    <img
                      src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                      alt=""
                      class="me-2"
                      style="width: 60px; height: 60px; object-fit: cover"
                    />
                    <div class="w-100 d-flex flex-column">
                      <div class="d-flex justify-content-between fw-bold">
                        <h5>Lorem ipsum</h5>
                        <p class="mb-0">x10</p>
                      </div>
                      <div class="d-flex justify-content-between mt-auto">
                        <p class="text-muted mb-0"><small>NT$12,000</small></p>
                        <p class="mb-0">NT$12,000</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="list-group-item px-0 pb-0">
                  <table class="table text-muted">
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          class="border-0 px-0 font-weight-normal"
                        >
                          Lorem ipsum
                        </th>
                        <td class="text-end border-0 px-0">NT$24,000</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          class="border-0 px-0 pt-0 font-weight-normal"
                        >
                          Payment
                        </th>
                        <td class="text-end border-0 px-0 pt-0">ApplePay</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-between mt-2">
                    <p class="mb-0 h4 fw-bold">Lorem ipsum</p>
                    <p class="mb-0 h4 fw-bold">NT$24,000</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
