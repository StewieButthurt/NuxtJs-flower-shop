<template>
    <v-app-bar
        light
        style="position: relative"
        id="default-header-search"
        height="80px"
        max-height="80px"
        app
        flat
        color="white"
      > 
        <client-only>
          <v-btn
            color="#97CF23"
            class="white--text"
            v-if="windowSize.x > 576"
          >
            Каталог
          </v-btn>
        </client-only>
        <v-autocomplete
          v-model="select"
          :items="searchResult"
          class="layout-default__combox-search"
          :search-input.sync="search"
          :menu-props="{value: disabledMenu}"
          item-text="name"
          item-value="name"
          outlined
          color="#97CF23"
          dense
          solo
          eager
          flat
          chips
          no-data-text="Совпадения не найдены"
          small-chips
          label="Поиск товаров..."
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
              @click:close="select = ''"
            >
              <v-avatar left>
                <v-img :src="data.item.avatar"></v-img>
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                <img :src="data.item.avatar">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <v-btn
          color="#97CF23"
          class="white--text"
          tile
          depressed
          height="40px"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <div class="search-app-bar__button" v-show="contacts">
          <svg width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g>
              <g>
                <path d="M256,0C156.748,0,76,80.748,76,180c0,33.534,9.289,66.26,26.869,94.652l142.885,230.257
                  c2.737,4.411,7.559,7.091,12.745,7.091c0.04,0,0.079,0,0.119,0c5.231-0.041,10.063-2.804,12.75-7.292L410.611,272.22
                  C427.221,244.428,436,212.539,436,180C436,80.748,355.252,0,256,0z M384.866,256.818L258.272,468.186l-129.905-209.34
                  C113.734,235.214,105.8,207.95,105.8,180c0-82.71,67.49-150.2,150.2-150.2S406.1,97.29,406.1,180
                  C406.1,207.121,398.689,233.688,384.866,256.818z"/>
              </g>
            </g>
            <g>
              <g>
                <path d="M256,90c-49.626,0-90,40.374-90,90c0,49.309,39.717,90,90,90c50.903,0,90-41.233,90-90C346,130.374,305.626,90,256,90z
                  M256,240.2c-33.257,0-60.2-27.033-60.2-60.2c0-33.084,27.116-60.2,60.2-60.2s60.1,27.116,60.1,60.2
                  C316.1,212.683,289.784,240.2,256,240.2z"/>
              </g>
            </g>
          </svg>
          <nuxt-link to="/" no-prefetch class="ml-5 search-app-bar__button-link">Контакты</nuxt-link>
        </div>
        <div class="search-app-bar__button" v-show="cabinet">
          <svg version="1.1" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <g>
              <g>
                <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
                  C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
                  c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
                  h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
                  c59.551,0,108,48.448,108,108S315.551,256,256,256z"/>
              </g>
            </g>
          </svg>
          <nuxt-link to="/admin/home" no-prefetch  class="ml-5 search-app-bar__button-link">Личный кабинет</nuxt-link >
        </div>
        <div class="search-app-bar__button" v-show="cart">
          <v-badge
            color="#FFA800"
            :content="countCart"
            offset-y="16"
            offset-x="10"
          >
            <!-- <svg enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="40px" 
            xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="m203.89 320.24h.079c36.237-.382 161.489-2.95 251.81-19.97 2.809-.529 5.072-2.608 5.837-5.362 5.577-20.067 18.758-72.031 20.708-121.02.144-3.617-2.316-6.821-5.848-7.616-43.292-9.737-196.849-41.901-355.196-46.979-2.444-.072-4.75 1.028-6.219 2.967s-1.906 4.47-1.172 6.79c2.314 7.321 4.78 14.79 7.329 22.199 1.348 3.918 5.617 6 9.532 4.653 3.917-1.348 6-5.615 4.653-9.532-1.34-3.895-2.656-7.805-3.938-11.701 24.856.987 49.534 2.624 73.62 4.712l9.45 43.459c-22.096-.925-44.403-1.657-66.554-2.177-.877-2.26-1.754-4.52-2.618-6.795-1.47-3.872-5.8-5.819-9.673-4.351-3.873 1.47-5.821 5.801-4.351 9.673 18.893 49.784 41.143 96.02 66.131 137.425 1.358 2.252 3.794 3.625 6.42 3.625zm-14.258-47.988c11.155-.935 25.85-2.044 43.663-3.125l7.69 35.366c-13.481.387-24.736.59-32.877.697-6.347-10.661-12.505-21.654-18.476-32.938zm129.179-68.33c24.184 1.87 46.587 3.979 66.804 6.289l-2.18 39.658c-19.909-.066-40.092.122-60.224.563zm-5.856 97.345c-20.502 1.269-39.832 2.14-56.726 2.738l-7.773-35.749c19.885-1.078 40.386-1.912 61.14-2.491zm11.673-35.861c19.384-.416 38.805-.596 57.983-.539l-1.695 30.836c-17.773 1.864-35.673 3.367-52.988 4.577zm75.912-53.406c23.541 2.959 44.239 6.258 61.723 9.839-1.651 10.386-3.542 20.331-5.459 29.424-19.117-.684-38.681-1.125-58.35-1.312zm-14.1-16.792c-20.892-2.373-44.056-4.534-69.063-6.441l-3.479-36.773c27.12 3.888 52.168 8.006 74.261 11.943zm-78.261 55.589c-21.389.606-42.498 1.484-62.951 2.616l-11.901-54.733c24.582 1.162 48.154 2.545 70.31 4.12zm87.852 43.226 1.598-29.079c18.812.173 37.535.576 55.854 1.207-1.869 7.954-3.636 14.836-5.086 20.227-16.597 2.999-34.309 5.521-52.366 7.645zm68.375-87.058c-17.939-3.643-39.082-6.989-63.041-9.979l1.668-30.346c27.712 5.132 49.758 9.764 63.993 12.898-.541 9.16-1.458 18.384-2.62 27.427zm-165.777-57.103 3.576 37.797c-22.747-1.595-46.963-2.984-72.175-4.147l-9.285-42.703c27.051 2.585 53.214 5.698 77.884 9.053zm-80.801 48.129 12.243 56.306c-20.358 1.257-36.539 2.541-47.887 3.541-9.994-19.849-19.396-40.563-28.163-62.019 21.27.536 42.646 1.263 63.807 2.172z"/><path d="m467.1 373.83h-15.02c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h15.02c3.976 0 7.21 3.239 7.21 7.22 0 3.976-3.234 7.21-7.21 7.21h-251.63c-13.939 0-25.759-9.051-29.412-22.522-3.137-11.57.591-23.47 9.521-31.017.032 0 .063.003.094.003.434 0 12.103-.018 31.025-.441-6.821 2.938-13.308 6.195-19.434 9.783-6.458 3.774-9.245 10.632-7.279 17.881 1.543 5.746 6.421 11.885 15.483 11.885h206.77c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-206.768c-.477 0-.654-.077-.656-.072-.083-.074-.25-.365-.345-.721-.096-.352-.092-.657-.104-.671.028-.038.167-.174.475-.354 23.178-13.575 52.096-22.181 85.949-25.579.005 0 .009-.002.014-.002 53.605-2.943 118.173-8.515 169.689-19.063 7.942-1.626 14.366-7.447 16.765-15.192 1.01-3.267 24.743-80.733 24.743-150.238 0-10.271-6.968-19.145-16.945-21.58-1.903-.465-187.86-45.388-379.137-50.671-2.601-6.768-5.202-13.255-7.772-19.379 3.354-4.984 5.315-10.979 5.315-17.425 0-17.253-14.037-31.29-31.29-31.29h-50.881c-17.253.001-31.29 14.037-31.29 31.29s14.037 31.29 31.29 31.29h34.463c4.544 10.651 10.839 26.333 17.759 46.285 14.766 48.14 44.17 129.499 93.28 208.751 1.041 1.679 2.277 3.182 3.667 4.495-9.393 11.136-12.87 26.23-8.877 40.957 5.45 20.095 23.087 33.597 43.889 33.597h3.214c-6.667 7.656-10.718 17.648-10.718 28.574 0 24.025 19.541 43.57 43.561 43.57 24.025 0 43.57-19.545 43.57-43.57 0-1.971-.145-3.927-.406-5.858 7.781-7.424 12.304-15.434 14.881-22.716h68.726c-6.667 7.656-10.718 17.648-10.718 28.574 0 24.025 19.541 43.57 43.561 43.57 24.025 0 43.57-19.545 43.57-43.57 0-1.971-.145-3.927-.406-5.858 7.818-7.459 12.345-15.51 14.916-22.82 11.255-1.072 20.088-10.575 20.088-22.106 0-12.252-9.963-22.22-22.21-22.22zm-452.1-320.945c0-8.982 7.308-16.29 16.29-16.29h50.882c8.982 0 16.29 7.308 16.29 16.29s-7.308 16.29-16.29 16.29h-50.882c-8.982 0-16.29-7.308-16.29-16.29zm67.171 31.29c5.067 0 9.852-1.218 14.089-3.365 1.148 2.802 2.301 5.67 3.457 8.605-4.941.31-9.651 2.267-13.345 5.51-1.443-3.66-2.892-7.245-4.345-10.75zm11.956 29.411c-.635-2.19-.187-4.579 1.198-6.391 1.36-1.78 3.494-2.833 5.73-2.833.041 0 .082 0 .123.001 194.606 3.283 388.384 50.096 390.319 50.568 3.24.791 5.503 3.673 5.503 7.008 0 67.262-23.089 142.623-24.072 145.797-.779 2.515-2.865 4.405-5.444 4.934-106.462 21.8-270.168 22.052-271.809 22.052-2.515 0-4.808-1.276-6.133-3.414-52.794-85.194-82.441-172.978-95.415-217.722zm324.215 331.272c-2.202.767-3.789-.345-4.37-.858-.578-.511-1.871-1.945-1.384-4.213l4.62-21.527h35.668c-7.412 14.418-22.31 22.349-34.534 26.598zm-166.815 30.546c-15.749 0-28.561-12.816-28.561-28.57 0-12.373 7.904-22.93 18.925-26.893l-3.584 16.699c-1.49 6.944.796 13.897 6.116 18.599 3.635 3.212 8.138 4.892 12.766 4.892 2.152 0 4.331-.363 6.463-1.104 6.03-2.096 11.322-4.487 15.978-7.084-2.415 13.323-14.093 23.461-28.103 23.461zm7.201-30.546c-2.203.767-3.79-.345-4.37-.858-.578-.511-1.871-1.944-1.384-4.212l4.62-21.527h35.668c-7.412 14.417-22.31 22.348-34.534 26.597zm152.413 30.546c-15.749 0-28.561-12.816-28.561-28.57 0-12.373 7.904-22.93 18.925-26.893l-3.583 16.699c-1.49 6.944.796 13.897 6.116 18.599 3.634 3.212 8.137 4.892 12.766 4.892 2.152 0 4.331-.363 6.463-1.104 6.03-2.096 11.322-4.487 15.978-7.084-2.417 13.323-14.094 23.461-28.104 23.461z"/>
              </g>
            </svg> -->
            <svg width="38px"  height="36px" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M38 6.97337C37.5975 8.36804 37.3559 9.76271 37.0339 11.2446C36.2288 14.8184 35.4237 18.3923 34.5381 21.9661C34.2966 23.0121 33.9746 23.2736 33.0085 23.2736H13.7669C13.1229 23.2736 13.1229 23.2736 13.2839 23.8838C13.5254 24.7554 13.6864 25.6271 13.8475 26.4988C13.928 26.9346 14.089 27.0218 14.4915 27.0218H32.3644C33.0085 27.0218 33.572 27.632 33.4915 28.3293C33.4915 29.0266 32.928 29.6368 32.2839 29.6368H13.4449C12.2373 29.6368 11.9958 29.3753 11.6737 28.155C9.90254 20.1356 8.05085 12.2034 6.19915 4.18402C6.11864 3.74818 6.03814 3.39952 5.95763 3.05085C5.87712 2.70218 5.79661 2.61501 5.47458 2.61501H1.36864C0.724576 2.61501 0.241525 2.35351 0 1.74334V0.871671C0.241525 0.348668 0.563559 0 1.12712 0H6.84322C7.24576 0 7.48729 0.174334 7.72881 0.435835C7.88983 0.61017 7.97034 0.871671 8.05085 1.13317C8.29237 2.35351 8.61441 3.48668 8.85593 4.70702C8.93644 5.05569 9.09746 5.23002 9.41949 5.14286H36.6314C37.2754 5.14286 37.7585 5.40436 38 6.1017V6.97337ZM11.9153 7.75787H10.0636C9.66102 7.75787 9.66102 7.75787 9.74153 8.28087C10.0636 9.67554 10.3856 11.0702 10.7076 12.5521C10.7881 12.8136 10.8686 12.9007 11.1102 12.9007H14.411C14.733 12.9007 14.8136 12.8136 14.733 12.4649C14.572 11.0702 14.411 9.58838 14.25 8.1937C14.25 7.9322 14.089 7.84504 13.8475 7.84504C13.2034 7.75787 12.5593 7.75787 11.9153 7.75787ZM32.0424 12.8136H33.7331C33.8941 12.8136 34.0551 12.8136 34.1356 12.5521C34.4576 11.0702 34.8602 9.50121 35.1822 8.01937C35.2627 7.84504 35.1822 7.75787 35.0212 7.75787H30.9153C30.6737 7.75787 30.5932 7.84504 30.5932 8.01937L30.1102 12.4649C30.1102 12.8136 30.1907 12.9007 30.5127 12.9007C30.9958 12.8136 31.4788 12.8136 32.0424 12.8136ZM21.1737 10.3729V8.1937C21.1737 7.84504 21.0932 7.75787 20.7712 7.75787H17.0678C16.7458 7.75787 16.6653 7.84504 16.6653 8.1937C16.8263 9.67554 16.9873 11.0702 17.1483 12.5521C17.1483 12.8136 17.2288 12.8136 17.4703 12.8136H20.7712C21.0127 12.8136 21.0932 12.7264 21.0932 12.4649C21.1737 11.7676 21.1737 11.0702 21.1737 10.3729ZM23.589 10.2857V12.4649C23.589 12.6392 23.589 12.8136 23.8305 12.8136H27.2119C27.3729 12.8136 27.4534 12.7264 27.4534 12.5521L27.9364 8.10654C27.9364 7.84504 27.9364 7.6707 27.6144 7.75787H23.8305C23.5085 7.75787 23.5085 7.84504 23.5085 8.1937C23.589 8.89104 23.589 9.58838 23.589 10.2857ZM13.2839 15.5157H11.8347C11.5127 15.5157 11.4322 15.6029 11.5127 15.9516C11.8347 17.3462 12.1568 18.8281 12.4788 20.3099C12.5593 20.5714 12.6398 20.6586 12.8814 20.6586H15.2161C15.6992 20.6586 15.6992 20.5714 15.6186 20.1356L15.1356 15.9516C15.1356 15.6901 14.9746 15.6029 14.733 15.6029C14.25 15.5157 13.7669 15.5157 13.2839 15.5157ZM31.5593 15.5157H30.1102C29.8686 15.5157 29.7076 15.6029 29.7076 15.8644C29.7076 16.1259 29.6271 16.4746 29.6271 16.7361C29.4661 17.8693 29.3856 19.0024 29.2246 20.1356C29.1441 20.4843 29.2246 20.6586 29.6271 20.6586H31.9619C32.2034 20.6586 32.2839 20.5714 32.3644 20.3099C32.6864 18.8281 33.0085 17.3462 33.411 15.8644C33.4915 15.6029 33.411 15.5157 33.1695 15.5157H31.5593ZM21.1737 18.0436V15.9516C21.1737 15.6029 21.0932 15.5157 20.7712 15.5157H17.9534C17.6314 15.5157 17.5508 15.6901 17.5508 15.9516C17.7119 17.4334 17.8729 18.8281 18.0339 20.3099C18.0339 20.5714 18.1949 20.5714 18.3559 20.5714H20.7712C21.0127 20.5714 21.0932 20.4843 21.0932 20.2228C21.1737 19.5254 21.1737 18.7409 21.1737 18.0436ZM23.589 18.0436V20.2228C23.589 20.3971 23.589 20.5714 23.8305 20.5714H26.4068C26.5678 20.5714 26.6483 20.4843 26.6483 20.3099L27.1314 15.8644C27.1314 15.6029 27.0508 15.4286 26.8093 15.4286H23.911C23.6695 15.4286 23.5085 15.5157 23.5085 15.7772C23.589 16.5617 23.589 17.3462 23.589 18.0436ZM29.7076 30.8571C30.9958 30.8571 32.0424 31.9903 32.0424 33.4722C32.0424 34.954 30.9958 36.0872 29.6271 36.0872C28.2585 36.0872 27.2119 34.954 27.2119 33.5593C27.2924 31.9903 28.339 30.8571 29.7076 30.8571ZM12.7203 33.4722C12.7203 31.9903 13.7669 30.8571 15.1356 30.8571C16.4237 30.8571 17.5508 31.9903 17.5508 33.385C17.5508 34.8668 16.5042 36 15.1356 36C13.7669 36 12.7203 34.8668 12.7203 33.4722Z" fill="black"/>
            </svg>
          </v-badge>
          <nuxt-link to="/" no-prefetch  class="ml-5 search-app-bar__button-link">Корзина</nuxt-link >
        </div>
      </v-app-bar>
