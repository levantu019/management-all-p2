CREATE OR REPLACE FUNCTION get_all_parents_json(table_name TEXT, child_record_id INTEGER)
RETURNS TABLE(result JSONB, level INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    query_text TEXT;
BEGIN
    -- Construct the dynamic SQL query using recursive CTE
    query_text := format('
        WITH RECURSIVE parents_tree AS (
            -- Base case: start with the child record
            SELECT *, 0 as level
            FROM %I
            WHERE id = %L
            
            UNION ALL
            
            -- Recursive case: find all parents
            SELECT parent.*, child.level + 1 as level
            FROM %I parent
            INNER JOIN parents_tree child ON parent.id = child.parent_id
        )
        SELECT row_to_json(parents_tree.*)::jsonb as result, level
        FROM parents_tree
        WHERE id != %L  -- Exclude the original child record from results
        ORDER BY level DESC, id
    ', table_name, child_record_id, table_name, child_record_id);
    
    -- Execute the dynamic query and return results
    RETURN QUERY EXECUTE query_text;
END;
$$;


-- Usage Examples:
-- Get results as JSON with level information
SELECT result, level FROM get_all_parents_json('categories', 5);

-- Extract specific fields from JSON
SELECT 
    result->>'id' as id,
    result->>'name' as name,
    result->>'parent_id' as parent_id,
    level
FROM get_all_parents_json('categories', 5)
ORDER BY level DESC;