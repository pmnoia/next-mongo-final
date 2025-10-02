"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    Paper, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Grid,
    FormControl,
    InputLabel,
    Snackbar,
    Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function CustomerPage() {
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, name: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        memberNum: '',
        interests: ''
    });

    // Fetch customers
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/customer');
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            } else {
                throw new Error('Failed to fetch customers');
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            showSnackbar('Failed to fetch customers', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Load customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.dateOfBirth || !formData.memberNum || !formData.interests) {
            showSnackbar('Please fill in all fields', 'error');
            return;
        }

        try {
            const url = editingCustomer ? `/api/customer/${editingCustomer._id}` : '/api/customer';
            const method = editingCustomer ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    memberNum: Number(formData.memberNum)
                }),
            });

            if (response.ok) {
                await fetchCustomers(); // Refresh the list
                resetForm();
                showSnackbar(
                    editingCustomer ? 'Customer updated successfully' : 'Customer added successfully',
                    'success'
                );
            } else {
                throw new Error('Failed to save customer');
            }
        } catch (error) {
            console.error('Error saving customer:', error);
            showSnackbar('Failed to save customer', 'error');
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/customer/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCustomers(customers.filter(customer => customer._id !== id));
                showSnackbar('Customer deleted successfully', 'success');
            } else {
                throw new Error('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            showSnackbar('Failed to delete customer', 'error');
        }
        setDeleteDialog({ open: false, id: null, name: '' });
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            name: '',
            dateOfBirth: '',
            memberNum: '',
            interests: ''
        });
        setEditingCustomer(null);
        setFormOpen(false);
    };

    // Open form for editing
    const openEditForm = (customer) => {
        setFormData({
            name: customer.name,
            dateOfBirth: customer.dateOfBirth ? new Date(customer.dateOfBirth).toISOString().split('T')[0] : '',
            memberNum: customer.memberNum.toString(),
            interests: customer.interests
        });
        setEditingCustomer(customer);
        setFormOpen(true);
    };

    // Open form for adding
    const openAddForm = () => {
        resetForm();
        setFormOpen(true);
    };

    // Open delete confirmation dialog
    const openDeleteDialog = (id, name) => {
        setDeleteDialog({ open: true, id, name });
    };

    // Close delete confirmation dialog
    const closeDeleteDialog = () => {
        setDeleteDialog({ open: false, id: null, name: '' });
    };

    return (
        <main>
            <Box sx={{ m: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Customer Management
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={openAddForm}
                    >
                        Add Customer
                    </Button>
                </Box>

                {/* Navigation */}
                <Box sx={{ mb: 3 }}>
                    <Button href="/" sx={{ mr: 2 }}>← Back to Home</Button>
                </Box>

                {/* Customer List */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Date of Birth</strong></TableCell>
                                <TableCell><strong>Member Number</strong></TableCell>
                                <TableCell><strong>Interests</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : customers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                                        No customers found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                customers.map((customer) => (
                                    <TableRow 
                                        key={customer._id}
                                        hover
                                        sx={{ 
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'action.hover'
                                            }
                                        }}
                                        onClick={() => router.push(`/customer/${customer._id}`)}
                                    >
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>
                                            {customer.dateOfBirth 
                                                ? new Date(customer.dateOfBirth).toLocaleDateString() 
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell>{customer.memberNum}</TableCell>
                                        <TableCell>{customer.interests}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/customer/${customer._id}`);
                                                }}
                                                color="info"
                                                size="small"
                                                title="View Details"
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditForm(customer);
                                                }}
                                                color="primary"
                                                size="small"
                                                title="Edit Customer"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDeleteDialog(customer._id, customer.name);
                                                }}
                                                color="error"
                                                size="small"
                                                title="Delete Customer"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Add/Edit Customer Dialog */}
            <Dialog open={formOpen} onClose={resetForm} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Customer Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Member Number"
                                    type="number"
                                    value={formData.memberNum}
                                    onChange={(e) => setFormData({ ...formData, memberNum: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Interests"
                                    multiline
                                    rows={3}
                                    value={formData.interests}
                                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetForm}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCustomer ? 'Update' : 'Add'} Customer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete customer "{deleteDialog.name}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    <Button onClick={() => handleDelete(deleteDialog.id)} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </main>
    );
}