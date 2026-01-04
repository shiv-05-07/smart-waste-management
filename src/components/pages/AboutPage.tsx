import { motion } from 'framer-motion';
import { AlertTriangle, Target, CheckCircle2, BarChart3 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Our Mission
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Building smarter, cleaner communities through technology and civic engagement
          </motion.p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mr-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                  The Problem
                </h2>
              </div>
              <div className="space-y-4">
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  Urban waste management remains one of the most pressing challenges facing modern cities. 
                  Traditional complaint systems are often inefficient, opaque, and frustrating for citizens.
                </p>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  Citizens struggle to report waste issues effectively, with no way to track progress or 
                  hold authorities accountable. Meanwhile, municipalities lack the tools to efficiently 
                  manage, prioritize, and resolve complaints.
                </p>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  This disconnect leads to:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-paragraph text-base text-foreground/80">
                      Accumulation of waste in public spaces
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-paragraph text-base text-foreground/80">
                      Health and environmental hazards
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-paragraph text-base text-foreground/80">
                      Decreased citizen trust in local government
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="font-paragraph text-base text-foreground/80">
                      Inefficient resource allocation
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-10 rounded-sm"
            >
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">
                Key Challenges
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-destructive pl-6">
                  <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Lack of Transparency
                  </h4>
                  <p className="font-paragraph text-sm text-foreground/70">
                    Citizens have no visibility into complaint status or resolution timelines
                  </p>
                </div>
                <div className="border-l-4 border-destructive pl-6">
                  <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Poor Communication
                  </h4>
                  <p className="font-paragraph text-sm text-foreground/70">
                    No structured channel for citizens to communicate with municipal authorities
                  </p>
                </div>
                <div className="border-l-4 border-destructive pl-6">
                  <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Inefficient Workflows
                  </h4>
                  <p className="font-paragraph text-sm text-foreground/70">
                    Manual processes lead to delays and mismanagement of resources
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                Our Solution
              </h2>
            </div>
            <p className="text-lg font-paragraph text-foreground/70 max-w-3xl mx-auto">
              A comprehensive digital platform that bridges the gap between citizens and municipalities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-sm"
            >
              <div className="w-12 h-12 bg-light-green rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                Improved Accountability
              </h3>
              <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                Every complaint is tracked, assigned, and monitored, ensuring nothing falls through 
                the cracks and creating a culture of responsibility.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-sm"
            >
              <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                Enhanced Transparency
              </h3>
              <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                Real-time status updates keep citizens informed at every step, building trust and 
                confidence in municipal services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-sm"
            >
              <div className="w-12 h-12 bg-light-green rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                Data-Driven Decisions
              </h3>
              <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                Analytics and insights help municipalities optimize resource allocation and identify 
                problem areas for proactive intervention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
              Creating Lasting Impact
            </h2>
            <p className="text-lg font-paragraph text-foreground/70 max-w-2xl mx-auto">
              How our system improves cleanliness and accountability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <span className="text-white font-heading text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Faster Response Times
                  </h3>
                  <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                    Automated assignment and tracking ensure complaints are addressed promptly, 
                    reducing waste accumulation and health risks.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <span className="text-white font-heading text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Increased Civic Engagement
                  </h3>
                  <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                    Easy-to-use platform encourages more citizens to participate in maintaining 
                    community cleanliness.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                  <span className="text-white font-heading text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Better Resource Management
                  </h3>
                  <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                    Analytics help municipalities deploy workers and resources where they're needed most.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary to-secondary p-10 rounded-sm text-white"
            >
              <h3 className="text-2xl font-heading font-semibold mb-6">
                Our Vision
              </h3>
              <p className="font-paragraph text-base leading-relaxed mb-6">
                We envision a future where every community has access to efficient, transparent waste 
                management systems that empower citizens and enable municipalities to deliver exceptional 
                public services.
              </p>
              <p className="font-paragraph text-base leading-relaxed mb-6">
                By leveraging technology to bridge the gap between citizens and government, we're creating 
                cleaner, healthier, and more livable communities for everyone.
              </p>
              <p className="font-paragraph text-base leading-relaxed">
                Together, we can transform how cities manage waste and build a more sustainable future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
