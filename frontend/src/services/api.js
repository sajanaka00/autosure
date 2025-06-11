// API Service
const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async login(credentials) {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(token) {
    return this.makeRequest('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Categories methods
  async getCategories(token) {
    return this.makeRequest('/categories', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createCategory(categoryData, token) {
    return this.makeRequest('/categories', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(categoryId, categoryData, token) {
    return this.makeRequest(`/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(categoryId, token) {
    return this.makeRequest(`/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Vehicle methods
  async getVehicles(token, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/vehicles?${queryString}` : '/vehicles';
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getVehicleById(vehicleId, token) {
    return this.makeRequest(`/vehicles/${vehicleId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createVehicle(formData, token) {
    // Use the file upload method for vehicle creation since it includes images
    return this.makeFileRequest('/vehicles', formData, token);
  }

  async updateVehicle(vehicleId, vehicleData, token) {
    // Check if vehicleData is FormData (includes files) or regular object
    if (vehicleData instanceof FormData) {
      return this.makeFileRequest(`/vehicles/${vehicleId}`, vehicleData, token);
    } else {
      return this.makeRequest(`/vehicles/${vehicleId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicleData),
      });
    }
  }

  async deleteVehicle(vehicleId, token) {
    return this.makeRequest(`/vehicles/${vehicleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // User's vehicles
  async getUserVehicles(token, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/vehicles/user/my-vehicles?${queryString}` : '/vehicles/user/my-vehicles';
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Image upload methods
  async uploadImage(formData, token) {
    return this.makeFileRequest('/upload/image', formData, token);
  }

  async uploadImages(formData, token) {
    return this.makeFileRequest('/upload/images', formData, token);
  }

  async deleteImage(imageId, token) {
    return this.makeRequest(`/upload/image/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Special method for file uploads (FormData)
  async makeFileRequest(endpoint, formData, token) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let browser handle it
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  // Method for file requests with other HTTP methods (PUT, PATCH)
  async makeFileRequestWithMethod(endpoint, formData, token, method = 'POST') {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - let browser handle it
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`File ${method.toLowerCase()} failed:`, error);
      throw error;
    }
  }

  // Search and filtering methods
  async searchVehicles(searchParams, token) {
    const queryString = new URLSearchParams(searchParams).toString();
    return this.makeRequest(`/vehicles/search?${queryString}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getVehiclesByCategory(categoryId, token, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString 
      ? `/vehicles/category/${categoryId}?${queryString}` 
      : `/vehicles/category/${categoryId}`;
    
    return this.makeRequest(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Statistics and analytics methods
  async getVehicleStats(token) {
    return this.makeRequest('/vehicles/stats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserStats(token) {
    return this.makeRequest('/users/stats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const api = new ApiService();