/**
 * Builds a hierarchical tree structure from a flat array of objects.
 *
 * This function takes a flat array where each object has an ID and a parent reference,
 * then constructs a tree structure where parent items contain their children in a 'children' array.
 * Items with no parent (null, undefined, empty string, or 0) become root-level nodes.
 *
 * @param {Array} array_json - Flat array of objects to convert into hierarchy
 *   Each object should have:
 *   - id: Unique identifier for the item
 *   - [parent_key]: Reference to parent item's ID (can be null/undefined for root items)
 *   - Other properties as needed
 *
 *   Example:
 *   [
 *     {id: 1, name: "Root Item", parent_id: null},
 *     {id: 2, name: "Child 1", parent_id: 1},
 *     {id: 3, name: "Child 2", parent_id: 1},
 *     {id: 4, name: "Grandchild", parent_id: 2},
 *     {id: 5, name: "Another Root", parent_id: null}
 *   ]
 *
 * @param {string} parent_key - Name of the property that contains the parent ID reference
 *   Common values: "parent_id", "parentId", "parent", etc.
 *
 * @returns {Array} Hierarchical array structure
 *   Returns an array of root-level items, each containing:
 *   - All original properties from the input object
 *   - children: Array of child objects (which may also have their own children)
 *
 *   Example output:
 *   [
 *     {
 *       id: 1,
 *       name: "Root Item",
 *       parent_id: null,
 *       children: [
 *         {
 *           id: 2,
 *           name: "Child 1",
 *           parent_id: 1,
 *           children: [
 *             {
 *               id: 4,
 *               name: "Grandchild",
 *               parent_id: 2,
 *               children: []
 *             }
 *           ]
 *         },
 *         {
 *           id: 3,
 *           name: "Child 2",
 *           parent_id: 1,
 *           children: []
 *         }
 *       ]
 *     },
 *     {
 *       id: 5,
 *       name: "Another Root",
 *       parent_id: null,
 *       children: []
 *     }
 *   ]
 *
 * @example
 * // Basic usage with menu items
 * const menuItems = [
 *   {id: 1, name: "File", parent_id: null},
 *   {id: 2, name: "New", parent_id: 1},
 *   {id: 3, name: "Open", parent_id: 1},
 *   {id: 4, name: "Document", parent_id: 2},
 *   {id: 5, name: "Spreadsheet", parent_id: 2}
 * ];
 * const hierarchy = buildHierarchy(menuItems, 'parent_id');
 * // Returns tree structure with "File" as root containing "New" and "Open" as children
 *
 * @example
 * // Usage with organizational structure
 * const employees = [
 *   {id: 1, name: "CEO", manager_id: null},
 *   {id: 2, name: "CTO", manager_id: 1},
 *   {id: 3, name: "Developer", manager_id: 2},
 *   {id: 4, name: "Designer", manager_id: 2}
 * ];
 * const orgChart = buildHierarchy(employees, 'manager_id');
 *
 * @example
 * // Usage with categories
 * const categories = [
 *   {id: 1, title: "Electronics", parentCategory: 0},
 *   {id: 2, title: "Phones", parentCategory: 1},
 *   {id: 3, title: "Laptops", parentCategory: 1},
 *   {id: 4, title: "iPhone", parentCategory: 2}
 * ];
 * const categoryTree = buildHierarchy(categories, 'parentCategory');
 *
 * @note
 * - Root items are identified by parent_key values that are null, undefined, empty string (""), or 0
 * - If a parent reference points to a non-existent item, that item will be treated as a root item
 * - The function handles empty or invalid input arrays by returning an empty array
 * - Original objects are not modified; new objects with 'children' arrays are created
 */
const buildHierarchy = (array_json, parent_key) => {
    if (!array_json || !Array.isArray(array_json) || array_json.length === 0) {
        return [];
    }

    // Create a map for quick lookup by ID
    const itemMap = new Map();
    const result = [];

    // First pass: create map of all items and add children array
    array_json.forEach((item) => {
        itemMap.set(item.id, { ...item, children: [] });
    });

    // Second pass: build the hierarchy
    array_json.forEach((item) => {
        const parentId = item[parent_key];
        const currentItem = itemMap.get(item.id);

        // Check if this is a root item (parent_key is null, undefined, empty, or 0)
        if (
            parentId === null ||
            parentId === undefined ||
            parentId === "" ||
            parentId === 0
        ) {
            result.push(currentItem);
        } else {
            // This item has a parent
            const parent = itemMap.get(parentId);
            if (parent) {
                parent.children.push(currentItem);
            } else {
                // Parent not found, treat as root item
                result.push(currentItem);
            }
        }
    });

    return result;
};

//
const buildHierarchyTwoArray = (parent_array, children_array, parent_key) => {
    if (
        !parent_array ||
        !Array.isArray(parent_array) ||
        parent_array.length === 0
    ) {
        return [];
    }

    if (!children_array || !Array.isArray(children_array)) {
        // If no children array, just return parent array with empty children
        return parent_array.map((item) => ({ ...item, children: [] }));
    }

    // Create a map for quick lookup of parent items by ID
    const parentMap = new Map();
    const result = [];

    // First pass: create map of all parent items and add children array
    parent_array.forEach((item) => {
        const parentWithChildren = { ...item, children: [] };
        parentMap.set(item.id, parentWithChildren);
        result.push(parentWithChildren);
    });

    // Second pass: assign children to their parents
    children_array.forEach((child) => {
        const parentId = child[parent_key];
        const parent = parentMap.get(parentId);

        if (parent) {
            parent.children.push({ ...child });
        }
        // If parent not found, child is ignored (or you could handle orphaned children)
    });

    return result;
};

//
// Transform data for PrimeReact Tree component
const transformToTreeNodes = (data) => {
    return data.map((item) => ({
        key: item.id,
        label: item.name,
        data: item,
        icon: "pi pi-folder",
        children: item.children
            ? transformToTreeNodes(item.children)
            : undefined,
    }));
};

export { buildHierarchy, buildHierarchyTwoArray, transformToTreeNodes };
