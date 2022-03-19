<template>
    <section v-if="isUpsertAccount_statementVisible" class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title"
        role="dialog" aria-modal="true">
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0" aria-hidden="true"></div>
            <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                <div class="w-screen max-w-md">
                    <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                        <div class="flex-1 h-0 overflow-y-auto">
                            <header class="space-y-1 py-6 px-4 bg-green-700 sm:px-6">
                                <div class="flex items-center justify-between space-x-3">
                                    <h2 class="text-lg leading-7 font-medium text-white">
                                        Account_statement
                                    </h2>
                                    <div class="h-7 flex items-center">
                                        <button v-on:click="closeAccount_statementPanel()" aria-label="Close panel"
                                            class="text-green-200 hover:text-white transition ease-in-out duration-150">
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-sm leading-5 text-green-300">
                                        Create or update Account_statement record
                                    </p>
                                </div>
                            </header>
                            <div class="flex-1 flex flex-col justify-between">
                                <div class="px-4 divide-y divide-gray-200 sm:px-6">
                                    <div class="space-y-6 pt-6 pb-5">
                                        <form name="frmAccount_statement" id="frmAccount_statement"
                                            class="space-y-8 divide-y divide-gray-200" @submit.prevent="SaveAndUpdate">
                                            <div class="sm:overflow-hidden">
                                                <div class="bg-white space-y-6">
                                                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                        <!--<div class="sm:col-span-6">
                                                        <label for="code" class="block text-sm font-medium text-gray-700">
                                                            Code
                                                        </label>
                                                        <div class="mt-1 rounded-md shadow-sm">
                                                            <input v-model="data.code" type="text" name="code" id="code" placeholder="" value="$RT34@23" autocomplete="code" class="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                                                        </div>
                                                        <p class="mt-2 text-sm text-red-600" id="email-error">Special Characters are not allowed.</p>
                                                    </div>-->

                                                    
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Invoice_nuber
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.invoice_nuber" type="text" id="invoice_nuber"
                                                                    name="invoice_nuber" autocomplete="invoice_nuber"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Payment_to_user
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.payment_to_user" type="text" id="payment_to_user"
                                                                    name="payment_to_user" autocomplete="payment_to_user"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Payment_date
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.payment_date" type="text" id="payment_date"
                                                                    name="payment_date" autocomplete="payment_date"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Payment_type
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.payment_type" type="text" id="payment_type"
                                                                    name="payment_type" autocomplete="payment_type"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Payment_amount
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.payment_amount" type="text" id="payment_amount"
                                                                    name="payment_amount" autocomplete="payment_amount"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Payment_currency
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.payment_currency" type="text" id="payment_currency"
                                                                    name="payment_currency" autocomplete="payment_currency"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Currency_exchange_rate
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.currency_exchange_rate" type="text" id="currency_exchange_rate"
                                                                    name="currency_exchange_rate" autocomplete="currency_exchange_rate"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Payment_status
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.payment_status" type="text" id="payment_status"
                                                                    name="payment_status" autocomplete="payment_status"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Published_at
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.published_at" type="text" id="published_at"
                                                                    name="published_at" autocomplete="published_at"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Description
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.description" type="text" id="description"
                                                                    name="description" autocomplete="description"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Credit_debit
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.credit_debit" type="text" id="credit_debit"
                                                                    name="credit_debit" autocomplete="credit_debit"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Debit
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.debit" type="text" id="debit"
                                                                    name="debit" autocomplete="debit"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Credit
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.credit" type="text" id="credit"
                                                                    name="credit" autocomplete="credit"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="sm:col-span-6">
                                                            <label for="name"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Balance
                                                            </label>
                                                            <div class="mt-1 rounded-md shadow-sm">
                                                                <input v-model="data.balance" type="text" id="balance"
                                                                    name="balance" autocomplete="balance"
                                                                    class="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 sm:text-sm border-gray-300">
                                                            </div>
                                                        </div>
                                                          
                                                     
                                                        <div class="sm:col-span-6">
                                                            <label for="about"
                                                                class="block text-sm font-medium text-gray-700">
                                                                Additional Attributes
                                                            </label>
                                                            <div class="mt-1">
                                                                <textarea v-model="data.additional_attributes" id="additional_attributes"
                                                                    name="additional_attributes" rows="3"
                                                                    class="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300"></textarea>
                                                            </div>
                                                            <p class="mt-2 text-sm text-gray-500">Anything can be stored, including rich JSON objects.
                                                                </p>
                                                        </div>
                                                        <div class="sm:col-span-6">
                                                            <Dropdownlist v-model="data.is_enabled"
                                                                @selected_item="handleSelectedInStatus"
                                                                name="is_enabled" label="Status"
                                                                :data="{'data' : [{'code' : 'true', 'name':'Published'},{'code' : 'false', 'name':'Draft'}]}"
                                                                :selected_value="data.is_enabled" />
                                                        </div>
                                                        <div class="sm:col-span-6">
                                                            <Dropdownlist v-model="data.mark_as_delete"
                                                                @selected_item="handleSelectedInMarkAsDelete"
                                                                name="mark_as_delete" label="Mark as delete?"
                                                                :data="{'data' : [{'code' : 'true', 'name':'Yes'},{'code' : 'false', 'name':'No'}]}"
                                                                :selected_value="data.mark_as_delete" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                            <span class="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                    class="py-2 px-4 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                    Reset
                                </button>
                            </span>
                            <span class="inline-flex rounded-md shadow-sm">
                                <button v-on:click="upsertAccount_statement" type="submit"
                                    class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium  text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out">
                                    Save
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    /**
     * Account_statementUpsert.vue
     *
     * @description :: [sails._s.capitalize(table) ] form panel to handle Add New & Edit. Panel visible and hidden managed thru event subscription.
     *                 Additional events published to handle custom functions post "Save" operation.                 
     * 
     * @author      :: Zynobot
     * @help        :: 
     *
     * Created at   :: Thu Mar 17 2022 10:28:15 GMT-0400 (Eastern Daylight Time)
     * Modified at  :: Thu Mar 17 2022 10:28:15 GMT-0400 (Eastern Daylight Time)
     */
    import Dropdownlist from "@/components/Dropdownlist.vue";
    export default {
        components: {
            Dropdownlist
        },
        data() {
            return {
                isUpsertAccount_statementVisible: false,
                data: { },
                api: ""
        }
    },
    methods: {
        async upsertAccount_statement(args) {
            try {
                if (this.$_.isUndefined(this.data.id)) {
                    const {
                        data
                    } = await this.$axios.post(this.$config.apiURL  + "Account_statement", this.data);
                } else {
                    const {
                        data
                    } = await this.$axios.put(this.$config.apiURL  + "Account_statement/" + this.data.id, this.data);
                }
                this.data = {}
                this.isUpsertAccount_statementVisible = !this.isUpsertAccount_statementVisible;
                $nuxt.$emit('evtRefreshAccount_statementDatatable')
                this.$toast.success("Record saved successfully")
            } catch (error) {
                console.log(error)
                this.$toast.error('Oops!Save failed...')
            } finally {

            }
        },
        async deleteAccount_statement() {
            try {
                //Make sure to set the status and delete marker
                this.data.is_enabled = false;
                //end
                const {
                    data
                } = await this.$axios.delete(this.$config.apiURL  + "Account_statement/" + this.data.id);
                $nuxt.$emit('evtRefreshAccount_statementDatatable')
                this.$toast.success("Record has been deleted successfully")
            } catch (error) {
                this.$toast.error('Oops! delete failed...')
            } finally {

            }
        },
        async bindAccount_statement() {
            try {

            } catch (error) {
                console.log(error)
            }
        },
        async closeAccount_statementPanel() {
            this.data = {}
            this.isUpsertAccount_statementVisible = !this.isUpsertAccount_statementVisible;
        },
        handleSelectedInStatus(data) {
            this.data.is_enabled = data;
        },
        handleSelectedInMarkAsDelete(data) {
            this.data.mark_as_delete = data;
        }
    },
    computed: { },
    mounted() {

    },
    created() {
        this.$nuxt.$on('evtUpsertAccount_statement', (data) => {
            if (data !== undefined) {
                this.data = data;
                this.isUpsertAccount_statementVisible = !this.isUpsertAccount_statementVisible;
                return this.data;
            }
            this.isUpsertAccount_statementVisible = !this.isUpsertAccount_statementVisible;
        });

        //2) Delete Account_statement record and then rebind datatable
        this.$nuxt.$on('evtDeleteAccount_statement', (data) => {
            if (data !== undefined) {
                this.data = data;
                this.deleteAccount_statement();
            }
        });
    },
    beforeDestroy() {
        this.$nuxt.$off('evtUpsertAccount_statement');
        this.$nuxt.$off('evtDeleteAccount_statement');
    }
};
</script>