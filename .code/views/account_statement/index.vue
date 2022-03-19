<template>
    <div class="h-screen flex overflow-hidden bg-white">
        <!-- Static sidebar for desktop -->
        <div class="hidden lg:flex lg:flex-shrink-0">
            <div class="flex flex-col w-64">
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
                    <LeftNavBar />
                    <LeftNavProfileBar />
                </div>
            </div>
        </div>
        <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div class="flex-1 relative z-0 flex overflow-hidden">
                <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last" tabindex="0">
                    <article>
                        <Account_statementPageHeader heading="Account_statement Data Management" showbutton="true" guide="Search
                                for Account_statement data" addClickEvent="evtUpsertAccount_statement" />
                                        <Account_statementSearch heading="" />
                                        <!--Datatable action buttons (Start)-->
                                        <Account_statementDataTableActionButtons />
                                        <!--Datatable action buttons (End)-->
                                        <Account_statementDataTable />
                    </article>
                </main>
            </div>
        </div>
        <Account_statementUpsert />
    </div>
</template>

<script>
    /**
     * index.vue
     *
     * @description :: Landing page for [Account_statement]
     *
     * @author      :: Zynobot
     * @help        :: 
     *
     * Created at   :: Thu Mar 17 2022 10:28:15 GMT-0400 (Eastern Daylight Time)
     * Modified at  :: Thu Mar 17 2022 10:28:15 GMT-0400 (Eastern Daylight Time)
     */
    import LeftNavBar from "@/components/LeftNavBar.vue";
    import LeftNavProfileBar from "@/components/LeftNavProfileBar.vue";
    import Account_statementPageHeader from "@/pages/account_statement/Account_statementPageHeader.vue";
    import Account_statementUpsert from "@/pages/account_statement/Account_statementUpsert.vue";
    import Account_statementSearch from "@/pages/account_statement/Account_statementSearch.vue";
    import Account_statementDataTable from "@/pages/account_statement/Account_statementDataTable.vue";
    import Account_statementDataTableActionButtons from "@/pages/account_statement/Account_statementDataTableActionButtons.vue";

    export default {
        layout: 'app',
        components: {
            LeftNavBar,
            LeftNavProfileBar,
            Account_statementPageHeader,
            Account_statementSearch,
            Account_statementUpsert,
            Account_statementDataTable,
            Account_statementDataTableActionButtons,
    },
    methods: {

    },
    created() {

    },
    beforeDestroy() {

    }
};
</script>