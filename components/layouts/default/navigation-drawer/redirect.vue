<template>
    <div id="navigation-drawer-redirect-id">
        <nuxt-link 
            class="navigation-drawer-redirect" 
            no-prefetch
            v-if="!absolutePatchStatus"
            :to="link"
            active-class="navigation-drawer-redirect-active"
            >
            {{title}}
          </nuxt-link>
          <a 
            class="navigation-drawer-redirect" 
            v-if="absolutePatchStatus"
            target="_blank"
            :href="link"
            >
            {{title}}
          </a>
    </div>
</template>

<script>
    export default {
        props: [
            'link',
            'title'
        ],
        computed: {
            absolutePatchStatus() {

                let g = false

                for(let i = 0;  i < this.link.length; i++) {
                    if(this.link[i] === '.') {
                        g = true
                        
                    }
                }
                
                if(g) {
                    return true
                } else {
                    return false
                }

            }
        }
    }
</script>

<style lang="sass">
    #navigation-drawer-redirect-id
        width: 100%
        display: flex
        

    #navigation-drawer-redirect-id .navigation-drawer-redirect 
        text-decoration: none
        padding: 8px 16px
        color: rgba(0, 0, 0, 0.87)
        width: 100%
    
    #navigation-drawer-redirect-id .navigation-drawer-redirect:hover
        background-color: #F6F6F6
        transition: background-color 0.4s
        

    #navigation-drawer-redirect-id .navigation-drawer-redirect-active
        background-color: #E5E5E5
    
</style>