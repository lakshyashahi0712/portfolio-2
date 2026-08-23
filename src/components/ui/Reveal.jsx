import { motion } from "motion/react";

/**
 * Scroll-triggered reveal. Fires once, slightly before the element
 * reaches the viewport so it never feels like it's waiting on you.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  as = "div",
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
