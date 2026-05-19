"use client";

import type { DiagramData, DiagramNode, DiagramArrow } from "@/data/question-bank";

interface DiagramRendererProps {
  diagram: DiagramData;
}

/**
 * Renders a diagram from JSON data as an SVG.
 * Supports boxes, circles, diamonds, ellipses, and arrows with labels.
 */
export function DiagramRenderer({ diagram }: DiagramRendererProps) {
  const { width, height, title, nodes, arrows } = diagram;

  // Build a lookup for node positions (center points)
  const nodePositions: Record<string, { cx: number; cy: number }> = {};
  for (const node of nodes) {
    const w = node.width || 80;
    const h = node.height || 40;
    nodePositions[node.id] = {
      cx: node.x + w / 2,
      cy: node.y + h / 2,
    };
  }

  return (
    <div className="my-4 flex flex-col items-center">
      {title && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
          {title}
        </p>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-lg border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 p-2"
        role="img"
        aria-label={title || "Diagram"}
      >
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#6b7280"
            />
          </marker>
        </defs>

        {/* Render arrows */}
        {arrows.map((arrow, idx) => {
          const from = nodePositions[arrow.from];
          const to = nodePositions[arrow.to];
          if (!from || !to) return null;

          return (
            <g key={`arrow-${idx}`}>
              <line
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeDasharray={arrow.style === "dashed" ? "5,3" : undefined}
                markerEnd="url(#arrowhead)"
              />
              {arrow.label && (
                <text
                  x={(from.cx + to.cx) / 2}
                  y={(from.cy + to.cy) / 2 - 8}
                  textAnchor="middle"
                  className="fill-gray-500 dark:fill-gray-400"
                  fontSize="10"
                >
                  {arrow.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Render nodes */}
        {nodes.map((node) => (
          <NodeShape key={node.id} node={node} />
        ))}
      </svg>
    </div>
  );
}

function NodeShape({ node }: { node: DiagramNode }) {
  const w = node.width || 80;
  const h = node.height || 40;
  const cx = node.x + w / 2;
  const cy = node.y + h / 2;
  const color = node.color || "#3b82f6";

  // Split label by newlines for multi-line text
  const lines = node.label.split("\n");

  const textElements = lines.map((line, i) => (
    <tspan
      key={i}
      x={cx}
      dy={i === 0 ? `${-(lines.length - 1) * 6}px` : "14px"}
      textAnchor="middle"
    >
      {line}
    </tspan>
  ));

  switch (node.type) {
    case "circle":
      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={Math.min(w, h) / 2}
            fill={`${color}20`}
            stroke={color}
            strokeWidth="2"
          />
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className="fill-gray-800 dark:fill-gray-200"
          >
            {textElements}
          </text>
        </g>
      );

    case "diamond":
      const points = `${cx},${node.y} ${node.x + w},${cy} ${cx},${node.y + h} ${node.x},${cy}`;
      return (
        <g>
          <polygon
            points={points}
            fill={`${color}20`}
            stroke={color}
            strokeWidth="2"
          />
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className="fill-gray-800 dark:fill-gray-200"
          >
            {textElements}
          </text>
        </g>
      );

    case "ellipse":
      return (
        <g>
          <ellipse
            cx={cx}
            cy={cy}
            rx={w / 2}
            ry={h / 2}
            fill={`${color}20`}
            stroke={color}
            strokeWidth="2"
          />
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className="fill-gray-800 dark:fill-gray-200"
          >
            {textElements}
          </text>
        </g>
      );

    case "box":
    default:
      return (
        <g>
          <rect
            x={node.x}
            y={node.y}
            width={w}
            height={h}
            rx="6"
            ry="6"
            fill={`${color}20`}
            stroke={color}
            strokeWidth="2"
          />
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            className="fill-gray-800 dark:fill-gray-200"
          >
            {textElements}
          </text>
        </g>
      );
  }
}
