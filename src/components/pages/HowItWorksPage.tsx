import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Report Issue',
      description: 'Citizens submit waste complaints with photos, descriptions, and location details through the citizen portal.',
      icon: FileText,
      color: 'bg-light-green',
      textColor: 'text-primary'
    },
    {
      number: 2,
      title: 'Admin Review',
      description: 'Municipal administrators review complaints, prioritize them, and assign them to appropriate cleanup crews.',
      icon: CheckCircle,
      color: 'bg-light-blue',
      textColor: 'text-secondary'
    },
    {
      number: 3,
      title: 'Resolution',
      description: 'Assigned workers execute the cleanup and update the complaint status with remarks and completion details.',
      icon: Clock,
      color: 'bg-light-green',
      textColor: 'text-primary'
    },
    {
      number: 4,
      title: 'Notification',
      description: 'Citizens receive updates about their complaint status and are notified when the issue has been resolved.',
      icon: Bell,
      color: 'bg-light-blue',
      textColor: 'text-secondary'
    }
  ];

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
            How It Works
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A simple 4-step process to keep our community clean
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  {/* Content */}
                  <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                    <div className="flex items-start mb-6">
                      <div className={`${step.color} rounded-full w-16 h-16 flex items-center justify-center mr-4 flex-shrink-0`}>
                        <span className="font-heading text-3xl font-bold text-foreground">
                          {step.number}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-3xl font-heading font-semibold text-foreground">
                          {step.title}
                        </h2>
                      </div>
                    </div>
                    <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${step.textColor}`} />
                      </div>
                    </div>
                  </div>

                  {/* Icon Visual */}
                  <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                    <div className={`${step.color} rounded-sm p-12 flex items-center justify-center min-h-80`}>
                      <Icon className={`w-32 h-32 ${step.textColor} opacity-80`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow Diagram */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
              Complete Process Flow
            </h2>
            <p className="text-lg font-paragraph text-foreground/70">
              From complaint to resolution in a streamlined workflow
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-sm shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <div className={`${step.color} rounded-full w-20 h-20 flex items-center justify-center mb-4`}>
                      <Icon className={`w-10 h-10 ${step.textColor}`} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground text-center mb-2">
                      {step.title}
                    </h3>
                    <p className="font-paragraph text-sm text-foreground/70 text-center">
                      Step {step.number}
                    </p>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute ml-[calc(25%-20px)] mt-32">
                        <div className="w-8 h-1 bg-primary/30"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
              Why This Process Works
            </h2>
            <p className="text-lg font-paragraph text-foreground/70">
              Designed for efficiency, transparency, and community engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-8 rounded-sm"
            >
              <div className="w-12 h-12 bg-light-green rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                Transparent
              </h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Citizens can track their complaints in real-time and see exactly what's being done.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background p-8 rounded-sm"
            >
              <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                Efficient
              </h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Automated assignment and tracking reduce response times and improve resource allocation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background p-8 rounded-sm"
            >
              <div className="w-12 h-12 bg-light-green rounded-full flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                Accountable
              </h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Every step is documented, creating accountability and building community trust.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
