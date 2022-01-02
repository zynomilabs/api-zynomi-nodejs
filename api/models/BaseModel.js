module.exports = {
    
    id: {
        type: 'INTEGER',
        required: true,
        primaryKey: true,
        autoIncrement: true
    },
   
    attributes: {
        autoCreatedAt: false,
        autoUpdatedAt: false,
        code: { type: 'STRING', },
        created_by: { type: 'number', allowNull: true},
        updated_by: { type: 'number', allowNull: true },
        created_at: { type: 'ref', columnType: 'datetime' },
        updated_at: { type: 'ref', columnType: 'datetime' },
        update_count: { type: 'number' },
        is_enabled: { type: 'BOOLEAN' },
        mark_as_delete: { type: 'BOOLEAN' },
        additional_attributes: { type: 'json' }
    }
};