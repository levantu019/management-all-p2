import axios from "axios";

// Get API configuration from environment variables
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT) || 10000;

/**
 * Makes a GET request to the specified API endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'areas', 'categories')
 * @param {Object} options - Additional axios options (optional)
 * @returns {Promise} Axios response promise
 * 
 * @example
 * // Basic usage
 * const response = await apiGet('areas');
 * 
 * @example
 * // With custom options
 * const response = await apiGet('categories', {
 *   timeout: 15000,
 *   params: { limit: 10 }
 * });
 */
const apiGet = async (endpoint, options = {}) => {
    const defaultOptions = {
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Merge default options with custom options
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    return await axios.get(`${API_BASE_URL}/${endpoint}`, config);
};

/**
 * Makes a POST request to the specified API endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'areas', 'categories')
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional axios options (optional)
 * @returns {Promise} Axios response promise
 * 
 * @example
 * // Basic usage
 * const response = await apiPost('areas', { name: 'New Area', description: 'Area description' });
 * 
 * @example
 * // With custom options
 * const response = await apiPost('categories', categoryData, {
 *   timeout: 15000,
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 */
const apiPost = async (endpoint, data = {}, options = {}) => {
    const defaultOptions = {
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    return await axios.post(`${API_BASE_URL}/${endpoint}`, data, config);
};

/**
 * Makes a PUT request to the specified API endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'areas/1', 'categories/5')
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional axios options (optional)
 * @returns {Promise} Axios response promise
 * 
 * @example
 * // Basic usage
 * const response = await apiPut('areas/1', { name: 'Updated Area' });
 * 
 * @example
 * // With custom options
 * const response = await apiPut('categories/5', updatedData, {
 *   timeout: 20000
 * });
 */
const apiPut = async (endpoint, data = {}, options = {}) => {
    const defaultOptions = {
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    return await axios.put(`${API_BASE_URL}/${endpoint}`, data, config);
};

/**
 * Makes a PATCH request to the specified API endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'areas/1', 'categories/5')
 * @param {Object} data - The partial data to update
 * @param {Object} options - Additional axios options (optional)
 * @returns {Promise} Axios response promise
 * 
 * @example
 * // Basic usage - partial update
 * const response = await apiPatch('areas/1', { name: 'New Name Only' });
 * 
 * @example
 * // With custom options
 * const response = await apiPatch('categories/5', { status: 'active' }, {
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 */
const apiPatch = async (endpoint, data = {}, options = {}) => {
    const defaultOptions = {
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    return await axios.patch(`${API_BASE_URL}/${endpoint}`, data, config);
};

/**
 * Makes a DELETE request to the specified API endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'areas/1', 'categories/5')
 * @param {Object} options - Additional axios options (optional)
 * @returns {Promise} Axios response promise
 * 
 * @example
 * // Basic usage
 * const response = await apiDelete('areas/1');
 * 
 * @example
 * // With custom options
 * const response = await apiDelete('categories/5', {
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 */
const apiDelete = async (endpoint, options = {}) => {
    const defaultOptions = {
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    return await axios.delete(`${API_BASE_URL}/${endpoint}`, config);
};

/**
 * Makes multiple parallel GET requests to different endpoints
 * @param {Array<string>} endpoints - Array of endpoint names
 * @param {Object} options - Common options for all requests
 * @returns {Promise<Array>} Promise that resolves to array of responses
 * 
 * @example
 * const [areasResponse, categoriesResponse] = await apiGetMultiple(['areas', 'categories']);
 */
const apiGetMultiple = async (endpoints, options = {}) => {
    const requests = endpoints.map(endpoint => apiGet(endpoint, options));
    return await Promise.all(requests);
};

/**
 * Makes multiple parallel POST requests to different endpoints
 * @param {Array<Object>} requestsData - Array of objects with endpoint and data
 * @param {Object} options - Common options for all requests
 * @returns {Promise<Array>} Promise that resolves to array of responses
 * 
 * @example
 * const responses = await apiPostMultiple([
 *   { endpoint: 'areas', data: { name: 'Area 1' } },
 *   { endpoint: 'categories', data: { name: 'Category 1' } }
 * ]);
 */
const apiPostMultiple = async (requestsData, options = {}) => {
    const requests = requestsData.map(({ endpoint, data }) => apiPost(endpoint, data, options));
    return await Promise.all(requests);
};

/**
 * Makes multiple parallel DELETE requests to different endpoints
 * @param {Array<string>} endpoints - Array of endpoint names
 * @param {Object} options - Common options for all requests
 * @returns {Promise<Array>} Promise that resolves to array of responses
 * 
 * @example
 * const responses = await apiDeleteMultiple(['areas/1', 'categories/5']);
 */
const apiDeleteMultiple = async (endpoints, options = {}) => {
    const requests = endpoints.map(endpoint => apiDelete(endpoint, options));
    return await Promise.all(requests);
};

/**
 * Generic API request function that can handle any HTTP method
 * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
 * @param {string} endpoint - The API endpoint
 * @param {Object} data - Request data (for POST, PUT, PATCH)
 * @param {Object} options - Additional axios options
 * @returns {Promise} Axios response promise
 * 
 * @example
 * // GET request
 * const response = await apiRequest('GET', 'areas');
 * 
 * @example
 * // POST request
 * const response = await apiRequest('POST', 'areas', { name: 'New Area' });
 * 
 * @example
 * // DELETE request
 * const response = await apiRequest('DELETE', 'areas/1');
 */
const apiRequest = async (method, endpoint, data = null, options = {}) => {
    const defaultOptions = {
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
    };

    const config = {
        method: method.toUpperCase(),
        url: `${API_BASE_URL}/${endpoint}`,
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    };

    // Add data for methods that support it
    if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        config.data = data;
    }

    return await axios(config);
};

export { 
    apiGet, 
    apiPost, 
    apiPut, 
    apiPatch, 
    apiDelete, 
    apiGetMultiple, 
    apiPostMultiple, 
    apiDeleteMultiple, 
    apiRequest 
};