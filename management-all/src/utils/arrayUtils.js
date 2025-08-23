/**
 * Adds or modifies keys and values in each item of an array of JSON objects.
 * @param {Array<Object>} array - The array of JSON objects.
 * @param {Object} keyValues - An object containing key-value pairs to add or modify.
 *   - For adding new keys: provide any value
 *   - For modifying existing keys: provide a function that takes the old value and returns the new value
 *   - For static values: provide a direct value
 *   - For concatenation with existing values: use template syntax `${keyName}` in the value string
 * @returns {Array<Object>} New array with updated objects.
 * 
 * @example
 * // Adding new keys with static values
 * const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const result = addKeysAndValues(data, { category: 'product', status: 'active' });
 * // result: [{ id: 1, name: 'Item 1', category: 'product', status: 'active' }, ...]
 * 
 * @example
 * // Modifying existing keys
 * const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const result = addKeysAndValues(data, { 
 *   id: (oldValue) => `${oldValue}_category`,
 *   name: (oldValue) => oldValue.toUpperCase()
 * });
 * // result: [{ id: '1_category', name: 'ITEM 1' }, { id: '2_category', name: 'ITEM 2' }]
 * 
 * @example
 * // Adding new keys with values based on existing keys (concatenation)
 * const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const result = addKeysAndValues(data, { 
 *   id2: 'category_${id}',           // Creates 'category_1', 'category_2'
 *   fullName: 'Product: ${name}',    // Creates 'Product: Item 1', 'Product: Item 2'
 *   code: '${id}_${name}'            // Creates '1_Item 1', '2_Item 2'
 * });
 * // result: [{ id: 1, name: 'Item 1', id2: 'category_1', fullName: 'Product: Item 1', code: '1_Item 1' }, ...]
 * 
 * @example
 * // Mixed operations
 * const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * const result = addKeysAndValues(data, { 
 *   id: (oldValue) => `${oldValue}_category`,  // Modify existing
 *   category: 'product',                       // Add new static value
 *   displayCode: 'PROD_${id}',                 // Add new with concatenation
 *   displayName: (item) => `Product: ${item.name}` // Add new with function
 * });
 */
const addKeysAndValues = (array, keyValues) => {
    return array.map(item => {
        const updatedItem = { ...item };
        Object.entries(keyValues).forEach(([key, value]) => {
            if (typeof value === 'function') {
                // If value is a function, call it with the old value (or the entire item for complex operations)
                updatedItem[key] = value(item[key] !== undefined ? item[key] : item);
            } else if (typeof value === 'string' && value.includes('${')) {
                // If value is a string with template syntax, replace placeholders with actual values
                let processedValue = value;
                // Find all ${keyName} patterns and replace them with actual values
                const templateRegex = /\$\{([^}]+)\}/g;
                processedValue = processedValue.replace(templateRegex, (match, keyName) => {
                    return item[keyName] !== undefined ? item[keyName] : '';
                });
                updatedItem[key] = processedValue;
            } else {
                // For static values, just assign directly
                updatedItem[key] = value;
            }
        });
        return updatedItem;
    });
};

/**
 * Sorts an array of JSON objects by the value of a specified key.
 *
 * @param {Array<Object>} array - The array of JSON objects to sort.
 * @param {string} key - The key in each object to sort by.
 * @param {boolean} [ascending=true] - If true, sorts in ascending order; if false, sorts in descending order.
 * @returns {Array<Object>} The sorted array of objects.
 *
 * @example
 * const data = [
 *   { name: 'Alice', age: 30 },
 *   { name: 'Bob', age: 25 }
 * ];
 * const sorted = sortByKey(data, 'age');
 * // sorted: [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }]
 */
const sortArrayJsonByKey = (array, key, ascending = true) => {
    return [...array].sort((a, b) => {
        if (a[key] < b[key]) return ascending ? -1 : 1;
        if (a[key] > b[key]) return ascending ? 1 : -1;
        return 0;
    });
};

export { addKeysAndValues, sortArrayJsonByKey };