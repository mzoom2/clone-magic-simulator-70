
/**
 * Admin service for managing authentication and package operations
 */

// Interface for login credentials
interface LoginCredentials {
  username: string;
  password: string;
}

// Interface for package price update
interface PriceUpdate {
  singlePrice: string;
  doublePrice: string;
}

/**
 * Authenticates an admin user
 * @param credentials Admin login credentials
 * @returns Promise with login result
 */
export const loginAdmin = async (credentials: LoginCredentials): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return await response.json();
  } catch (error) {
    console.error('Admin login error:', error);
    return {
      success: false,
      message: 'Login failed. Please check the server connection.',
    };
  }
};

/**
 * Updates package prices
 * @param packageId ID of the package to update
 * @param singlePrice New single visitor price
 * @param doublePrice New double visitor price
 * @returns Promise with update result
 */
export const updatePackagePrices = async (
  packageId: string,
  singlePrice: string,
  doublePrice: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Create Basic Auth header
    const credentials = localStorage.getItem('adminCredentials');
    if (!credentials) {
      return { success: false, message: 'Not authenticated' };
    }
    
    const { username, password } = JSON.parse(credentials);
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    
    const response = await fetch(`http://localhost:5000/api/admin/packages/${packageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({ singlePrice, doublePrice } as PriceUpdate),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update package');
    }

    return await response.json();
  } catch (error) {
    console.error('Package update error:', error);
    return {
      success: false,
      message: 'Update failed. Please try again.',
    };
  }
};

/**
 * Fetches all packages (admin version)
 * @returns Promise with packages data
 */
export const getAdminPackages = async () => {
  try {
    // Create Basic Auth header
    const credentials = localStorage.getItem('adminCredentials');
    if (!credentials) {
      throw new Error('Not authenticated');
    }
    
    const { username, password } = JSON.parse(credentials);
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    
    const response = await fetch('http://localhost:5000/api/admin/packages', {
      headers: {
        'Authorization': authHeader
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch packages error:', error);
    throw error;
  }
};

/**
 * Fetches all bookings
 * @returns Promise with bookings data
 */
export const getBookings = async () => {
  try {
    // Create Basic Auth header
    const credentials = localStorage.getItem('adminCredentials');
    if (!credentials) {
      throw new Error('Not authenticated');
    }
    
    const { username, password } = JSON.parse(credentials);
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);
    
    const response = await fetch('http://localhost:5000/api/bookings', {
      headers: {
        'Authorization': authHeader
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch bookings error:', error);
    throw error;
  }
};
