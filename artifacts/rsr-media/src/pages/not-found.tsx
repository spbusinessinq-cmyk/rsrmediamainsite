import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4 max-w-xl"
        data-testid="section-404"
      >
        <div className="font-mono text-xs text-primary mb-6 tracking-widest">// 404.NOT_FOUND</div>

        <div className="font-mono text-8xl md:text-9xl font-bold text-primary/10 select-none mb-4 leading-none">
          404
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Signal lost.
        </h1>
        <p className="text-muted-foreground font-mono text-sm mb-10 leading-relaxed">
          The page you are looking for does not exist, has been moved, or is no longer accessible on this network.
        </p>

        <Link href="/">
          <Button className="font-mono text-sm tracking-wider uppercase" data-testid="button-back-home">
            Return to Base <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>

        <p className="font-mono text-xs text-muted-foreground/40 mt-10">
          // NAVIGATION.ERROR — ROUTE.NOT.REGISTERED
        </p>
      </motion.div>
    </div>
  );
}
