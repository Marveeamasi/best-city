import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiArrowRight,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";

function Properties() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "all",
    propertyType: "all",
    location: "",
    minROI: "",
    maxROI: "",
    fundingStatus: "all",
    sortBy: "newest",
  });

  const properties = [
    {
      id: 1,
      title: "Modern Villa with Pool",
      price: { usd: 850000, eth: 425 },
      location: "Beverly Hills, CA",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      type: "villa",
      roi: "7.2%",
      metrics: {
        totalInvestors: 142,
        funded: "89%",
        minInvestment: "$10",
        monthlyIncome: "$520",
        appreciation: "4.5%",
      },
      status: "Active Investment",
      features: ["Pool", "Smart Home", "Solar Panels"],
      tokenDetails: {
        totalTokens: 85000,
        availableTokens: 9350,
        tokenPrice: "$10",
      },
    },
    {
      id: 2,
      title: "Luxury Penthouse",
      price: { usd: 1200000, eth: 600 },
      location: "Manhattan, NY",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      type: "apartment",
      roi: "6.8%",
      metrics: {
        totalInvestors: 203,
        funded: "95%",
        minInvestment: "$10",
        monthlyIncome: "$680",
        appreciation: "5.2%",
      },
      status: "Almost Funded",
      features: ["Doorman", "Gym", "Terrace"],
      tokenDetails: {
        totalTokens: 120000,
        availableTokens: 6000,
        tokenPrice: "$10",
      },
    },
    {
      id: 3,
      title: "Waterfront Estate",
      price: { usd: 2100000, eth: 1050 },
      location: "Miami Beach, FL",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      type: "house",
      roi: "7.5%",
      metrics: {
        totalInvestors: 89,
        funded: "45%",
        minInvestment: "$10",
        monthlyIncome: "$1200",
        appreciation: "6.1%",
      },
      status: "New Listing",
      features: ["Waterfront", "Dock", "Wine Cellar"],
      tokenDetails: {
        totalTokens: 210000,
        availableTokens: 115500,
        tokenPrice: "$10",
      },
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProperties = properties.filter((property) => {
    if (
      filters.propertyType !== "all" &&
      property.type !== filters.propertyType
    )
      return false;
    if (
      filters.location &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    if (filters.minROI && parseFloat(property.roi) < parseFloat(filters.minROI))
      return false;
    if (filters.maxROI && parseFloat(property.roi) > parseFloat(filters.maxROI))
      return false;

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (max && (property.price.usd < min || property.price.usd > max))
        return false;
      if (!max && property.price.usd < min) return false;
    }

    if (filters.fundingStatus !== "all") {
      const fundedPercentage = parseInt(property.metrics.funded);
      switch (filters.fundingStatus) {
        case "new":
          if (fundedPercentage > 30) return false;
          break;
        case "active":
          if (fundedPercentage < 30 || fundedPercentage >= 90) return false;
          break;
        case "almostFunded":
          if (fundedPercentage < 90) return false;
          break;
        default:
          break;
      }
    }

    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case "priceAsc":
        return a.price.usd - b.price.usd;
      case "priceDesc":
        return b.price.usd - a.price.usd;
      case "roiDesc":
        return parseFloat(b.roi) - parseFloat(a.roi);
      case "fundingDesc":
        return parseInt(b.metrics.funded) - parseInt(a.metrics.funded);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <div className="bg-[var(--color-card)] shadow border-b border-[var(--color-border)]">
        <div className="container py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              Investment Properties
            </h1>
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 rounded-md transition-colors ${
                  showFilters
                    ? "bg-[var(--color-primary-100)] text-[var(--color-primary-600)]"
                    : "hover:bg-[var(--color-secondary-100)] text-[var(--color-text)]"
                }`}
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
              >
                <FiFilter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-[var(--color-card)] shadow-md border-t border-[var(--color-border)]">
          <div className="container py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-secondary-700)] mb-1">
                  Price Range
                </label>
                <select
                  className="input"
                  value={filters.priceRange}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
                  }
                >
                  <option value="all">All Prices</option>
                  <option value="0-500000">Under $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000">Over $1,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-secondary-700)] mb-1">
                  Property Type
                </label>
                <select
                  className="input"
                  value={filters.propertyType}
                  onChange={(e) =>
                    handleFilterChange("propertyType", e.target.value)
                  }
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-secondary-700)] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-secondary-700)] mb-1">
                  Minimum ROI
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Min ROI %"
                  value={filters.minROI}
                  onChange={(e) => handleFilterChange("minROI", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-secondary-700)] mb-1">
                  Funding Status
                </label>
                <select
                  className="input"
                  value={filters.fundingStatus}
                  onChange={(e) =>
                    handleFilterChange("fundingStatus", e.target.value)
                  }
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Listings</option>
                  <option value="active">Active Funding</option>
                  <option value="almostFunded">Almost Funded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-secondary-700)] mb-1">
                  Sort By
                </label>
                <select
                  className="input"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="roiDesc">Highest ROI</option>
                  <option value="fundingDesc">Most Funded</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              className="card group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/properties/${property.id}`}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[var(--color-text)] px-3 py-1 rounded-full text-[var(--color-bg)] font-semibold text-sm shadow">
                    {property.status}
                  </div>
                </div>
                <div className="p-6 max-sm:px-3">
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)]">
                    {property.title}
                  </h3>
                  <p className="text-[var(--color-secondary-300)] mb-4">
                    {property.location}
                  </p>

                  {/* Price and ROI */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-[var(--color-secondary-500)]">
                        Investment Price
                      </p>
                      <div className="flex items-center">
                        <FiDollarSign className="text-[var(--color-primary-600)]" />
                        <span className="font-semibold text-[var(--color-text)]">
                          ${property.price.usd.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-[var(--color-primary-600)]">
                        <FaEthereum className="mr-1" />
                        <span>{property.price.eth} ETH</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[var(--color-secondary-500)]">
                        Annual ROI
                      </p>
                      <div className="flex items-center justify-end text-green-600">
                        <FiTrendingUp className="mr-1" />
                        <span className="font-semibold">{property.roi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Investment Metrics */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-secondary-300)]">
                        Monthly Income
                      </span>
                      <span className="font-medium text-[var(--color-text)]">
                        {property.metrics.monthlyIncome}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-secondary-300)]">
                        Appreciation
                      </span>
                      <span className="font-medium text-[var(--color-text)]">
                        {property.metrics.appreciation}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-secondary-300)]">
                        Min Investment
                      </span>
                      <span className="font-medium text-[var(--color-text)]">
                        {property.metrics.minInvestment}
                      </span>
                    </div>
                  </div>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--color-secondary-300)]">
                        Funding Progress
                      </span>
                      <span className="font-medium text-[var(--color-text)]">
                        {property.metrics.funded}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-secondary-100)] rounded-full h-2">
                      <div
                        className="bg-[var(--color-primary-600)] h-2 rounded-full transition-all duration-500"
                        style={{ width: property.metrics.funded }}
                      />
                    </div>
                  </div>

                  {/* Token Details */}
                  <div className="bg-[var(--color-secondary-50)] rounded-lg p-3 mb-4 border border-[var(--color-border)]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-secondary-300)]">
                        Available Tokens
                      </span>
                      <span className="font-medium text-[var(--color-text)]">
                        {property.tokenDetails.availableTokens.toLocaleString()}{" "}
                        / {property.tokenDetails.totalTokens.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-[var(--color-secondary-300)]">
                        Token Price
                      </span>
                      <span className="font-medium text-[var(--color-primary-600)]">
                        {property.tokenDetails.tokenPrice}
                      </span>
                    </div>
                  </div>

                  <button className="btn w-full flex items-center justify-center text-[var(--color-bg)]">
                    Invest Now
                    <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Properties;
