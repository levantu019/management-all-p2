-- ===================================================================
-- PRIORITY DEFAULT TRIGGER FOR CATEGORY TABLE
-- ===================================================================
-- 
-- Purpose: Automatically sets the priority field to match the id field
--          when a new category record is inserted without a priority value.
--
-- Business Logic:
-- - When inserting a new category, if priority is not provided (NULL),
--   the trigger will automatically set priority = id
-- - This ensures every category has a priority value for ordering/sorting
-- - Maintains data consistency without requiring manual priority assignment
--
-- Trigger Flow:
-- 1. User inserts a new category record
-- 2. BEFORE INSERT trigger fires
-- 3. Function checks if NEW.priority IS NULL
-- 4. If NULL, sets NEW.priority := NEW.id
-- 5. Record is inserted with priority value
--
-- Example:
-- INSERT INTO category (name, description) VALUES ('Tools', 'Tool category');
-- Result: If the new record gets id=5, priority will also be set to 5
-- ===================================================================

-- Create trigger function that handles priority assignment
CREATE OR REPLACE FUNCTION set_priority()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if priority field is not provided (NULL) in the INSERT statement
  IF NEW.priority IS NULL THEN
    -- Set priority to match the auto-generated id value
    -- This ensures every category has a priority for ordering purposes
    NEW.priority := NEW.id;
  END IF;
  
  -- Return the modified NEW record to proceed with the INSERT
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the category table
-- BEFORE INSERT: Trigger fires before the record is actually inserted
-- FOR EACH ROW: Trigger executes once for each row being inserted
CREATE TRIGGER priority_default
BEFORE INSERT ON category
FOR EACH ROW
EXECUTE FUNCTION set_priority();

-- ===================================================================
-- NOTES:
-- - This trigger only affects INSERT operations, not UPDATE
-- - If priority is explicitly provided in INSERT, it won't be overridden
-- - The id field must be auto-generated (SERIAL/IDENTITY) for this to work correctly
-- - Consider adding similar logic for UPDATE if priority should be maintained
-- ===================================================================