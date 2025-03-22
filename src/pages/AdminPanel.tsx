
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ResponsiveFooter from '@/components/ResponsiveFooter';
import { useEnrollment, EnrollmentProvider } from '@/contexts/EnrollmentContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

// Component that uses the enrollment context
const AdminPanelContent = () => {
  const { packages, updatePackagePrices } = useEnrollment();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    singlePrice: string;
    doublePrice: string;
  }>({ singlePrice: '', doublePrice: '' });

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

  const handleSaveEdit = (id: string) => {
    if (updatePackagePrices) {
      updatePackagePrices(id, editValues.singlePrice, editValues.doublePrice);
      setEditingId(null);
      toast.success('Package prices updated successfully');
    } else {
      toast.error('Update function not available');
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-serif text-forest mb-8">Admin Panel</h1>
      
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
          Note: In a production environment, this interface would be protected by authentication and changes would be saved to a database.
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
