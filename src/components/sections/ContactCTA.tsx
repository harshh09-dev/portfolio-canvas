const __PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 800 1000%27><defs><linearGradient id=%27g%27 x1=%270%27 y1=%270%27 x2=%271%27 y2=%271%27><stop offset=%270%27 stop-color=%27%23262626%27/><stop offset=%271%27 stop-color=%27%23111%27/></linearGradient></defs><rect width=%27800%27 height=%271000%27 fill=%27url(%23g)%27/></svg>";
const aboutImg = __PLACEHOLDER;
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="bg-background overflow-hidden py-16 md:py-24">
      <div className="max-w-[1700px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* First Line */}
          <div className="flex items-center gap-3 md:gap-5 mb-2">
            <div className="h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 rounded-full overflow-hidden shrink-0 border border-border">
              <img
                src={aboutImg}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <h1
              className="
                font-display
                font-normal
                leading-[0.9]
                text-foreground
                text-[2.5rem]
                sm:text-[3.5rem]
                md:text-[5rem]
                lg:text-[7rem]
              "
              style={{ letterSpacing: "-0.04em" }}
            >
              Let's create
            </h1>
          </div>

          {/* Second Line */}
          <h1
            className="
              font-display
              font-normal
              leading-[0.9]
              text-muted-foreground
              text-[2.5rem]
              sm:text-[3.5rem]
              md:text-[5rem]
              lg:text-[7rem]
            "
            style={{ letterSpacing: "-0.04em" }}
          >
            something real.
          </h1>

          {/* Description */}
          <p className="mt-6 md:mt-10 max-w-xl text-sm md:text-lg leading-relaxed text-muted-foreground">
            Building digital experiences that matter.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