</template>

<script>
    export default {
        data() {
            return {
                select: '',
                countCart: 1,
                statusMenu: true,
                searchResult: [
                    {header: 'Категории'}, 
                    {name: 'Для дома', group: 'Категории', avatar: require('~/assets/1.png')},
                    {name: 'Для сада', group: 'Категории', avatar: require('~/assets/1.png')},
                    {name: 'Аксессуары', group: 'Категории', avatar: require('~/assets/1.png')},
                    { divider: true },
                    { header: 'Товары' },
                    {name: 'Саженцы', group: 'Товары', avatar: require('~/assets/1.png')}
                    
                ],
                search: null
            }
        },
        watch: {
            select (val) {
                if(!val) {
                    this.statusMenu = true
                }

                if(val) {
                    this.statusMenu = true
                }
            }
        },
        computed: {
            disabledMenu() {
                if(this.search) {
                    if(this.search.length > 1 && this.statusMenu === true) {
                    return true
                    } else {
                    return false
                    }
                } else {
                    return false
                }
            },
            contacts() {
              if(this.windowSize.x > 1150) {
                return true
              } else {
                return false
              }
            },
            cabinet() {
              if(this.windowSize.x > 950) {
                return true
              } else {
                return false
              }
            },
            cart() {
              if(this.windowSize.x > 700) {
                return true
              } else {
                return false
              }
            }
        },
        props: [
          'windowSize'
        ]
    }
