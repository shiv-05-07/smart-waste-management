import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Image } from '@/components/ui/image';

interface ResolutionModalProps {
  isOpen: boolean;
  complaintId: string;
  complaintTitle: string;
  onClose: () => void;
  onSubmit: (resolutionData: {
    description: string;
    proofImage?: string;
    resolvedDateTime: Date;
    adminRemarks?: string;
  }) => void;
}

export default function ResolutionModal({
  isOpen,
  complaintId,
  complaintTitle,
  onClose,
  onSubmit
}: ResolutionModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    proofImage: null as File | null,
    resolvedDate: new Date().toISOString().split('T')[0],
    resolvedTime: new Date().toTimeString().slice(0, 5),
    adminRemarks: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, proofImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert('Please enter a resolution description');
      return;
    }

    const [year, month, day] = formData.resolvedDate.split('-');
    const [hours, minutes] = formData.resolvedTime.split(':');
    const resolvedDateTime = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    onSubmit({
      description: formData.description,
      proofImage: imagePreview || undefined,
      resolvedDateTime,
      adminRemarks: formData.adminRemarks || undefined
    });

    // Reset form
    setFormData({
      description: '',
      proofImage: null,
      resolvedDate: new Date().toISOString().split('T')[0],
      resolvedTime: new Date().toTimeString().slice(0, 5),
      adminRemarks: ''
    });
    setImagePreview(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-sm shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-semibold text-foreground">
                    Resolution Verification
                  </h2>
                  <p className="font-paragraph text-sm text-foreground/70 mt-1">
                    {complaintTitle} ({complaintId})
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Resolution Description */}
                <div>
                  <Label htmlFor="description" className="font-paragraph text-sm text-foreground mb-2 block">
                    Resolution Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe how the issue was resolved..."
                    className="w-full font-paragraph min-h-[120px]"
                  />
                  <p className="font-paragraph text-xs text-foreground/60 mt-1">
                    Provide detailed information about the resolution actions taken
                  </p>
                </div>

                {/* Proof Image Upload */}
                <div>
                  <Label htmlFor="proofImage" className="font-paragraph text-sm text-foreground mb-2 block">
                    Resolution Proof Image (After Cleanup)
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-sm p-6">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <Image src={imagePreview} alt="Proof preview" className="w-full h-48 object-cover rounded-sm" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, proofImage: null });
                          }}
                          className="text-sm text-primary hover:underline font-paragraph"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="font-paragraph text-sm text-foreground">
                            Click to upload or drag and drop
                          </span>
                          <span className="font-paragraph text-xs text-foreground/60">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </div>
                        <input
                          id="proofImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resolvedDate" className="font-paragraph text-sm text-foreground mb-2 block">
                      Resolution Date *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <Input
                        id="resolvedDate"
                        type="date"
                        required
                        value={formData.resolvedDate}
                        onChange={(e) => setFormData({ ...formData, resolvedDate: e.target.value })}
                        className="pl-10 font-paragraph"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="resolvedTime" className="font-paragraph text-sm text-foreground mb-2 block">
                      Resolution Time *
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <Input
                        id="resolvedTime"
                        type="time"
                        required
                        value={formData.resolvedTime}
                        onChange={(e) => setFormData({ ...formData, resolvedTime: e.target.value })}
                        className="pl-10 font-paragraph"
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Remarks */}
                <div>
                  <Label htmlFor="adminRemarks" className="font-paragraph text-sm text-foreground mb-2 block">
                    Additional Admin Remarks (Optional)
                  </Label>
                  <Textarea
                    id="adminRemarks"
                    value={formData.adminRemarks}
                    onChange={(e) => setFormData({ ...formData, adminRemarks: e.target.value })}
                    placeholder="Add any additional notes about the resolution..."
                    className="w-full font-paragraph min-h-[80px]"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 text-white hover:bg-green-700 rounded py-6 font-paragraph text-base"
                  >
                    Confirm Resolution
                  </Button>
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 rounded py-6 font-paragraph text-base"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
