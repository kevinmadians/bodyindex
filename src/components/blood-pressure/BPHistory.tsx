import React, { useState, Fragment } from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, ArrowDown, ArrowUp, Search, Download, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getBPCategory, getBPCategoryColor, BPReading } from '@/lib/blood-pressure-utils';

interface BPHistoryProps {
  readings: BPReading[];
  onDeleteReading: (id: string) => void;
  onClearAllReadings: () => void;
  onExportData: () => void;
}

const BPHistory: React.FC<BPHistoryProps> = ({
  readings,
  onDeleteReading,
  onClearAllReadings,
  onExportData
}) => {
  const [sortField, setSortField] = useState<keyof BPReading>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Handle sorting
  const handleSort = (field: keyof BPReading) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Get sorted readings
  const getSortedReadings = () => {
    return [...readings]
      .filter(reading => {
        // Filter by category
        if (filterCategory !== 'all') {
          const category = getBPCategory(reading.systolic, reading.diastolic);
          if (category !== filterCategory) return false;
        }
        
        // Filter by search
        if (searchQuery.trim() !== '') {
          const searchLower = searchQuery.toLowerCase();
          const date = new Date(reading.date).toLocaleDateString();
          const category = getBPCategory(reading.systolic, reading.diastolic);
          
          const searchableText = `
            ${date} 
            ${reading.time || ''} 
            ${reading.systolic} 
            ${reading.diastolic} 
            ${reading.pulse || ''} 
            ${category} 
            ${reading.notes || ''}
          `.toLowerCase();
          
          return searchableText.includes(searchLower);
        }
        
        return true;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sortField === 'systolic' || sortField === 'diastolic' || sortField === 'pulse') {
          const valueA = a[sortField] || 0;
          const valueB = b[sortField] || 0;
          return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return 0;
      });
  };

  const sortedReadings = getSortedReadings();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search readings..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select 
            value={filterCategory} 
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Low Blood Pressure">Low Blood Pressure</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Elevated">Elevated</SelectItem>
              <SelectItem value="Hypertension Stage 1">Hypertension Stage 1</SelectItem>
              <SelectItem value="Hypertension Stage 2">Hypertension Stage 2</SelectItem>
              <SelectItem value="Hypertensive Crisis">Hypertensive Crisis</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onClearAllReadings}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Readings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              {readings.length === 0 && (
                <TableCaption>No readings saved yet. Take a reading to see your history.</TableCaption>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center gap-1">
                      Date/Time
                      {sortField === 'date' && (
                        <span>
                          {sortDirection === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  
                  <TableHead 
                    className="cursor-pointer" 
                    onClick={() => handleSort('systolic')}
                  >
                    <div className="flex items-center gap-1">
                      Systolic
                      {sortField === 'systolic' && (
                        <span>
                          {sortDirection === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('diastolic')}
                  >
                    <div className="flex items-center gap-1">
                      Diastolic
                      {sortField === 'diastolic' && (
                        <span>
                          {sortDirection === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('pulse')}
                  >
                    <div className="flex items-center gap-1">
                      Pulse
                      {sortField === 'pulse' && (
                        <span>
                          {sortDirection === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  
                  <TableHead>Category</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {sortedReadings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                      {readings.length === 0 
                        ? "No readings saved yet" 
                        : "No matching readings found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedReadings.map(reading => {
                    const category = getBPCategory(reading.systolic, reading.diastolic);
                    const categoryColor = getBPCategoryColor(category);
                    
                    return (
                      <TableRow key={reading.id}>
                        <TableCell>
                          <div className="font-medium">
                            {format(new Date(reading.date), 'MMM d, yyyy')}
                          </div>
                          {reading.time && (
                            <div className="text-sm text-muted-foreground">
                              {reading.time}
                            </div>
                          )}
                        </TableCell>
                        
                        <TableCell className="font-medium">
                          {reading.systolic} <span className="text-xs text-muted-foreground">mmHg</span>
                        </TableCell>
                        
                        <TableCell className="font-medium">
                          {reading.diastolic} <span className="text-xs text-muted-foreground">mmHg</span>
                        </TableCell>
                        
                        <TableCell>
                          {reading.pulse && (
                            <span className="font-medium">
                              {reading.pulse} <span className="text-xs text-muted-foreground">bpm</span>
                            </span>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <div 
                            className="px-2 py-1 rounded-full text-xs inline-flex justify-center"
                            style={{ 
                              backgroundColor: `${categoryColor}20`,
                              color: categoryColor
                            }}
                          >
                            {category}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {reading.notes && (
                            <div className="max-w-[150px] truncate text-sm text-muted-foreground">
                              {reading.notes}
                            </div>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteReading(reading.id)}
                            title="Delete reading"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-xs text-muted-foreground">
        Showing {sortedReadings.length} of {readings.length} readings
      </div>
    </div>
  );
};

export default BPHistory; 