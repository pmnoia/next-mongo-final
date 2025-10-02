"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Box,
    Paper,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Divider,
    Chip,
    CircularProgress,
    Alert,
    IconButton
} from '@mui/material';
import {
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    Badge as BadgeIcon,
    Interests as InterestsIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

export default function CustomerDetailPage() {
    const router = useRouter();
    const params = useParams();
    const customerId = params.id;
    
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch customer data
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/customer/${customerId}`);
                
                if (response.ok) {
                    const customerData = await response.json();
                    setCustomer(customerData);
                } else if (response.status === 404) {
                    setError('Customer not found');
                } else {
                    throw new Error('Failed to fetch customer');
                }
            } catch (error) {
                console.error('Error fetching customer:', error);
                setError('Failed to load customer data');
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchCustomer();
        }
    }, [customerId]);

    // Loading state
    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '50vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress size={60} />
                <Typography variant="h6" color="textSecondary">
                    Loading customer details...
                </Typography>
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box sx={{ m: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push('/customer')}
                    sx={{ mb: 2 }}
                >
                    Back to Customers
                </Button>
                <Alert severity="error" sx={{ maxWidth: 600 }}>
                    <Typography variant="h6">Error</Typography>
                    {error}
                </Alert>
            </Box>
        );
    }

    // Main content
    return (
        <Box sx={{ m: 3, maxWidth: 800, mx: 'auto' }}>
            {/* Header with navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.push('/customer')}
                    variant="outlined"
                >
                    Back to Customers
                </Button>
            </Box>

            {/* Customer Details Card */}
            <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                        <Box>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {customer.name}
                            </Typography>
                            <Chip 
                                label={`Member #${customer.memberNum}`} 
                                color="primary" 
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Customer Information Grid */}
                    <Grid container spacing={3}>
                        {/* Name */}
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PersonIcon sx={{ color: 'text.secondary', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Full Name
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ pl: 4 }}>
                                {customer.name}
                            </Typography>
                        </Grid>

                        {/* Member Number */}
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <BadgeIcon sx={{ color: 'text.secondary', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Member Number
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ pl: 4 }}>
                                {customer.memberNum}
                            </Typography>
                        </Grid>

                        {/* Date of Birth */}
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CalendarIcon sx={{ color: 'text.secondary', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Date of Birth
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ pl: 4 }}>
                                {customer.dateOfBirth 
                                    ? new Date(customer.dateOfBirth).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : 'Not specified'
                                }
                            </Typography>
                            {customer.dateOfBirth && (
                                <Typography variant="body2" color="text.secondary" sx={{ pl: 4, mt: 0.5 }}>
                                    Age: {Math.floor((new Date() - new Date(customer.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} years old
                                </Typography>
                            )}
                        </Grid>

                        {/* Customer ID */}
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Customer ID
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                {customer._id}
                            </Typography>
                        </Grid>

                        {/* Interests */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <InterestsIcon sx={{ color: 'text.secondary', mr: 1 }} />
                                <Typography variant="subtitle2" color="text.secondary">
                                    Interests & Hobbies
                                </Typography>
                            </Box>
                            <Paper 
                                variant="outlined" 
                                sx={{ 
                                    p: 2, 
                                    ml: 4, 
                                    backgroundColor: 'grey.50',
                                    borderRadius: 2
                                }}
                            >
                                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                    {customer.interests || 'No interests specified'}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={() => router.push('/customer')}
                            size="large"
                        >
                            Back to List
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}