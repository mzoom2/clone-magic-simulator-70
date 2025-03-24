
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { useEnrollment, EnrollmentProvider } from '@/contexts/EnrollmentContext';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Save, X, Check, Users, Package, CreditCard, User } from 'lucide-react';
import { toast } from 'sonner';

// Transaction management component
const TransactionManagement = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  const fetchTransactions = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:5000/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      } else {
        toast.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Could not connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (cents) => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAttendanceChange = async (transactionId, attended) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:5000/transactions/${transactionId}/attended`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ attended })
      });
      
      if (response.ok) {
        // Update local state
        setTransactions(transactions.map(t => 
          t.id === transactionId ? { ...t, attended } : t
        ));
        toast.success('Attendance status updated');
      } else {
        toast.error('Failed to update attendance status');
      }
    } catch (error) {
      console.error('Failed to update attendance:', error);
      toast.error('Could not connect to the server');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-forest" />
          <CardTitle>Transaction Management</CardTitle>
        </div>
        <CardDescription>
          View and manage all customer transactions
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">No transactions found</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attended</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>
                      {transaction.first_name} {transaction.last_name}
                      <div className="text-xs text-gray-500">{transaction.email}</div>
                    </TableCell>
                    <TableCell>{transaction.package_title}</TableCell>
                    <TableCell>{formatAmount(transaction.amount_cents)}</TableCell>
                    <TableCell>{formatDate(transaction.created_at)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : transaction.status === 'canceled' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`attended-${transaction.id}`}
                          checked={transaction.attended}
                          onCheckedChange={(checked) => handleAttendanceChange(transaction.id, checked)}
                          disabled={transaction.status !== 'completed'}
                          className="cursor-pointer"
                        />
                        <label 
                          htmlFor={`attended-${transaction.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {transaction.attended ? 'Yes' : 'No'}
                        </label>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// User management component
const UserManagement = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This would need an additional API endpoint to fetch users
  // For now, we'll just show a placeholder
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-forest" />
          <CardTitle>User Management</CardTitle>
        </div>
        <CardDescription>
          View and manage customer accounts
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          <p>User management functionality would need additional backend endpoints.</p>
          <p>This would allow admins to view, create, update, and disable user accounts.</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Package management component (enhanced)
const PackageManagement = () => {
  const { packages, updatePackagePrices } = useEnrollment();
  const { token } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    singlePrice: '',
    doublePrice: ''
  });
  
  const [allPackages, setAllPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Use packages from context for now, but in a real app
    // you would fetch from the backend API
    setAllPackages(packages);
    setIsLoading(false);
  }, [packages]);

  const handleEditClick = (pkg) => {
    setEditingId(pkg.id);
    setEditValues({
      singlePrice: pkg.singlePrice,
      doublePrice: pkg.doublePrice,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (id) => {
    if (updatePackagePrices) {
      updatePackagePrices(id, editValues.singlePrice, editValues.doublePrice);
      setEditingId(null);
      toast.success('Package prices updated successfully');
      
      // In a real implementation, you would also update the backend via API
    } else {
      toast.error('Update function not available');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-forest" />
          <CardTitle>Package Management</CardTitle>
        </div>
        <CardDescription>
          View and update package prices
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading packages...</div>
        ) : (
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
                {allPackages.map((pkg) => (
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
        )}
      </CardContent>
      
      <CardFooter className="text-sm text-gray-500 bg-gray-50 border-t">
        <div>
          Note: In a production environment, changes would be saved to a database
          and synchronized with the backend API.
        </div>
      </CardFooter>
    </Card>
  );
};

// Main Admin Panel component
const AdminPanelContent = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-forest">Admin Panel</h1>
          <p className="text-gray-600">
            Welcome back, {user?.first_name || 'Admin'}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="bg-forest/10 p-3 rounded-lg inline-flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-forest" />
            <span className="font-medium text-forest">Administrator</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <TransactionManagement />
        </TabsContent>
        
        <TabsContent value="packages" className="space-y-4">
          <PackageManagement />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Wrapper component that provides the enrollment context
const AdminPanel = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="mt-4">You do not have permission to access this page.</p>
          </div>
        </main>
        <ResponsiveFooter />
      </div>
    );
  }
  
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
