CREATE OR REPLACE FUNCTION get_all_children(table_name TEXT, parent_record_id INTEGER)
RETURNS TABLE(result JSONB)
LANGUAGE plpgsql
AS $$
DECLARE
    query_text TEXT;
BEGIN
    -- Construct the dynamic SQL query using recursive CTE
    query_text := format('
        WITH RECURSIVE children_tree AS (
            -- Base case: start with the parent record
            SELECT *
            FROM %I
            WHERE id = %L
            
            UNION ALL
            
            -- Recursive case: find all children
            SELECT child.*
            FROM %I child
            INNER JOIN children_tree parent ON child.parent_id = parent.id
        )
        SELECT row_to_json(children_tree.*)::jsonb
        FROM children_tree
        WHERE id != %L  -- Exclude the original parent record from results
    ', table_name, parent_record_id, table_name, parent_record_id);
    
    -- Execute the dynamic query and return results
    RETURN QUERY EXECUTE query_text;
END;
$$;


-- Usage Examples:
-- Example usage with a categories table
SELECT result FROM get_all_children('categories', 1);

-- Extract specific fields from the JSON result
SELECT 
    result->>'id' as id,
    result->>'name' as name,
    result->>'parent_id' as parent_id
FROM get_all_children('categories', 1);