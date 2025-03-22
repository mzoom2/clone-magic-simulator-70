
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { useEnrollment, EnrollmentProvider } from '@/contexts/EnrollmentContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, X, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { loginAdmin, updatePackagePrices, getAdminPackages, getBookings } from '@/services/adminService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Login form component
const LoginForm = ({ onLogin }: { onLogin: (success: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginAdmin({ username, password });
      
      if (result.success) {
        // Store credentials for API calls (in a real app, use a more secure approach like session tokens)
        localStorage.setItem('adminCredentials', JSON.stringify({ username, password }));
        toast.success('Login successful');
        onLogin(true);
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Log in to access the admin panel for Nigerian Experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-sm text-center text-gray-500 mt-2">
              Default credentials: admin / admin123
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Package management component
const PackageManagement = () => {
  const { packages, setPackages } = useEnrollment();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    singlePrice: string;
    doublePrice: string;
  }>({ singlePrice: '', doublePrice: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const adminPackages = await getAdminPackages();
        setPackages(adminPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to load packages. Please try again.');
      }
    };

    fetchPackages();
  }, [setPackages]);

  const handleEditClick = (pkg: { id: string; singlePrice: string; doublePrice: string }) => {
    setEditingId(pkg.id);
    setEditValues({
      singlePrice: pkg.singlePrice,
      doublePrice: pkg.doublePrice,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await updatePackagePrices(id, editValues.singlePrice, editValues.doublePrice);
      
      if (result.success) {
        // Update local state
        setPackages(
          packages.map((pkg) =>
            pkg.id === id
              ? { ...pkg, singlePrice: editValues.singlePrice, doublePrice: editValues.doublePrice }
              : pkg
          )
        );
        setEditingId(null);
        toast.success('Package prices updated successfully');
      } else {
        toast.error(result.message || 'Failed to update package');
      }
    } catch (error) {
      toast.error('Failed to update package. Please try again.');
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-medium">Package Management</h2>
        <p className="text-gray-500 text-sm">View and update package prices</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Package</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Single Price</TableHead>
              <TableHead>Double Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.title}</TableCell>
                <TableCell>{pkg.date}</TableCell>
                <TableCell>
                  {editingId === pkg.id ? (
                    <Input
                      name="singlePrice"
                      value={editValues.singlePrice}
                      onChange={handleInputChange}
                      className="max-w-[120px]"
                    />
                  ) : (
                    <>${pkg.singlePrice}</>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === pkg.id ? (
                    <Input
                      name="doublePrice"
                      value={editValues.doublePrice}
                      onChange={handleInputChange}
                      className="max-w-[120px]"
                    />
                  ) : (
                    <>${pkg.doublePrice}</>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === pkg.id ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveEdit(pkg.id)}
                        disabled={isLoading}
                      >
                        <Save size={16} className="mr-1" /> Save
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelEdit}
                        disabled={isLoading}
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(pkg)}
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Booking management component
const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <h2 className="text-xl font-medium mb-2">No Bookings Yet</h2>
        <p className="text-gray-500">Bookings will appear here once customers complete their purchases.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-medium">Booking Management</h2>
        <p className="text-gray-500 text-sm">View all customer bookings</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Visitors</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking: any) => (
              <TableRow key={booking.session_id}>
                <TableCell>
                  <div>{booking.customer_name}</div>
                  <div className="text-sm text-gray-500">{booking.customer_email}</div>
                </TableCell>
                <TableCell>{booking.package_title}</TableCell>
                <TableCell>{booking.visitor_count}</TableCell>
                <TableCell>${booking.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status === 'confirmed' ? 'Paid' : 'Pending'}
                  </span>
                </TableCell>
                <TableCell>{new Date(booking.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Main admin panel content
const AdminPanelContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const credentials = localStorage.getItem('adminCredentials');
    if (credentials) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminCredentials');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-forest">Admin Panel</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" /> Logout
        </Button>
      </div>
      
      <Tabs defaultValue="packages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="packages">
          <PackageManagement />
        </TabsContent>
        
        <TabsContent value="bookings">
          <BookingManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Wrapper component that provides the enrollment context
const AdminPanel = () => {
  return (
    <EnrollmentProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 pb-12">
          <AdminPanelContent />
        </main>
        <ResponsiveFooter />
      </div>
    </EnrollmentProvider>
  );
};

export default AdminPanel;
