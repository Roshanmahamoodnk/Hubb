import type { CSSProperties } from "react";
import { type Flavor } from "@/lib/catalog";

export function PackPlate({ flavor, className = "", size = "lg", face = "ecom" }: { flavor: Flavor; className?: string; size?: "sm" | "lg"; face?: "ecom" | "retail" }) {
  const loud = face === "ecom";
  return (
    <div
      className={`pack-plate pack-plate-${size} ${loud ? "is-ecom" : "is-retail"} ${className}`}
      style={{ "--flavor": flavor.color, "--pale": flavor.pale, "--ink": flavor.ink } as CSSProperties}
      aria-hidden="true"
    >
      <span className="pack-plate-band" />
      <span className="pack-plate-mark" lang="ar">حُبّ</span>
      <span className="pack-plate-giant" aria-hidden="true">{flavor.number}</span>
      <span className="pack-plate-number">{flavor.number} / 07</span>
      <strong className="pack-plate-ar" lang="ar">{flavor.ar}</strong>
      <b className="pack-plate-en">{flavor.en}</b>
      <small className="pack-plate-meta">
        {flavor.weightGrams}G · PACKED IN RIYADH · HALAL
        <i>{loud ? "E-COM" : "RETAIL"}</i>
      </small>
    </div>
  );
}

export function PackImage({ flavor, alt, className = "", loading = "lazy" }: { flavor: Flavor; alt?: string; className?: string; loading?: "lazy" | "eager" }) {
  return (
    <img
      className={className}
      src={flavor.image}
      alt={alt ?? `HUBB ${flavor.en} ${flavor.ar}`}
      loading={loading}
      decoding="async"
    />
  );
}
