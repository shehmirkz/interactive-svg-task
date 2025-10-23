import data from "../data/segments.json";

const InteractiveSVG2 = () => {
    const handleClick = (label: string) => alert(`Clicked: ${label}`);

    const center = { x: 350, y: 350 };
    const baseRadius = 70;
    const totalGroups = data.groups.length;
    const maxRadius = 300;
    const ringWidth = (maxRadius - baseRadius) / totalGroups;
    const totalSize = (maxRadius + ringWidth + 40) * 2;

    const getSectorColor = (angleDeg: number) => {
        const normalized = (angleDeg + 60 + 360) % 360;
        if (normalized < 120) return "#C0392B";
        if (normalized < 240) return "#1B4F72";
        return "#6C3483";
    };

    const wrapText = (text: string, maxChars = 12) => {
        const words = text.split(" ");
        const lines: string[] = [];
        let line = "";
        for (const word of words) {
            if ((line + word).length > maxChars) {
                lines.push(line.trim());
                line = word + " ";
            } else line += word + " ";
        }
        lines.push(line.trim());
        return lines;
    };

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${totalSize} ${totalSize}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "700px", display: "block", margin: "0 auto" }}
        >
            <circle
                cx={center.x}
                cy={center.y}
                r={baseRadius - 10}
                fill="#fff"
                stroke="#ccc"
                strokeWidth="2"
            />
            <text
                x={center.x}
                y={center.y + 5}
                textAnchor="middle"
                fontSize="16"
                fill="#1A5276"
                fontWeight="bold"
            >
                Company logo
            </text>

            {data.groups.map((group, gIdx) => {
                const radius = baseRadius + gIdx * ringWidth;
                const segments = group.segments.length;
                const angleStep = (2 * Math.PI) / segments;

                return group.segments.map((segment, i) => {
                    const start = i * angleStep - Math.PI / 2;
                    const end = start + angleStep;
                    const mid = (start + end) / 2;
                    const deg = ((mid + Math.PI * 2) % (Math.PI * 2)) * (180 / Math.PI);
                    const fill = getSectorColor(deg);

                    const path = `
                        M ${center.x + radius * Math.cos(start)} ${center.y + radius * Math.sin(start)}
                        A ${radius} ${radius} 0 0 1 ${center.x + radius * Math.cos(end)} ${center.y + radius * Math.sin(end)}
                        L ${center.x + (radius + ringWidth) * Math.cos(end)} ${center.y + (radius + ringWidth) * Math.sin(end)}
                        A ${radius + ringWidth} ${radius + ringWidth} 0 0 0 ${center.x + (radius + ringWidth) * Math.cos(start)} ${center.y + (radius + ringWidth) * Math.sin(start)}
                        Z
                    `;

                    const textAngle = start + angleStep / 2;
                    const textR = radius + ringWidth / 2.4;
                    const textX = center.x + textR * Math.cos(textAngle);
                    const textY = center.y + textR * Math.sin(textAngle);
                    const lines = wrapText(segment.label);

                    return (
                        <g
                            key={segment.id}
                            onClick={() => handleClick(segment.label)}
                            style={{ cursor: "pointer" }}
                        >
                            <path d={path} fill={fill} stroke="#fff" strokeWidth="1.2" />
                            {lines.map((line, idx) => (
                                <text
                                    key={idx}
                                    x={textX}
                                    y={textY + idx * 12 - (lines.length - 1) * 6}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    fill="#fff"
                                    fontSize="10"
                                    fontWeight="500"
                                    style={{ pointerEvents: "none" }}
                                >
                                    {line}
                                </text>
                            ))}
                        </g>
                    );
                });
            })}
        </svg>
    );
};

export default InteractiveSVG2;
