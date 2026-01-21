import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimation";
import { Star, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  review: z.string().trim().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const CustomerFeedbackForm = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    rating: 0,
    review: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackFormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FeedbackFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = feedbackSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FeedbackFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FeedbackFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("customer_reviews").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        rating: formData.rating,
        review: formData.review.trim(),
      });

      if (error) throw error;

      toast.success("Thank you for your feedback!", {
        description: "Your review has been submitted successfully.",
      });
      setFormData({ name: "", email: "", rating: 0, review: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="py-24 bg-background">
      <div className="container px-4">
        <ScrollAnimation className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Customer Voices</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Share Your Review & Feedback
          </h2>
          <p className="text-lg text-muted-foreground">
            Your experience matters to us. Help us improve and help others discover the joy of queue-free shopping.
          </p>
        </ScrollAnimation>

        <ScrollAnimation className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Tell Us What You Think</h3>
                <p className="text-sm text-muted-foreground">We read every review personally</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.name ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.email ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Rate your experience</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || formData.rating)
                            ? "fill-secondary text-secondary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-sm text-destructive mt-1">{errors.rating}</p>}
              </div>

              <div>
                <textarea
                  name="review"
                  placeholder="Share your experience with PayMall..."
                  rows={4}
                  value={formData.review}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all ${
                    errors.review ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.review && <p className="text-sm text-destructive mt-1">{errors.review}</p>}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Review
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default CustomerFeedbackForm;
