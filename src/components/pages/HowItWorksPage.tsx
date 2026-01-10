import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageSlideshow from '@/components/ImageSlideshow';

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Report Issue',
      description: 'Citizens submit waste complaints with photos, descriptions, and location details through the citizen portal.',
      icon: FileText,
      color: 'bg-light-green',
      textColor: 'text-primary',
      images: [
        {
          src: 'https://static.wixstatic.com/media/2c4374_b734e6b4d3c543bca9a2e33aa90a7ab4~mv2.png?originWidth=384&originHeight=576',
          alt: 'Citizen reporting waste issue',
          title: 'Report Issue',
          description: 'Submit waste complaints with photos and details'
        },
        {
          src: 'https://static.wixstatic.com/media/2c4374_90f4c26bdc9843c48e3a7616eca66cd1~mv2.png?originWidth=384&originHeight=576',
          alt: 'Complaint submission form',
          title: 'Easy Submission',
          description: 'Simple and intuitive reporting process'
        }
      ]
    },
    {
      number: 2,
      title: 'Admin Review',
      description: 'Municipal administrators review complaints, prioritize them, and assign them to appropriate cleanup crews.',
      icon: CheckCircle,
      color: 'bg-light-blue',
      textColor: 'text-secondary',
      images: [
        {
          src: 'https://static.wixstatic.com/media/2c4374_aaf85e87867745dba27789863369c25a~mv2.png?originWidth=384&originHeight=576',
          alt: 'Admin reviewing complaints',
          title: 'Admin Review',
          description: 'Administrators prioritize and assign tasks'
        },
        {
          src: 'https://static.wixstatic.com/media/2c4374_90f4c26bdc9843c48e3a7616eca66cd1~mv2.png?originWidth=384&originHeight=576',
          alt: 'Task assignment',
          title: 'Assignment',
          description: 'Efficient worker allocation'
        }
      ]
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
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A simple 4-step process to keep our community clean
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="space-y-12 md:space-y-16">
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  {/* Content */}
                  <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                    <div className="flex items-start mb-6">
                      <div className={`${step.color} rounded-full w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center mr-4 flex-shrink-0`}>
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                          {step.number}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
                          {step.title}
                        </h2>
                      </div>
                    </div>
                    <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="flex items-center">
                      <div className={`w-10 sm:w-12 h-10 sm:h-12 ${step.color} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-5 sm:w-6 h-5 sm:h-6 ${step.textColor}`} />
                      </div>
                    </div>
                  </div>

                  {/* Visual - Image Slideshow for steps 1 and 2 */}
                  <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                    {step.images ? (
                      <div className="h-[50vh] sm:h-[60vh] md:h-80 w-full">
                        <ImageSlideshow
                          images={step.images}
                          autoPlay={true}
                          autoPlayInterval={4000}
                          showControls={true}
                          showDots={false}
                          enableSwipe={true}
                        />
                      </div>
                    ) : (
                      <div className={`${step.color} rounded-lg sm:rounded-2xl md:rounded-sm p-8 sm:p-10 md:p-12 flex items-center justify-center min-h-80`}>
                        <Icon className={`w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 ${step.textColor} opacity-80`} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow Diagram */}
      <section className="py-16 sm:py-20 md:py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-foreground mb-3 md:mb-4">
              Complete Process Flow
            </h2>
            <p className="text-base sm:text-lg font-paragraph text-foreground/70">
              From complaint to resolution in a streamlined workflow
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 sm:p-8 rounded-lg sm:rounded-2xl md:rounded-sm shadow-sm"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <div className={`${step.color} rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mb-3 sm:mb-4`}>
                      <Icon className={`w-8 sm:w-10 h-8 sm:h-10 ${step.textColor}`} />
                    </div>
                    <h3 className="font-heading text-sm sm:text-lg font-semibold text-foreground text-center mb-1 sm:mb-2">
                      {step.title}
                    </h3>
                    <p className="font-paragraph text-xs sm:text-sm text-foreground/70 text-center">
                      Step {step.number}
                    </p>
                    {index < steps.length - 1 && (
                      <div className="hidden sm:block absolute ml-[calc(25%-20px)] mt-24 md:mt-32">
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
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-foreground mb-3 md:mb-4">
              Why This Process Works
            </h2>
            <p className="text-base sm:text-lg font-paragraph text-foreground/70">
              Designed for efficiency, transparency, and community engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 sm:p-8 rounded-lg sm:rounded-2xl md:rounded-sm"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-light-green rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-2 sm:mb-3">
                Transparent
              </h3>
              <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">
                Citizens can track their complaints in real-time and see exactly what's being done.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background p-6 sm:p-8 rounded-lg sm:rounded-2xl md:rounded-sm"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-light-blue rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-secondary" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-2 sm:mb-3">
                Efficient
              </h3>
              <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">
                Automated assignment and tracking reduce response times and improve resource allocation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background p-6 sm:p-8 rounded-lg sm:rounded-2xl md:rounded-sm"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-light-green rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-2 sm:mb-3">
                Accountable
              </h3>
              <p className="font-paragraph text-sm sm:text-base text-foreground/70 leading-relaxed">
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
