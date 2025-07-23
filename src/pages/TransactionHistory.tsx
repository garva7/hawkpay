import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, Search, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TransactionStatus } from '@/types';

export default function TransactionHistory() {
  const { transactions } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending':
      case 'processing':
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const variants = {
      success: 'bg-success/10 text-success border-success/20',
      failed: 'bg-destructive/10 text-destructive border-destructive/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      processing: 'bg-primary/10 text-primary border-primary/20'
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View and manage all your transaction records</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Transactions ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/50"
                  >
                    <TableCell>
                      {transaction.timestamp.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.receiver}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{transaction.purpose}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          transaction.riskScore < 0.3 ? 'bg-success' :
                          transaction.riskScore < 0.7 ? 'bg-warning' : 'bg-destructive'
                        }`} />
                        <span className="text-sm text-muted-foreground">
                          {(transaction.riskScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found matching your filters.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}