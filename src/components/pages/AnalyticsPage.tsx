import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AnalyticsPage() {
  // Mock data for complaints frequency over time
  const frequencyData = [
    { month: 'Jul', complaints: 45 },
    { month: 'Aug', complaints: 52 },
    { month: 'Sep', complaints: 38 },
    { month: 'Oct', complaints: 61 },
    { month: 'Nov', complaints: 55 },
    { month: 'Dec', complaints: 48 },
    { month: 'Jan', complaints: 42 }
  ];

  // Mock data for resolution time analysis
  const resolutionData = [
    { week: 'Week 1', avgHours: 24 },
    { week: 'Week 2', avgHours: 18 },
    { week: 'Week 3', avgHours: 22 },
    { week: 'Week 4', avgHours: 16 }
  ];

  // Mock data for area-wise distribution
  const areaData = [
    { area: 'Downtown', complaints: 85, color: '#388E3C' },
    { area: 'Residential North', complaints: 62, color: '#1976D2' },
    { area: 'Residential South', complaints: 48, color: '#A5D6A7' },
    { area: 'Industrial Zone', complaints: 35, color: '#90CAF9' },
    { area: 'Parks & Recreation', complaints: 28, color: '#66BB6A' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-foreground mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg font-paragraph text-foreground/70">
            Data-driven insights for better waste management
          </p>
        </motion.div>

        {/* Complaints Frequency Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-semibold text-foreground flex items-center">
                <TrendingUp className="w-6 h-6 text-primary mr-3" />
                Complaints Frequency Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={frequencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#212121', fontFamily: 'lato-light' }}
                    />
                    <YAxis 
                      tick={{ fill: '#212121', fontFamily: 'lato-light' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E0E0E0',
                        fontFamily: 'lato-light'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontFamily: 'lato-light' }}
                    />
                    <Bar dataKey="complaints" fill="#388E3C" name="Complaints" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="font-paragraph text-sm text-foreground/70 mt-4 text-center">
                Monthly complaint trends showing seasonal variations and patterns
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resolution Time Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-sm h-full">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-foreground flex items-center">
                  <Clock className="w-6 h-6 text-secondary mr-3" />
                  Resolution Time Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={resolutionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                      <XAxis 
                        dataKey="week" 
                        tick={{ fill: '#212121', fontFamily: 'lato-light' }}
                      />
                      <YAxis 
                        tick={{ fill: '#212121', fontFamily: 'lato-light' }}
                        label={{ 
                          value: 'Hours', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { fontFamily: 'lato-light', fill: '#212121' }
                        }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E0E0E0',
                          fontFamily: 'lato-light'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ fontFamily: 'lato-light' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avgHours" 
                        stroke="#1976D2" 
                        strokeWidth={3}
                        name="Avg Resolution Time (hours)"
                        dot={{ fill: '#1976D2', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="font-paragraph text-sm text-foreground/70 mt-4 text-center">
                  Average time to resolve complaints by week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Area-wise Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-sm h-full">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-foreground flex items-center">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  Area-wise Complaint Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={areaData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ area, percent }) => `${area}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="complaints"
                      >
                        {areaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF', 
                          border: '1px solid #E0E0E0',
                          fontFamily: 'lato-light'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="font-paragraph text-sm text-foreground/70 mt-4 text-center">
                  Geographic distribution of complaints across city zones
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="shadow-sm bg-gradient-to-br from-primary to-secondary text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-semibold mb-6">
                Key Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-6 rounded">
                  <p className="font-paragraph text-sm mb-2 opacity-90">
                    Most Active Area
                  </p>
                  <p className="text-2xl font-heading font-bold">
                    Downtown
                  </p>
                  <p className="font-paragraph text-sm mt-1 opacity-80">
                    85 complaints this month
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded">
                  <p className="font-paragraph text-sm mb-2 opacity-90">
                    Average Resolution Time
                  </p>
                  <p className="text-2xl font-heading font-bold">
                    20 hours
                  </p>
                  <p className="font-paragraph text-sm mt-1 opacity-80">
                    18% improvement from last month
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded">
                  <p className="font-paragraph text-sm mb-2 opacity-90">
                    Resolution Rate
                  </p>
                  <p className="text-2xl font-heading font-bold">
                    87%
                  </p>
                  <p className="font-paragraph text-sm mt-1 opacity-80">
                    Within 48 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
