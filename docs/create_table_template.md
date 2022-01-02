



```sql
 CREATE TABLE 
    role
    ( 
        id SERIAL NOT NULL,
        code CHARACTER VARYING,
        

        tenant            CHARACTER VARYING,
        additional_attributes JSONB,
        is_enabled        BOOLEAN DEFAULT true,
        mark_as_delete    BOOLEAN DEFAULT false,
        published_at      TIMESTAMP(6) WITH time zone,
        update_count      INTEGER DEFAULT 0,
        created_by        INTEGER,
        updated_by        INTEGER,
        created_at        TIMESTAMP(6) WITH time zone DEFAULT now(),
        updated_at        TIMESTAMP(6) WITH time zone DEFAULT now(),
        PRIMARY KEY (id)
    );
```