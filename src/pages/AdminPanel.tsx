import React, { useState, useEffect, useCallback } from 'react';
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
import { RefreshCw, Edit, Save, X, Check, Users, Package, CreditCard, User, CheckCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Transaction management component
const TransactionManagement = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTimestamp, setRefreshTimestamp] = useState(new Date());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Set up real-time refresh interval (15 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshTimestamp(new Date());
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Fetch transactions when token or refresh timestamp changes
  useEffect(() => {
    fetchTransactions();
  }, [token, refreshTimestamp]);
  
  // Filter and paginate transactions when search term or transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      const filtered = filterTransactions(transactions, searchTerm);
      setFilteredTransactions(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [searchTerm, transactions, itemsPerPage]);

  const filterTransactions = (txs, term) => {
    if (!term) return txs;
    
    const lowercaseTerm = term.toLowerCase();
    return txs.filter(tx => 
      tx.id.toString().includes(lowercaseTerm) ||
      tx.first_name?.toLowerCase().includes(lowercaseTerm) ||
      tx.last_name?.toLowerCase().includes(lowercaseTerm) ||
      tx.email?.toLowerCase().includes(lowercaseTerm) ||
      tx.package_title?.toLowerCase().includes(lowercaseTerm) ||
      tx.status?.toLowerCase().includes(lowercaseTerm)
    );
  };

  const fetchTransactions = async () => {
    if (!token) return;
    
    try {
      setIsRefreshing(true);
      const response = await fetch('http://localhost:5000/transactions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Sort transactions with newest at the top
        const sortedTransactions = (data.transactions || []).sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setTransactions(sortedTransactions);
      } else {
        toast.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Could not connect to the server');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshTimestamp(new Date());
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
          t.id === transactionId ? { ...t, attended, status: attended ? 'completed' : t.status } : t
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

  const markAsAttended = async (transactionId) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:5000/transactions/${transactionId}/attended`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ attended: true })
      });
      
      if (response.ok) {
        // Update local state
        setTransactions(transactions.map(t => 
          t.id === transactionId ? { ...t, attended: true, status: 'completed' } : t
        ));
        toast.success('Transaction marked as attended');
      } else {
        toast.error('Failed to mark as attended');
      }
    } catch (error) {
      console.error('Failed to update attendance:', error);
      toast.error('Could not connect to the server');
    }
  };

  const updateTransactionStatus = async (transactionId) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:5000/transactions/${transactionId}/attended`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          attended: true 
        })
      });
      
      if (response.ok) {
        // Update local state to reflect both status and attendance changes
        setTransactions(transactions.map(t => 
          t.id === transactionId ? { ...t, status: 'completed', attended: true } : t
        ));
        
        toast.success('Transaction marked as completed and attended');
      } else {
        try {
          const errorData = await response.json();
          toast.error(`Failed to update transaction: ${errorData.error || 'Unknown error'}`);
        } catch (parseError) {
          toast.error('Failed to process server response');
        }
      }
    } catch (error) {
      console.error('Failed to update transaction:', error);
      toast.error(`Server connection issue. Please check if the backend server is running at http://localhost:5000`);
    }
  };

  // Get paginated data
  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTransactions.slice(startIndex, endIndex);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  // Filter for pending transactions
  const pendingTransactions = transactions.filter(t => t.status === 'pending');
  
  // Filter for approved transactions (completed and attended)
  const approvedTransactions = transactions.filter(t => t.status === 'completed' && t.attended === true);
  
  // Get counts for all transaction types
  const pendingCount = pendingTransactions.length;
  const approvedCount = approvedTransactions.length;
  const totalCount = transactions.length;

  

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-forest" />
            <CardTitle>Transaction Management</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <div className="text-xs text-muted-foreground">
              Auto-refreshes every 15s
            </div>
          </div>
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
          <Tabs defaultValue="pending" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </div>
            
            <TabsContent value="all">
              <TransactionTable 
                transactions={getPaginatedData()} 
                formatAmount={formatAmount} 
                formatDate={formatDate} 
                handleAttendanceChange={handleAttendanceChange}
                markAsAttended={markAsAttended}
                updateTransactionStatus={updateTransactionStatus}
              />
              {filteredTransactions.length > itemsPerPage && (
                <PaginationControls 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  totalItems={filteredTransactions.length}
                />
              )}
            </TabsContent>
            
            <TabsContent value="pending">
              {pendingTransactions.length === 0 ? (
                <div className="text-center py-8">No pending transactions</div>
              ) : (
                <>
                  <TransactionTable 
                    transactions={pendingTransactions.slice(0, itemsPerPage)} 
                    formatAmount={formatAmount} 
                    formatDate={formatDate} 
                    handleAttendanceChange={handleAttendanceChange}
                    markAsAttended={markAsAttended}
                    updateTransactionStatus={updateTransactionStatus}
                  />
                  {pendingTransactions.length > itemsPerPage && (
                    <PaginationControls 
                      currentPage={currentPage} 
                      totalPages={Math.ceil(pendingTransactions.length / itemsPerPage)} 
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      totalItems={pendingTransactions.length}
                    />
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="approved">
              {approvedTransactions.length === 0 ? (
                <div className="text-center py-8">No approved transactions</div>
              ) : (
                <>
                  <TransactionTable 
                    transactions={approvedTransactions.slice(0, itemsPerPage)} 
                    formatAmount={formatAmount} 
                    formatDate={formatDate} 
                    handleAttendanceChange={handleAttendanceChange}
                    markAsAttended={markAsAttended}
                    updateTransactionStatus={updateTransactionStatus}
                    isApprovedTab={true}
                  />
                  {approvedTransactions.length > itemsPerPage && (
                    <PaginationControls 
                      currentPage={currentPage} 
                      totalPages={Math.ceil(approvedTransactions.length / itemsPerPage)} 
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      totalItems={approvedTransactions.length}
                    />
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

// Pagination Controls Component
const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalItems 
}) => {
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink 
          onClick={() => goToPage(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // If there are many pages, show ellipsis
    if (totalPages > 7) {
      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => goToPage(i)} 
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    } else {
      // Show all pages if there aren't many
      for (let i = 2; i < totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => goToPage(i)} 
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    // Always show last page if there is more than 1 page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => goToPage(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
      </div>
      
      <div className="flex items-center space-x-2 text-sm">
        <div className="flex items-center space-x-1">
          <span>Show</span>
          <select 
            className="border border-input rounded px-2 py-1"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
          </PaginationItem>
          
          {renderPageNumbers()}
          
          <PaginationItem>
            <PaginationNext onClick={() => goToPage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

// Extracted TransactionTable component to reduce duplication
const TransactionTable = ({ 
  transactions, 
  formatAmount, 
  formatDate, 
  handleAttendanceChange, 
  markAsAttended, 
  updateTransactionStatus,
  isApprovedTab = false
}) => {
  if (!transactions || transactions.length === 0) {
    return <div className="text-center py-4">No matching transactions found</div>;
  }
  
  return (
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
            <TableHead>Actions</TableHead>
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
                  {transaction.status === 'completed' ? (
                    <>
                      <Checkbox 
                        id={`attended-${transaction.id}`}
                        checked={transaction.attended}
                        onCheckedChange={(checked) => {
                          console.log('Checkbox clicked:', checked);
                          handleAttendanceChange(transaction.id, checked);
                        }}
                      />
                      <label 
                        htmlFor={`attended-${transaction.id}`}
                        className="text-sm cursor-pointer"
                        onClick={() => {
                          const newValue = !transaction.attended;
                          console.log('Label clicked, setting to:', newValue);
                          handleAttendanceChange(transaction.id, newValue);
                        }}
                      >
                        {transaction.attended ? 'Yes' : 'No'}
                      </label>
                    </>
                  ) : (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {isApprovedTab ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="mr-1 h-4 w-4" /> Approved
                  </div>
                ) : transaction.status === 'completed' && !transaction.attended ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center" 
                    onClick={() => markAsAttended(transaction.id)}
                  >
                    <Check className="mr-1 h-4 w-4" /> Mark Attended
                  </Button>
                ) : transaction.status === 'pending' ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center text-yellow-700 bg-yellow-50 border-yellow-200 hover:bg-yellow-100" 
                    onClick={() => updateTransactionStatus(transaction.id)}
                  >
                    <Check className="mr-1 h-4 w-4" /> Mark Completed & Attended
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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