</script>

<style lang="sass">

    #default-header-search .v-toolbar__content
        padding: 4px 60px 4px 70px
        +md-block
            padding: 4px 35px 
        +xs-block
            padding: 4px 20px
  
    #default-header-search .v-btn:not(.v-btn--round).v-size--default
        padding: 0px 15px 0px 15px
    
    #defalut-layouts .layout-default__combox-search
        max-width: 300px
        margin-left: 40px
        +xs-block
          margin-left: 0px
          max-width: 100%
  
    #defalut-layouts .layout-default__combox-search .v-input__control
        height: 40px
        min-height: 0px
    
    #defalut-layouts .layout-default__combox-search .v-input__slot
        margin-bottom: 0px
    
    #defalut-layouts .layout-default__combox-search .v-input__append-inner
        display: none
      
    #defalut-layouts .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset
        color: #97CF23
        border-width: 2px
        border-radius: 0px
    
    #defalut-layouts .v-input__slot
        border-radius: 0px
    
    .search-app-bar__button
        text-transform: uppercase
        font-size: 14px
        display: flex
        align-items: center
        color: black
        font-family: 'Rubik-Medium', sans-serif
        font-weight: normal
        margin-left: 50px
    
    #defalut-layouts .search-app-bar__button-link
      text-decoration: none
      color: black
    
    #defalut-layouts .search-app-bar__button-link:hover
      color: grey
   

</style>