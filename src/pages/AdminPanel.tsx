
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { useEnrollment, EnrollmentProvider } from '@/contexts/EnrollmentContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Save, X, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// Login Form Component
const LoginForm = ({ onLogin }: { onLogin: (username: string, password: string) => Promise<void> }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onLogin(username, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-forest">Admin Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-sm text-gray-500">
              Default credentials: admin / admin123
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-forest hover:bg-forest/90"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

// Component that uses the enrollment context
const AdminPanelContent = () => {
  const { 
    packages, 
    updatePackagePrices, 
    isLoading, 
    user, 
    isAuthenticated, 
    login, 
    logout 
  } = useEnrollment();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    singlePrice: string;
    doublePrice: string;
  }>({ singlePrice: '', doublePrice: '' });
  const navigate = useNavigate();

  // Handler for login
  const handleLogin = async (username: string, password: string) => {
    console.log("Attempting login with:", username);
    const success = await login(username, password);
    if (success) {
      toast.success('Login successful');
    } else {
      toast.error('Invalid credentials. Please use admin / admin123');
    }
  };

  // Handler for logout
  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  // Check if user is admin, redirect if not
  useEffect(() => {
    if (isAuthenticated && user && !user.is_admin) {
      toast.error('You do not have admin privileges');
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

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
    const success = await updatePackagePrices(id, editValues.singlePrice, editValues.doublePrice);
    
    if (success) {
      setEditingId(null);
      toast.success('Package prices updated successfully');
    } else {
      toast.error('Failed to update package prices');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  // Show login form if not authenticated
  if (!isAuthenticated || !user || !user.is_admin) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 text-center py-20">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-forest">Admin Panel</h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
      
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
                        >
                          <Save size={16} className="mr-1" /> Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
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
        
        <div className="p-4 text-sm text-gray-500 bg-gray-50 border-t">
          All changes are saved to the database immediately.
        </div>
      </div>
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
