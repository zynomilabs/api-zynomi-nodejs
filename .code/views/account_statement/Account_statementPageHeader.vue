<template>
    <header class="w-full">
        <div class="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">

            <div class="flex-1 flex justify-between px-2 sm:px-2">
                <div class="flex-1 min-w-0">
                    <h2 class="text-lg leading-7 font-medium">
                        {{this.heading}}
                    </h2>
                    <div>
                        <p class="text-sm leading-5 text-gray-400">
                            {{this.guide}}
                        </p>
                    </div>
                </div>
                <div v-if="this.showbutton=='true'" class="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                    <button @click="$nuxt.$emit('evtFilterAccount_statement')" type="button"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    /**
     * Account_statementPageHeader.vue
     *
     * @description :: Generic page header compoment.
     *
     * @author      :: Zynobot
     * @help        :: 
     *
     * Created at   :: Thu Mar 17 2022 10:28:15 GMT-0400 (Eastern Daylight Time)
     * Modified at  :: Thu Mar 17 2022 10:28:15 GMT-0400 (Eastern Daylight Time)
     */
    export default {
        data() {
            return {

            }
        },
        props: {
            heading: String,
            showbutton: String,
            guide: String,
            addClickEvent: String
        },
        methods: {
            created() {

            },
            beforeMount() {

            }
        }
    }
</script>