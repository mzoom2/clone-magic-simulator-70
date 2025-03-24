
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Clock, LogOut, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: number;
  package_title: string;
  amount_cents: number;
  currency: string;
  status: string;
  created_at: string;
  attended: boolean;
}

const DashboardPage = () => {
  const { user, token, refreshUserData, logout } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUserData();
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
        toast({
          title: 'Error',
          description: 'Failed to fetch your transactions',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast({
        title: 'Connection Error',
        description: 'Could not connect to the server',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (cents: number) => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'canceled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getAttendanceStatus = (transaction: Transaction) => {
    if (transaction.status !== 'completed') {
      return null; // Only show attendance for completed transactions
    }
    
    if (transaction.attended) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Attended
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Calendar size={12} />
          Upcoming
        </span>
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account.',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-forest">Dashboard</h1>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between flex-wrap gap-1">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">{user?.first_name} {user?.last_name}</span>
                  </div>
                  <div className="flex justify-between flex-wrap gap-1">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium break-all">{user?.email}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant="outline"
                  asChild
                >
                  <Link to="/enroll">Book New Experience</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Recent Activity</CardTitle>
                <CardDescription>Your recent bookings and payments</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-forest" />
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>You haven't made any bookings yet.</p>
                    <Button 
                      className="mt-4"
                      asChild
                    >
                      <Link to="/enroll">Book Your First Experience</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Experience</TableHead>
                          <TableHead className="hidden sm:table-cell">Amount</TableHead>
                          <TableHead className="hidden sm:table-cell">Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.slice(0, 3).map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.package_title}</TableCell>
                            <TableCell className="hidden sm:table-cell">{formatAmount(transaction.amount_cents)}</TableCell>
                            <TableCell className="hidden sm:table-cell">{formatDate(transaction.created_at)}</TableCell>
                            <TableCell className="flex items-center">
                              {getStatusIcon(transaction.status)}
                              <span className="ml-2 capitalize">{transaction.status}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">All Transactions</CardTitle>
              <CardDescription>Your payment history</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-forest" />
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No transactions found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Experience</TableHead>
                        <TableHead className="hidden sm:table-cell">Amount</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.package_title}</TableCell>
                          <TableCell className="hidden sm:table-cell">{formatAmount(transaction.amount_cents)}</TableCell>
                          <TableCell className="hidden sm:table-cell">{formatDate(transaction.created_at)}</TableCell>
                          <TableCell className="flex items-center">
                            {getStatusIcon(transaction.status)}
                            <span className="ml-2 capitalize">{transaction.status}</span>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {getAttendanceStatus(transaction)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <ResponsiveFooter />
    </div>
  );
};

export default DashboardPage;
