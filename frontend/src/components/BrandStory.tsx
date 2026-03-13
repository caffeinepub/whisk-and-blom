import { Leaf, Heart, Sparkles } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground">
              Born from a passion for natural ingredients and culinary artistry
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-center text-muted-foreground leading-relaxed">
              At Whisk & Bloom, we believe that the most beautiful colours come from nature itself. 
              Our journey began with a simple question: Why use artificial dyes when nature provides 
              such vibrant, safe alternatives? Today, we craft premium natural food colours from 
              carefully selected botanical sources, bringing the beauty of nature to your kitchen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-xl">100% Natural</h3>
              <p className="text-muted-foreground">
                Extracted from pure botanical sources with no synthetic additives
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-xl">Artisan Quality</h3>
              <p className="text-muted-foreground">
                Handcrafted in small batches to ensure the highest quality and potency
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-xl">Vibrant Results</h3>
              <p className="text-muted-foreground">
                Stunning, long-lasting colours that bring your culinary visions to life
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
