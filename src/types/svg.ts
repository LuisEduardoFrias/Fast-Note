import { CSSProperties } from 'react';

export type TypeSvg = {
  /** Define el ancho del elemento SVG. */
  width: string | number;
  /** Define la altura del elemento SVG. */
  height: string | number;
  /** Establece el área de visualización del SVG, permitiendo escalar y posicionar los elementos internos. */
  viewBox?: string;
  /** Controla cómo se conserva la proporción del contenido del SVG al cambiar su tamaño. */
  preserveAspectRatio?: string;
  /** Aplica estilos CSS al elemento SVG, como márgenes, relleno, etc. */
  style?: CSSProperties;
  /** Define el color de relleno de los elementos SVG. */
  fill?: string;
  /** Define el color del borde de los elementos SVG. */
  stroke?: string;
  /** Define el ancho del borde de los elementos SVG. */
  strokeWidth?: number;
  /** Aplica transformaciones como escalado, rotación y traslación a los elementos SVG. */
  transform?: string;
  /** Define la opacidad del elemento SVG. */
  opacity?: number;
}