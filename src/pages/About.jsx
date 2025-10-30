import { motion } from "framer-motion";
import {
  FiUsers,
  FiDollarSign,
  FiGlobe,
  FiShield,
  FiBriefcase,
  FiAward,
} from "react-icons/fi";
import { FaBitcoin, FaEthereum, FaHandshake } from "react-icons/fa";
import { SiChainlink } from "react-icons/si";

function About() {
  const stats = [
    { value: "$250M+", label: "Property Transactions", icon: FiDollarSign },
    { value: "15,000+", label: "Active Investors", icon: FiUsers },
    { value: "45+", label: "Countries Served", icon: FiGlobe },
    { value: "100%", label: "Secure Transactions", icon: FiShield },
  ];

  const partners = [
    { name: "Bitcoin", icon: FaBitcoin, color: "text-orange-500" },
    { name: "Ethereum", icon: FaEthereum, color: "text-purple-500" },
    { name: "Chainlink", icon: SiChainlink, color: "text-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-secondary-900)] text-white py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Real Estate Investment
            </h1>
            <p className="text-xl text-[var(--color-secondary-200)]">
              We're bridging the gap between traditional real estate and
              cryptocurrency, making property investment accessible, secure, and
              transparent through blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--color-card)] rounded-lg p-6 text-center shadow-md border border-[var(--color-border)]"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-[var(--color-primary-600)]" />
                <div className="text-3xl font-bold text-[var(--color-text)] mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--color-secondary-300)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">
              Our Mission
            </h2>
            <p className="text-lg text-[var(--color-secondary-300)]">
              To democratize real estate investment by leveraging blockchain
              technology, making property ownership accessible to investors
              worldwide through fractional ownership and cryptocurrency
              transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-[var(--color-primary-50)] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="w-8 h-8 text-[var(--color-primary-600)]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
                Accessibility
              </h3>
              <p className="text-[var(--color-secondary-300)]">
                Making real estate investment available to everyone through
                fractional ownership and cryptocurrency payments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-[var(--color-primary-50)] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-[var(--color-primary-600)]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
                Security
              </h3>
              <p className="text-[var(--color-secondary-300)]">
                Ensuring secure transactions through blockchain technology and
                smart contracts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-[var(--color-primary-50)] p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="w-8 h-8 text-[var(--color-primary-600)]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-text)]">
                Global Reach
              </h3>
              <p className="text-[var(--color-secondary-300)]">
                Connecting property investors and opportunities worldwide
                through our platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]">
            Supported Cryptocurrencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <partner.icon
                  className={`w-16 h-16 mx-auto mb-4 ${partner.color}`}
                />
                <h3 className="text-xl font-semibold text-[var(--color-text)]">
                  {partner.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text)]">
            Recognition & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--color-card)] p-6 rounded-lg shadow-md text-center border border-[var(--color-border)]"
            >
              <FiAward className="w-12 h-12 mx-auto mb-4 text-[var(--color-primary-600)]" />
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)]">
                Best Blockchain Innovation
              </h3>
              <p className="text-[var(--color-secondary-300)]">
                Real Estate Tech Awards 2024
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[var(--color-card)] p-6 rounded-lg shadow-md text-center border border-[var(--color-border)]"
            >
              <FiBriefcase className="w-12 h-12 mx-auto mb-4 text-[var(--color-primary-600)]" />
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)]">
                Fastest Growing PropTech
              </h3>
              <p className="text-[var(--color-secondary-300)]">
                Forbes Innovation 2024
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[var(--color-card)] p-6 rounded-lg shadow-md text-center border border-[var(--color-border)]"
            >
              <FiShield className="w-12 h-12 mx-auto mb-4 text-[var(--color-primary-600)]" />
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)]">
                Most Secure Platform
              </h3>
              <p className="text-[var(--color-secondary-300)]">
                Blockchain Security Excellence 2024
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
