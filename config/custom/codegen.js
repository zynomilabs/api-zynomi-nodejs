module.exports.codegen = {
    baseFields: ['id', 'created_at', 'updated_at', 'created_by', 'updated_by', 'is_archived', 'update_count', 'tenant', 'additional_attributes', 'is_active'],
    stringTypesInPostgreSql: ['character', 'char', 'character varying'],
    stringTypesInSails: 'STRING',
    numericTypesInPostgreSql: ['int', 'bigint', 'numeric', 'double precision'],
    numericTypesInSails: 'number',
    jsonTypesInPostgreSql: ['json', 'jsonb'],
    jsonTypesInSails: 'json',
    dateTypesInPostgreSql: ['date', 'timestamp', 'timestamp without time zone', 'timestamp with time zone'],
    dateTypesInSails: 'ref',
    uuidTypesInPostgreSql: ['uuid'],
    uuidTypesInSails: 'STRING',
    modelCodeTemplate: 'code/sails/model/model',
    controllerCodeTemplate: 'code/sails/controller/controller',
    modelCodeSaveToPath: 'api/models/{}.js',
    modelControllerSaveToPath: 'api/controllers/{}Controller.js',
    queryColumndefTemplate: 'queries/columndef',
    queryTabledefTemplate: 'queries/tabledef',
    queryViewdefTemplate: 'queries/viewdef',
    menuitems: 'queries/menuitems',
    //crudCodeTemplates: ['code/crud.vue/EntityDataTable', 'code/crud.vue/EntityDataTable', 'code/crud.vue/EntityDataTableActionButtons', 'code/crud.vue/EntityPageHeader', 'code/crud.vue/EntitySearch', 'code/crud.vue/EntityUpsert', 'code/crud.vue/index']
    crudCodeTemplates: ['code/nuxt3.vue/EntityGrid', 'code/nuxt3.vue/EntityPageHeader', 'code/nuxt3.vue/EntitySearch', 'code/nuxt3.vue/index', 'code/nuxt3.vue/EntityUpsert']
};