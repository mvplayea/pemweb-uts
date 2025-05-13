"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Bar,
} from "recharts"

const Dashboard = () => {
  const [transactions, setTransactions] = useState([])
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalRevenue: 0,
    avgTransactionValue: 0,
    topOutlets: [],
    topServices: [],
  })
  const [timeFilter, setTimeFilter] = useState("all") // all, month, week

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      const storedTransactions = localStorage.getItem("transactions")
      if (storedTransactions) {
        const parsedTransactions = JSON.parse(storedTransactions)
        setTransactions(parsedTransactions)
        calculateStats(parsedTransactions)
      }
    }

    loadData()

    // Set up periodic refresh
    const intervalId = setInterval(loadData, 5000)
    return () => clearInterval(intervalId)
  }, [])

  // Filter transactions based on time range
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions")
    if (!storedTransactions) return

    const parsedTransactions = JSON.parse(storedTransactions)
    let filteredTransactions = [...parsedTransactions]

    if (timeFilter === "week") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      filteredTransactions = parsedTransactions.filter((transaction) => new Date(transaction.id) > oneWeekAgo)
    } else if (timeFilter === "month") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      filteredTransactions = parsedTransactions.filter((transaction) => new Date(transaction.id) > oneMonthAgo)
    }

    setTransactions(filteredTransactions)
    calculateStats(filteredTransactions)
  }, [timeFilter])

  const calculateStats = (transactionData) => {
    if (!transactionData.length) {
      setStats({
        totalTransactions: 0,
        totalRevenue: 0,
        avgTransactionValue: 0,
        topOutlets: [],
        topServices: [],
      })
      return
    }

    // Calculate total revenue and average transaction value
    const totalRevenue = transactionData.reduce((sum, transaction) => sum + parseInt(transaction.price), 0)
    const avgTransactionValue = totalRevenue / transactionData.length

    // Calculate top outlets
    const outletCounts = transactionData.reduce((acc, transaction) => {
      if (!acc[transaction.outlet]) acc[transaction.outlet] = 0
      acc[transaction.outlet]++
      return acc
    }, {})

    const topOutlets = Object.entries(outletCounts)
      .map(([outlet, count]) => ({ outlet, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate top products
    const serviceCounts = transactionData.reduce((acc, transaction) => {
      if (!acc[transaction.service]) acc[transaction.service] = 0
      acc[transaction.service]++
      return acc
    }, {})

    const topServices = Object.entries(serviceCounts)
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    setStats({
      totalTransactions: transactionData.length,
      totalRevenue,
      avgTransactionValue,
      topOutlets,
      topServices,
    })
  }

  // Generate transaction trend data by day of week
  const generateDailyTrendData = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayTotals = Array(7).fill(0)
    const dayTransactions = Array(7).fill(0)

    transactions.forEach((transaction) => {
      const date = new Date(transaction.id)
      const dayIndex = date.getDay()
      dayTotals[dayIndex] += transaction.price
      dayTransactions[dayIndex]++
    })

    return days.map((day, index) => ({
      name: day,
      transactions: dayTransactions[index],
      revenue: dayTotals[index],
    }))
  }

  // Generate outlet performance data
  const generateOutletData = () => {
    const outletData = {}

    transactions.forEach((transaction) => {
      if (!outletData[transaction.outlet]) {
        outletData[transaction.outlet] = {
          name: transaction.outlet,
          revenue: 0,
          transactions: 0,
        }
      }
      outletData[transaction.outlet].revenue += parseInt(transaction.price)
      outletData[transaction.outlet].transactions++
    })

    return Object.values(outletData)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }

  const dailyTrendData = generateDailyTrendData()
  const outletData = generateOutletData()

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value)
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.name === "revenue" ? formatCurrency(entry.value) : entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
              <span>{trend > 0 ? "↑" : "↓"}</span>
              <span className="ml-1 text-sm">{Math.abs(trend)}% from last period</span>
            </div>
          )}
        </div>
        <div className="text-blue-500">{icon}</div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">Transactions Dashboard</h1>
                <p className="mt-1 text-gray-600">Analytics overview of your transactions</p>
              </div>
              {/* export to csv */}
              {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "owner") && (
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => {
                      const csvContent =
                        "data:text/csv;charset=utf-8," +
                        "Customer, Service, Outlet, Price\n" + 
                        transactions.map((t) => `${t.customer},${t.service},${t.outlet},${t.price}`).join("\n")
                      const encodedUri = encodeURI(csvContent)
                      const link = document.createElement("a")
                      link.setAttribute("href", encodedUri)
                      link.setAttribute("download", "transactions.csv")
                      document.body.appendChild(link)
                      link.click()
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Export to CSV
                  </button>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="Total Transactions" value={stats.totalTransactions} icon="🧾" trend={5} />
              <StatCard title="Total Revenue" value={formatCurrency(stats.totalRevenue)} icon="💰" trend={7} />
              <StatCard
                title="Average Transaction Value"
                value={formatCurrency(stats.avgTransactionValue)}
                icon="💵"
                trend={-2}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Daily Transaction Trend Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Daily Transaction Trends</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                      <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="transactions"
                        name="Transactions"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#10B981"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Outlet Performance Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Outlet Performance</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={outletData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" />
                      <Bar dataKey="transactions" name="Transactions" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Top Transactions Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Outlet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions
                      .sort((a, b) => new Date(b.id) - new Date(a.id))
                      .slice(0, 5)
                      .map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{transaction.customer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{transaction.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {transaction.outlet}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {formatCurrency(transaction.price)}
                          </td>
                        </tr>
                      ))}
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          No transactions available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
