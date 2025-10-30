import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiMaximize2,
  FiCalendar,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiGrid,
  FiCheck
} from 'react-icons/fi';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaLinkedin, FaEthereum, FaWallet } from 'react-icons/fa';

function PropertyDetail() {
  const { id } = useParams();

  const property = {
    id: parseInt(id),
    title: 'Modern Villa with Pool',
    price: {
      usd: 850000,
      eth: 425
    },
    location: 'Beverly Hills, CA',
    type: 'villa',
    roi: '7.2%',
    metrics: {
      totalInvestors: 142,
      funded: '89%',
      minInvestment: '$10',
      monthlyIncome: '$520',
      appreciation: '4.5%',
      rentalYield: '5.8%',
      totalReturn: '10.3%'
    },
    status: 'Active Investment',
    description: 'This stunning modern villa offers luxurious living spaces with high-end finishes throughout. The property has been tokenized for fractional ownership, allowing investors to participate in this premium real estate opportunity with as little as $10.',
    features: [
      'Swimming Pool',
      'Smart Home System',
      'Gourmet Kitchen',
      'Home Theater',
      'Wine Cellar',
      'Outdoor Kitchen',
      'Fire Pit',
      'Three-Car Garage'
    ],
    tokenDetails: {
      totalTokens: 85000,
      availableTokens: 9350,
      tokenPrice: '$10',
      tokenSymbol: 'VILLA425',
      contractAddress: '0x1234...5678',
      blockchain: 'Ethereum'
    },
    financials: {
      grossRent: '$8,500/month',
      netRent: '$7,225/month',
      expenses: {
        management: '8%',
        maintenance: '5%',
        insurance: '2%',
        property_tax: '1.2%'
      },
      projectedAppreciation: '4.5% annually'
    },
    yearBuilt: 2020,
    parkingSpaces: 3,
    lotSize: '0.5 acres',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'
    ],
    agent: {
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john@realestate.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
    }
  };

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navigation */}
      <div className="bg-[var(--color-card)] shadow border-b and border-b border-[var(--color-border)]">
        <div className="container py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-[var(--color-secondary-300)] hover:text-[var(--color-primary-600)] transition-colors"
            >
              Home
            </Link>
            <span className="text-[var(--color-secondary-400)]">/</span>
            <Link
              to="/properties"
              className="text-[var(--color-secondary-300)] hover:text-[var(--color-primary-600)] transition-colors"
            >
              Properties
            </Link>
            <span className="text-[var(--color-secondary-400)]">/</span>
            <span className="text-[var(--color-primary-600)] font-medium">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="h-96 rounded-lg overflow-hidden shadow-lg border border-[var(--color-border)]">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {property.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="h-32 rounded-lg overflow-hidden shadow border border-[var(--color-border)] group"
                  >
                    <img
                      src={image}
                      alt={`${property.title} - ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[var(--color-card)] rounded-lg shadow-md p-6 max-sm:px-3 border border-[var(--color-border)]"
            >
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Property Details</h2>
              <p className="text-[var(--color-secondary-300)] mb-6 leading-relaxed">{property.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-[var(--color-text)]">
                  <FiHome className="text-[var(--color-primary-600)]" />
                  <span>{property.parkingSpaces} Parking</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--color-text)]">
                  <FiMaximize2 className="text-[var(--color-primary-600)]" />
                  <span>{property.lotSize}</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--color-text)]">
                  <FiCalendar className="text-[var(--color-primary-600)]" />
                  <span>Built {property.yearBuilt}</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--color-text)]">
                  <FiUsers className="text-[var(--color-primary-600)]" />
                  <span>{property.metrics.totalInvestors} Investors</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-[var(--color-text)]">
                    <FiCheck className="text-[var(--color-primary-600)]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Token Details */}
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">Token Information</h3>
              <div className="bg-[var(--color-secondary-50)] rounded-lg p-6 max-sm:px-3 mb-6 border border-[var(--color-border)]">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--color-secondary-300)]">Token Symbol</p>
                    <p className="font-semibold text-[var(--color-text)]">{property.tokenDetails.tokenSymbol}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-secondary-300)]">Token Price</p>
                    <p className="font-semibold text-[var(--color-text)]">{property.tokenDetails.tokenPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-secondary-300)]">Available Tokens</p>
                    <p className="font-semibold text-[var(--color-text)]">
                      {property.tokenDetails.availableTokens.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-secondary-300)]">Total Supply</p>
                    <p className="font-semibold text-[var(--color-text)]">
                      {property.tokenDetails.totalTokens.toLocaleString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-[var(--color-secondary-300)]">Smart Contract</p>
                    <p className="font-mono text-xs text-[var(--color-text)] break-all">
                      {property.tokenDetails.contractAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">Financial Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--color-secondary-50)] rounded-lg p-6 max-sm:px-3 border border-[var(--color-border)]">
                  <h4 className="font-semibold mb-4 text-[var(--color-text)]">Rental Income</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-secondary-300)]">Gross Rent</span>
                      <span className="font-medium text-[var(--color-text)]">{property.financials.grossRent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-secondary-300)]">Net Rent</span>
                      <span className="font-medium text-[var(--color-text)]">{property.financials.netRent}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--color-secondary-50)] rounded-lg p-6 max-sm:px-3 border border-[var(--color-border)]">
                  <h4 className="font-semibold mb-4 text-[var(--color-text)]">Expenses</h4>
                  <div className="space-y-2">
                    {Object.entries(property.financials.expenses).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-[var(--color-secondary-300)]">
                          {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="font-medium text-[var(--color-text)]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Investment Card */}
            <div className="bg-[var(--color-card)] rounded-lg shadow-md p-6 max-sm:px-3 border border-[var(--color-border)]">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-[var(--color-secondary-500)]">Investment Price</p>
                  <div className="flex items-center">
                    <FiDollarSign className="text-[var(--color-primary-600)]" />
                    <span className="text-2xl font-bold text-[var(--color-text)]">
                      ${property.price.usd.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-[var(--color-primary-600)]">
                    <FaEthereum className="mr-1" />
                    <span>{property.price.eth} ETH</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[var(--color-secondary-500)]">Annual ROI</p>
                  <div className="flex items-center justify-end text-green-600">
                    <FiTrendingUp className="mr-1" />
                    <span className="text-2xl font-bold">{property.roi}</span>
                  </div>
                </div>
              </div>

              {/* Investment Metrics */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[var(--color-text)]">
                  <span className="text-[var(--color-secondary-300)]">Rental Yield</span>
                  <span className="font-medium">{property.metrics.rentalYield}</span>
                </div>
                <div className="flex justify-between text-[var(--color-text)]">
                  <span className="text-[var(--color-secondary-300)]">Appreciation</span>
                  <span className="font-medium">{property.metrics.appreciation}</span>
                </div>
                <div className="flex justify-between text-[var(--color-text)]">
                  <span className="text-[var(--color-secondary-300)]">Total Return</span>
                  <span className="font-medium text-green-600">{property.metrics.totalReturn}</span>
                </div>
              </div>

              {/* Funding Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--color-secondary-300)]">Funding Progress</span>
                  <span className="font-medium text-[var(--color-text)]">{property.metrics.funded}</span>
                </div>
                <div className="w-full bg-[var(--color-secondary-100)] rounded-full h-2">
                  <div
                    className="bg-[var(--color-primary-600)] h-2 rounded-full transition-all duration-700"
                    style={{ width: property.metrics.funded }}
                  />
                </div>
                <p className="text-sm text-[var(--color-secondary-500)] mt-1">
                  Min Investment: {property.metrics.minInvestment}
                </p>
              </div>

              <Link
                to={`/property-3d`}
                className="btn w-full mb-4 flex items-center justify-center text-[var(--color-bg)] hover:opacity-90 transition-opacity"
              >
                <FiGrid className="mr-2" />
                View 3D version
              </Link>

              <button className="btn w-full mb-4 flex items-center justify-center text-[var(--color-bg)] hover:opacity-90 transition-opacity">
                <FaWallet className="mr-2" />
                Connect Wallet to Invest
              </button>

              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-[var(--color-border)]">
                <FacebookShareButton url={shareUrl}>
                  <FaFacebook className="text-2xl text-blue-600 hover:opacity-80 transition-opacity" />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <FaTwitter className="text-2xl text-sky-500 hover:opacity-80 transition-opacity" />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <FaLinkedin className="text-2xl text-blue-700 hover:opacity-80 transition-opacity" />
                </LinkedinShareButton>
              </div>
            </div>

            {/* Agent Card */}
            <div className="bg-[var(--color-card)] rounded-lg shadow-md p-6 max-sm:px-3 border border-[var(--color-border)]">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[var(--color-primary-100)]"
                />
                <div>
                  <h3 className="font-semibold text-[var(--color-text)]">{property.agent.name}</h3>
                  <p className="text-sm text-[var(--color-secondary-300)]">Investment Advisor</p>
                </div>
              </div>
              <div className="space-y-2 text-[var(--color-text)]">
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {property.agent.phone}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {property.agent.email}
                </p>
              </div>
              <button className="btn-secondary w-full mt-4 text-[var(--color-text)] hover:opacity-90 transition-opacity">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;