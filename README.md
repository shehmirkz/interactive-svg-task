**Interactive SVG Wheel Visualization**

This project contains two SVG-based visualizations designed to represent hierarchical and flat data structures in an interactive wheel format.

**Components**

**InteractiveSVG1 **– Hierarchical visualization

Supports 3 levels of nested data (sectors → groups → segments)

Dynamically generates wedges with clean text wrapping

Uses sector-based coloring for clarity

**InteractiveSVG2** – Flat segmented visualization

Simple ring-based design with evenly distributed color zones

Ideal for straightforward visual mapping

**Data Files**

**segments1.json** – Hierarchical structure for the first SVG

**segments.json** – Flat structure for the second SVG

**How to Run**

npm install

npm run dev

**Notes**

Each segment is clickable and triggers an alert (for now).

Text auto-wraps inside wedges to prevent overflow.

Easily adaptable for dynamic data sources in the future.


Author

Developed by Shahmir Hussain KZ
